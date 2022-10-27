/*
201 - The case of Judge Hopper
Stage 3 - The dressing room

Officer: 7383430
CaseNum: 201-2-30091962-7383430

No sooner do you enter the lobby of the Cobol Theatre than the sound of gunshots leads you running towards the backstage area. You head towards a swinging door, the star dressing room. Sure enough you find a series of bullet holes peppered across the mirror. You are about to turn round and resume your chase when you notice a familiar pattern in the holes. Frantically you grab some lipstick from the dresser and draw on the mirror.

Use the vertex function to complete the pattern.


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

    beginShape();
    vertex(713, 38);
    vertex(766, 62);
    vertex(715, 109);
    vertex(640, 183);
    vertex(726, 208);
    vertex(654, 270);
    endShape();

}
