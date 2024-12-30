// --- Global Variables Section ---
let Engine, World, Bodies, Composite;
let engine, world, balls = [], pockets = [];
let tableWidth, tableHeight, ballDiameter, pocketDiameter;
let cueBall, baulkX, dRadius;
let isCueBallPlaced = false; // Track whether the cue ball has been placed
let mode = 1; // Default mode for ball placement
let cueStickLength = 150; // Default length of the cue stick
let minCueLength = 50; // Minimum length of the cue stick (least force)
let maxCueLength = 200; // Maximum length of the cue stick (most force)
let cueStickGrowing = true; // Whether the cue stick is currently growing
let maxForce = 0.05; // Cap on the maximum force applied
let aimingAngle = 0; // Angle for aiming the cue stick
let logMessages = []; // Store messages with timestamps
let score = 0;
let lastPottedBall = null; // Track the last ball potted

// --- Setup Section ---
function setup() {
    createCanvas(1200, 650); // Increased height to add instructions
    initializePhysics();  // Initialize Matter.js engine and world
    setupTableDimensions(); // Set table and ball sizes
    createCushions();      // Create cushions (boundaries)
    createPockets();       // Create pockets
    initializeBalls();     // Add balls to the world

    // Add collision event listener for pocket detection
    Matter.Events.on(engine, "collisionStart", function (event) {
        event.pairs.forEach(pair => {
            let { bodyA, bodyB } = pair;

            if (pockets.includes(bodyA) || pockets.includes(bodyB)) {
                let ball = pockets.includes(bodyA) ? bodyB : bodyA;

                if (balls.includes(ball)) {
                    let ballColor = ball.render.fillStyle;

                    // Update the score using the helper function
                    score += getBallScore(ballColor);

                    if (ballColor === "red") {
                        // Remove the red ball from the world and array
                        World.remove(world, ball);
                        balls.splice(balls.indexOf(ball), 1);
                        addLogMessage("Red ball pocketed and removed.");
                    } else {
                        // Colored ball potted
                        if (lastPottedBall === "color") {
                            // Rule violation: Colored ball after colored ball
                            score -= getBallScore(ballColor); // Subtract the score for the violation
                            resetSingleColoredBall(ballColor); // Reset to its position
                            addLogMessage(`Violation! ${ballColor} ball potted after a colored ball. Resetting to position. Score adjusted.`);
                        } else {
                            // Valid potting of a colored ball
                            lastPottedBall = "color"; // Update last potted ball

                            // Check if there are any red balls left
                            let redBallsRemaining = balls.some(b => b.render.fillStyle === "red");

                            if (redBallsRemaining) {
                                // Reset the colored ball to its original position
                                resetSingleColoredBall(ballColor);
                                addLogMessage(`${ballColor} ball pocketed and reset.`);
                            } else {
                                // Remove the colored ball from the world and array
                                World.remove(world, ball);
                                balls.splice(balls.indexOf(ball), 1);
                                addLogMessage(`${ballColor} ball pocketed and removed (no red balls left).`);
                            }
                        }
                    }
                } else if (ball === cueBall) {
                    // Cue ball potted
                    addLogMessage("Cue ball potted! Resetting to placement mode.");
                    isCueBallPlaced = false; // Allow cue ball placement again
                    Body.setVelocity(cueBall, { x: 0, y: 0 }); // Reset velocity
                    Body.setAngularVelocity(cueBall, 0);      // Reset angular velocity
                    World.remove(world, cueBall); // Remove cue ball from the world
                }
            }
        });
    });

    // Add collision event listener for cue ball collisions
    Matter.Events.on(engine, "collisionStart", function (event) {
        event.pairs.forEach(pair => {
            let { bodyA, bodyB } = pair;

            // Check if one of the bodies is the cue ball
            let otherBody = null;
            if (bodyA === cueBall) {
                otherBody = bodyB;
            } else if (bodyB === cueBall) {
                otherBody = bodyA;
            }

            if (otherBody) {
                // Determine the type of collision
                if (pockets.includes(otherBody)) {
                    addLogMessage("Cue ball collided with a pocket.");
                } else if (balls.includes(otherBody)) {
                    let ballColor = otherBody.render.fillStyle;
                    if (ballColor === "red") {
                        addLogMessage("Cue ball collided with a red ball.");
                    } else {
                        addLogMessage(`Cue ball collided with a ${ballColor} ball.`);
                    }
                } else {
                    addLogMessage("Cue ball collided with a cushion.");
                }
            }
        });
    });

}

