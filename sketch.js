const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint=Matter.Constraint;
const Render = Matter.Render;

var grd1,grd2,pt,gameState,ball,swing,m;
var blocks=[];

function setup() {
  createCanvas(1360,621);
	engine = Engine.create();
  world = engine.world;
  Engine.run(engine);
  grd1=Bodies.rectangle(width/2,2*height/3-25,288,16,{isStatic:true,restitution:0.5,friction:0.75});
  World.add(world,grd1);
  grd2=Bodies.rectangle(4*width/5,1.25*height/3,150,16,{isStatic:true,restitution:0.5,friction:0.75});
  World.add(world,grd2);
  world.gravity.y=1.25;
  gameState="wait";
  {
    for(var s=0;s<5;s+=1){
      for(var x=0;(x+2*s)<9;x+=1){
      var b=new Block(560+(x+s)*30,320,30,30);
      blocks.push(b);
      }
    }
    for(var s=0;s<4;s+=1){
      for(var x=0;(x+s)<4;x+=1){
      var k=new Block(1043+(x+s)*30,210,30,30);
      blocks.push(k);
      }
    }
  }
  if(blocks.length>=33){gameState="onsling";}
  ball= new shoot(width/8,height/2,25);
  swing=new Spring(ball.body,{x:width/5,y:height/3});
}

function show(){
  blocks[0].display();blocks[12].display();
  blocks[1].display();blocks[13].display();
  blocks[2].display();blocks[14].display();
  blocks[3].display();blocks[15].display();
  blocks[4].display();blocks[16].display();
  blocks[5].display();blocks[17].display();
  blocks[6].display();blocks[18].display();
  blocks[7].display();blocks[19].display();
  blocks[8].display();blocks[20].display();
  blocks[9].display();blocks[21].display();
  blocks[10].display();blocks[22].display();
  blocks[11].display();blocks[23].display();
  blocks[24].display();
  blocks[25].display();blocks[26].display();
  blocks[27].display();blocks[28].display();
  blocks[29].display();blocks[30].display();
  blocks[31].display();blocks[32].display();
  blocks[33].display();blocks[34].display();
  }

function draw() {
  background(0,0,0);
  rectMode(CENTER);
  rect(grd1.position.x,grd1.position.y,288,16);
  rect(grd2.position.x,grd2.position.y,150,16);
  rect(width/5,height/3,10,20);
 {fill(color(255,125,0));
  textSize(20);
  text("Press space for anchor",width/5,height/3-50);
  noFill();}
  show();
  ball.display();
  swing.display();
}

function mouseDragged(){
  if (gameState=="onSling"){
      Matter.Body.setPosition(ball.body,{x: mouseX , y: mouseY});
  }

}

function mouseReleased(){
  swing.fly();
  gameState = "launched";
}

function keyPressed(){
  if(keyCode === 32&&gameState=="launched"){
    Matter.Body.setPosition(ball.body,{x:width/8,y:height/2});
    swing=new Spring(ball.body,{x:width/5,y:height/3});  
     gameState="onSling";
  }
}

