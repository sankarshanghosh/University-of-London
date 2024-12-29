// --- Global Variables Section ---
// Dimensions, colors, physics engine variables, etc.
let Engine, World, Bodies, Composite;
let engine, world, balls = [], pockets = [];
let tableWidth, tableHeight, ballDiameter, pocketDiameter;
let cueBall, baulkX, dRadius;
let isCueBallPlaced = false; // Track whether the cue ball has been placed



// --- Setup Section ---
function setup() {
    createCanvas(1200, 600);
    initializePhysics();  // Initialize Matter.js engine and world
    setupTableDimensions(); // Set table and ball sizes
    createCushions();      // Create cushions (boundaries)
    createPockets();       // Create pockets
    initializeBalls();     // Add balls to the world

    // Add collision event listener for pocket detection
    Matter.Events.on(engine, "collisionStart", function (event) {
        event.pairs.forEach(pair => {
            let { bodyA, bodyB } = pair;

            // Check if one of the bodies is a pocket
            if (pockets.includes(bodyA) || pockets.includes(bodyB)) {
                let ball = pockets.includes(bodyA) ? bodyB : bodyA;

                // Check if the ball is in the balls array
                if (balls.includes(ball)) {
                    // Remove the ball from the physics world and balls array
                    World.remove(world, ball);
                    balls.splice(balls.indexOf(ball), 1);
                    console.log("Ball pocketed:", ball.render.fillStyle);
                }
            }
        });
    });
}


// --- Draw Section ---
function draw() {
    background(128, 128, 128);
    Engine.update(engine); // Update physics engine
    drawTable();           // Draw the table (pockets, lines, etc.)
    drawBalls();           // Render the balls based on their physics positions
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
        isStatic: true, // Prevent physics interaction until placement
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

    let cushionThickness = 10;

    // Top and bottom cushions
    rect(width / 2, height / 2 - tableHeight / 2 + cushionThickness / 2, tableWidth, cushionThickness);
    rect(width / 2, height / 2 + tableHeight / 2 - cushionThickness / 2, tableWidth, cushionThickness);

    // Left and right cushions
    rect(width / 2 - tableWidth / 2 + cushionThickness / 2, height / 2, cushionThickness, tableHeight);
    rect(width / 2 + tableWidth / 2 - cushionThickness / 2, height / 2, cushionThickness, tableHeight);
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

// --- Mouse Interaction ---
function mousePressed() {
    if (!isCueBallPlaced) {
        // Place the cue ball at the mouse position
        Body.setPosition(cueBall, { x: mouseX, y: mouseY });

        // Ensure it's added to the physics world
        cueBall.isStatic = false;
        World.add(world, cueBall);

        isCueBallPlaced = true; // Mark as placed
    }
}