// --- Main Draw Loop ---
function draw() {
    background(128, 128, 128);
    Engine.update(engine); // Update physics engine

    drawTable();           // Draw the table (pockets, lines, etc.)
    drawBalls();           // Render the balls based on their physics positions

    if (isCueBallPlaced && !isCueBallMoving()) {
        drawCueStick();    // Draw the cue stick only when cue ball is stationary
        oscillateCueStick(); // Continuously adjust cue stick length
    }

    drawInstructions();    // Draw on-screen instructions
    drawLogMessages();     // Display log messages
    drawScore();           // Display the player's score
}

function resetSingleColoredBall(color) {
    const coloredPositions = {
        yellow: { x: baulkX, y: height / 2 + tableWidth / 12 },
        green: { x: baulkX, y: height / 2 },
        brown: { x: baulkX, y: height / 2 - tableWidth / 12 },
        blue: { x: width / 2, y: height / 2 },
        pink: { x: width / 2 + tableWidth / 4 - ballDiameter, y: height / 2 },
        black: { x: width / 2 + tableWidth / 2.5, y: height / 2 }
    };

    if (coloredPositions[color]) {
        let ball = balls.find(ball => ball.render.fillStyle === color);
        if (ball) {
            // Reset position
            Body.setPosition(ball, coloredPositions[color]);

            // Reset velocity and angular velocity
            Body.setVelocity(ball, { x: 0, y: 0 });
            Body.setAngularVelocity(ball, 0);
        }
    }
}



// --- Cue Stick Drawing ---
function drawCueStick() {
    if (!cueBall) return;

    let cueBallPos = cueBall.position;
    let mousePos = { x: mouseX, y: mouseY };
    let dx = cueBallPos.x - mousePos.x;
    let dy = cueBallPos.y - mousePos.y;
    let angle = atan2(dy, dx);

    let stickStartX = cueBallPos.x + cos(angle) * (ballDiameter / 2);
    let stickStartY = cueBallPos.y + sin(angle) * (ballDiameter / 2);
    let stickEndX = cueBallPos.x + cos(angle) * (ballDiameter / 2 + cueStickLength);
    let stickEndY = cueBallPos.y + sin(angle) * (ballDiameter / 2 + cueStickLength);

    stroke(200, 150, 50);
    strokeWeight(3);
    line(stickStartX, stickStartY, stickEndX, stickEndY);

    // Reset the stroke after drawing the cue stick
    noStroke();
}

function keyReleased() {
    if (key === ' ') {
        // On releasing space, prepare to apply force
        applyCueForce();
    }
}

function mouseMoved() {
    if (isCueBallPlaced && !isCueBallMoving()) {
        // Update aiming angle based on mouse position
        aimingAngle = atan2(mouseY - cueBall.position.y, mouseX - cueBall.position.x);
    }
}

function applyCueForce() {
    if (!isCueBallPlaced || isCueBallMoving()) return;

    // Calculate the force vector based on the aiming angle and cue stick length
    let forceMagnitude = map(cueStickLength, minCueLength, maxCueLength, 0, maxForce);
    let force = {
        x: forceMagnitude * cos(aimingAngle),
        y: forceMagnitude * sin(aimingAngle)
    };

    // Apply the force to the cue ball
    Body.applyForce(cueBall, cueBall.position, force);

    // Reset the cue stick length
    cueStickLength = minCueLength;
}

