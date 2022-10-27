/*
201 - The case of Judge Hopper
Stage 4 - The warehouse

Officer: 7383430
CaseNum: 201-3-28830520-7383430

As you enter the ALGOL warehouse you are struck by the most horrendous stench - it’s not the fish. Lying amongst piles of fish carcasses you find the body of Judge Hopper. Gathering yourself together, you tie a handkerchief around your nose and mouth and quickly set about recording the evidence.

Draw around the Judge’s body ...

You should need around 20 vertices to draw round the judge and make sure you close your shape!


*/

var img;

function preload()
{
    img = loadImage('scene.png');
}

function setup()
{
    createCanvas(img.width,img.height);
}

function draw()
{

    image(img,0,0);
    stroke(255, 0, 0);
    strokeWeight(3);
    noFill();

    // write the code to draw around the Judge's body below
    beginShape();
    vertex(308, 283);
    vertex(566, 285);
    vertex(554, 213);
    vertex(553, 155);
    vertex(576, 114);
    vertex(597, 128);
    vertex(582, 165);
    vertex(601, 243);
    vertex(653, 266);
    vertex(652, 299);
    vertex(677, 316);
    vertex(623, 397);
    vertex(587, 409);
    vertex(579, 436);
    vertex(635, 448);
    vertex(624, 478);
    vertex(545, 453);
    vertex(544, 401);
    vertex(266, 425);
    vertex(264, 297);
    endShape(CLOSE);

}