function oscillateCueStick() {
    if (cueStickGrowing) {
        cueStickLength += 2; // Grow the cue stick
        if (cueStickLength >= maxCueLength) {
            cueStickGrowing = false; // Switch to shrinking
        }
    } else {
        cueStickLength -= 2; // Shrink the cue stick
        if (cueStickLength <= minCueLength) {
            cueStickGrowing = true; // Switch to growing
        }
    }
}

function isCueBallMoving() {
    return (
        abs(cueBall.velocity.x) > 0.01 || abs(cueBall.velocity.y) > 0.01
    );
}


// --- Game Loop ---
function keyPressed() {
    if (key === '1') {
        resetBallsToStartingPositions();
        score = 0; // Reset the score to 0
        addLogMessage("Score reset to 0.");
    } else if (key === '2') {
        randomizeRedBalls();
        score = 0; // Reset the score to 0
        addLogMessage("Score reset to 0.");
    } else if (key === '3') {
        randomizeAllBalls();
        score = 0; // Reset the score to 0
        addLogMessage("Score reset to 0.");
    }
}


// --- Helper Functions ---

function getBallScore(color) {
    const ballScores = {
        red: 1,
        yellow: 2,
        green: 3,
        brown: 4,
        blue: 5,
        pink: 6,
        black: 7
    };
    return ballScores[color] || 0; // Return 0 if color is not in the mapping
}


function drawScore() {
    textSize(24); // Set text size
    fill(255); // Set text color to white
    textAlign(CENTER); // Align text to center
    text(`Score: ${score}`, width / 2, height - 20); // Display score at the bottom
}

function drawInstructions() {

    textSize(16);
    textAlign(CENTER);
    text(
        "Press '1' for Standard Mode | Press '2' for Random Reds Mode | Press '3' for Full Random Mode",
        width / 2,
        20
    );
    fill(255, 0, 0);
    text(
        "Left-click to place the cue ball, aim with the mouse, and press (or hold & release) SPACEBAR to shoot – the longer the cue stick, the more powerful the shot.",
        width / 2,
        40
    );
}

function drawCollisionMatrix(latestCollision = "") {
    fill(0); // Black background for the matrix
    rectMode(CORNER);
    rect(width / 2 - 150, height - 100, 300, 80); // Matrix container

    fill(255); // White text
    textSize(14);
    textAlign(CENTER);

    let headers = ["Cushion", "Red", "Yellow", "Pink", "Green", "Black", "Blue"];
    let xOffset = width / 2 - 140; // Starting position for columns

    // Draw headers
    for (let i = 0; i < headers.length; i++) {
        text(headers[i], xOffset + i * 40, height - 80);
    }

    // Draw cue row
    text("Cue", width / 2 - 170, height - 60);

    // Highlight latest collision
    if (latestCollision) {
        let colIndex = headers.findIndex(header => latestCollision.includes(header.toLowerCase()));
        if (colIndex >= 0) {
            fill(255, 0, 0); // Red highlight
            text("X", xOffset + colIndex * 40, height - 60);
        }
    }
}


function addLogMessage(message) {
    const currentTime = millis(); // Current time in milliseconds
    logMessages.push({ text: message, time: currentTime });
}


function drawLogMessages() {
    const currentTime = millis(); // Current time
    const duration = 5000; // Duration to display each message (in milliseconds)

    fill(255); // White text
    textSize(14); // Text size
    textAlign(LEFT); // Align text to the left

    // Start drawing from the bottom of the screen
    let startY = height - 20; // Bottom margin
    logMessages = logMessages.filter((message, index) => {
        if (currentTime - message.time < duration) {
            // Display message if within duration
            text(message.text, 10, startY - index * 20); // Offset each line by 20 pixels
            return true; // Keep the message
        }
        return false; // Remove the message
    });
}

// --- Ball Management ---
function resetBallsToStartingPositions() {
    // Remove all balls from the physics world
    balls.forEach(ball => World.remove(world, ball));
    balls = []; // Clear the balls array

    // Remove the cue ball from the physics world
    if (cueBall) {
        World.remove(world, cueBall);
    }

    // Reset the cue ball placement flag
    isCueBallPlaced = false;

    // Reinitialize the balls
    initializeBalls();

    addLogMessage("Balls reset to starting positions, cue ball ready for placement");
}


function randomizeRedBalls() {
    // Reset colored balls to their original positions
    resetColoredBalls();

    // Randomize only the red balls
    let redBalls = balls.filter(ball => ball.render.fillStyle === "red");

    redBalls.forEach(ball => {
        let randomX = random(width / 2 - tableWidth / 4, width / 2 + tableWidth / 4);
        let randomY = random(height / 2 - tableHeight / 2, height / 2 + tableHeight / 2);
        Body.setPosition(ball, { x: randomX, y: randomY });
    });

    addLogMessage("Red balls randomized, colored balls reset");
}

function resetColoredBalls() {
    const coloredPositions = [
        { x: baulkX, y: height / 2 + tableWidth / 12, color: "yellow" }, // Yellow (bottom)
        { x: baulkX, y: height / 2, color: "green" },                   // Green (middle)
        { x: baulkX, y: height / 2 - tableWidth / 12, color: "brown" }, // Brown (top)
        { x: width / 2, y: height / 2, color: "blue" },                // Blue (center)
        { x: width / 2 + tableWidth / 2.5, y: height / 2, color: "black" }, // Black (far right)
        { x: width / 2 + tableWidth / 4 - ballDiameter, y: height / 2, color: "pink" } // Pink (at the triangle tip)
    ];

    coloredPositions.forEach(pos => {
        let ball = balls.find(ball => ball.render.fillStyle === pos.color);
        if (ball) {
            Body.setPosition(ball, { x: pos.x, y: pos.y });
        }
    });

    addLogMessage("Colored balls reset to their original positions");
}


function randomizeAllBalls() {
    balls.forEach(ball => {
        if (ball) { // Exclude the cue ball
            let randomX = random(width / 2 - tableWidth / 4, width / 2 + tableWidth / 4);
            let randomY = random(height / 2 - tableHeight / 2, height / 2 + tableHeight / 2);
            Body.setPosition(ball, { x: randomX, y: randomY });
        }
    });

    addLogMessage("All balls randomized");
}


// --- Initialization Functions ---
function initializePhysics() {
    Engine = Matter.Engine;
    World = Matter.World;
    Bodies = Matter.Bodies;
    Body = Matter.Body;
    engine = Engine.create();
    world = engine.world;
    engine.world.gravity.y = 0; // No gravity in the y-direction

    // Increase collision accuracy
    engine.positionIterations = 10;
}

function setupTableDimensions() {
    tableWidth = width * 0.8;
    tableHeight = tableWidth / 2;
    ballDiameter = tableWidth / 36;
    pocketDiameter = ballDiameter * 1.5;

    // Initialize baulkX
    baulkX = width / 2 - tableWidth / 4;

    // Initialize D zone radius
    dRadius = tableWidth / 12;
}

// --- Cushion Functions ---
function createCushions() {
    let cushionOptions = { isStatic: true, restitution: 0.9 };

    // Top and bottom boundaries
    let topCushion = Bodies.rectangle(width / 2, height / 2 - tableHeight / 2, tableWidth, 10, cushionOptions);
    let bottomCushion = Bodies.rectangle(width / 2, height / 2 + tableHeight / 2, tableWidth, 10, cushionOptions);

    // Left and right boundaries
    let leftCushion = Bodies.rectangle(width / 2 - tableWidth / 2, height / 2, 10, tableHeight, cushionOptions);
    let rightCushion = Bodies.rectangle(width / 2 + tableWidth / 2, height / 2, 10, tableHeight, cushionOptions);

    // Add to world
    World.add(world, [topCushion, bottomCushion, leftCushion, rightCushion]);
}

function createPockets() {
    let pocketOptions = {
        isStatic: true,
        isSensor: true // Sensors for collision detection only
    };

    // Define pocket positions and add them to the world
    pockets = [
        Bodies.circle(width / 2 - tableWidth / 2, height / 2 - tableHeight / 2, pocketDiameter / 2, pocketOptions), // Top-left
        Bodies.circle(width / 2, height / 2 - tableHeight / 2, pocketDiameter / 2, pocketOptions),                // Top-center
        Bodies.circle(width / 2 + tableWidth / 2, height / 2 - tableHeight / 2, pocketDiameter / 2, pocketOptions), // Top-right
        Bodies.circle(width / 2 - tableWidth / 2, height / 2 + tableHeight / 2, pocketDiameter / 2, pocketOptions), // Bottom-left
        Bodies.circle(width / 2, height / 2 + tableHeight / 2, pocketDiameter / 2, pocketOptions),                // Bottom-center
        Bodies.circle(width / 2 + tableWidth / 2, height / 2 + tableHeight / 2, pocketDiameter / 2, pocketOptions)  // Bottom-right
    ];

    // Add pockets to the world
    World.add(world, pockets);
}

// --- Ball Functions ---
function initializeBalls() {
    let ballOptions = {
        restitution: 0.8,
        friction: 0.05,
        frictionAir: 0.01,
    };

    // Initialize cue ball without adding to the world
    cueBall = Bodies.circle(0, 0, ballDiameter / 2, {
        ...ballOptions,
        render: { fillStyle: "white" }
    });

    // Red balls (triangular formation)
    let startX = width / 2 + tableWidth / 4; // Right of the center
    let startY = height / 2;

    for (let row = 0; row < 5; row++) {
        for (let col = 0; col <= row; col++) {
            let x = startX + row * ballDiameter * 0.866; // Triangle horizontal offset
            let y = startY - (row / 2) * ballDiameter + col * ballDiameter; // Vertical offset
            let ball = Bodies.circle(x, y, ballDiameter / 2, { ...ballOptions, render: { fillStyle: "red" } });
            balls.push(ball);
        }
    }

    // Colored balls on the baulk line (left of the table)
    let coloredPositions = [
        { x: baulkX, y: height / 2 + tableWidth / 12, color: "yellow" }, // Yellow (bottom)
        { x: baulkX, y: height / 2, color: "green" },                   // Green (middle)
        { x: baulkX, y: height / 2 - tableWidth / 12, color: "brown" }  // Brown (top)
    ];

    for (let pos of coloredPositions) {
        let ball = Bodies.circle(pos.x, pos.y, ballDiameter / 2, { ...ballOptions, render: { fillStyle: pos.color } });
        balls.push(ball);
    }

    // Blue ball (center of the table)
    let blueBall = Bodies.circle(width / 2, height / 2, ballDiameter / 2, { ...ballOptions, render: { fillStyle: "blue" } });
    balls.push(blueBall);

    // Pink ball (at the tip of the red triangle)
    let pinkBallX = startX - ballDiameter // Offset by the ball's full diameter
    let pinkBallY = startY; // Centerline of the table
    let pinkBall = Bodies.circle(pinkBallX, pinkBallY, ballDiameter / 2, { ...ballOptions, render: { fillStyle: "pink" } });
    balls.push(pinkBall);



    // Black ball (far right)
    let blackBall = Bodies.circle(width / 2 + tableWidth / 2.5, height / 2, ballDiameter / 2, { ...ballOptions, render: { fillStyle: "black" } });
    balls.push(blackBall);

    // Add all balls to the physics world
    World.add(world, balls);
}

// --- Drawing Functions ---
function drawTable() {
    // Draw wooden frame
    fill("#8B4513"); // Brown for the wooden frame
    rectMode(CENTER);
    rect(width / 2, height / 2, tableWidth + 60, tableHeight + 60, 15); // Frame slightly larger than table

    // Draw table surface
    fill("#0A572E"); // Green table
    rect(width / 2, height / 2, tableWidth, tableHeight);

    drawCushions(); // Draw cushions along the edges
    drawPockets();  // Draw pockets
    drawDZone();    // Draw the "D" zone
}

function drawCushions() {
    // Darker green cushions
    fill("#064D36");
    noStroke();

    let cushionThickness = 5;

    // Adjust visual placement to align with physics cushions
    // Top cushion
    rect(width / 2, height / 2 - tableHeight / 2 + cushionThickness / 2, tableWidth - cushionThickness, cushionThickness);

    // Bottom cushion
    rect(width / 2, height / 2 + tableHeight / 2 - cushionThickness / 2, tableWidth - cushionThickness, cushionThickness);

    // Left cushion
    rect(width / 2 - tableWidth / 2 + cushionThickness / 2, height / 2, cushionThickness, tableHeight - cushionThickness);

    // Right cushion
    rect(width / 2 + tableWidth / 2 - cushionThickness / 2, height / 2, cushionThickness, tableHeight - cushionThickness);
}

function drawPockets() {
    fill("#000000"); // Black pockets
    noStroke();

    // Draw the six pockets
    ellipse(width / 2 - tableWidth / 2, height / 2 - tableHeight / 2, pocketDiameter); // Top-left
    ellipse(width / 2, height / 2 - tableHeight / 2, pocketDiameter);                 // Top-center
    ellipse(width / 2 + tableWidth / 2, height / 2 - tableHeight / 2, pocketDiameter); // Top-right
    ellipse(width / 2 - tableWidth / 2, height / 2 + tableHeight / 2, pocketDiameter); // Bottom-left
    ellipse(width / 2, height / 2 + tableHeight / 2, pocketDiameter);                 // Bottom-center
    ellipse(width / 2 + tableWidth / 2, height / 2 + tableHeight / 2, pocketDiameter); // Bottom-righ
}

function drawDZone() {
    noFill();
    stroke(255); // White color for the line and "D"
    strokeWeight(2);

    // Draw the baulk line (white line across the table)
    line(baulkX, height / 2 - tableHeight / 2, baulkX, height / 2 + tableHeight / 2);

    // Draw the semi-circle ("D")
    arc(baulkX, height / 2, dRadius * 2, dRadius * 2, HALF_PI, -HALF_PI);
}


function drawBalls() {
    noStroke();
    ellipseMode(CENTER);

    for (let ball of balls) {
        fill(ball.render.fillStyle);
        ellipse(ball.position.x, ball.position.y, ballDiameter);
    }

    // If the cue ball has not been placed, draw it following the mouse
    if (!isCueBallPlaced) {
        fill("white");
        ellipse(mouseX, mouseY, ballDiameter); // Render at mouse position
    } else {
        // Render the placed cue ball using its physics position
        fill("white");
        ellipse(cueBall.position.x, cueBall.position.y, ballDiameter);
    }
}

function placeCueBall() {
    if (!isCueBallPlaced) {
        // Define the "D zone" boundaries
        let tableTop = height / 2 - tableHeight / 2;
        let tableBottom = height / 2 + tableHeight / 2;
        let dLeft = baulkX - dRadius;
        let dRight = baulkX;
        let dCenter = { x: baulkX, y: height / 2 };

        // Check if the mouse is within the "D zone"
        let withinBaulkLine = mouseX >= dLeft + ballDiameter / 2 && mouseX <= dRight - ballDiameter / 2;
        let withinDZoneArc = dist(mouseX, mouseY, dCenter.x, dCenter.y) <= dRadius - ballDiameter / 2;
        let withinVerticalBounds = mouseY >= tableTop + ballDiameter / 2 && mouseY <= tableBottom - ballDiameter / 2;

        if (withinBaulkLine && withinDZoneArc && withinVerticalBounds) {
            // Place the cue ball at the mouse position
            Body.setPosition(cueBall, { x: mouseX, y: mouseY });
            World.add(world, cueBall); // Add the cue ball to the physics world
            isCueBallPlaced = true; // Mark the cue ball as placed
        } else {
            addLogMessage("Cue ball placement is outside the 'D zone.");
        }
    }
}


// --- Mouse Interaction ---
function mousePressed() {
    placeCueBall();
}





