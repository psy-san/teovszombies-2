const startBtn = document.getElementById("startBtn");
const menu = document.getElementById("menu");

const game = document.getElementById("game");
const bgVideo = document.getElementById("bgVideo");

const charactersDiv = document.getElementById("characters");
const zombiesDiv = document.getElementById("zombies");

const roundText = document.getElementById("roundText");
const cycleText = document.getElementById("cycleText");

const lifeValue = document.getElementById("lifeValue");

let round = 1;
let cycle = 1;
let baseLife = 100;

let unlocked = 1;

const zombies = [];
const characters = [];

for(let i=0;i<5;i++){

const row = document.createElement("div");
row.className="row";

document.getElementById("grid").appendChild(row);

}

startBtn.onclick = ()=>{

menu.style.display="none";

game.style.display="block";

document.getElementById("hud").style.display="block";

bgVideo.style.display="block";

bgVideo.play();

spawnMiku1();

startRounds();

};

function spawnMiku1(){

const video = document.createElement("video");

video.src="teto.mp4";

video.autoplay=true;
video.loop=true;
video.muted=true;

video.className="character";

video.style.left="100px";
video.style.top="100px";

charactersDiv.appendChild(video);

characters.push({
x:100,
y:100,
damage:1,
element:video
});

}

function unlockMiku2(){

const img=document.createElement("img");

img.src="assets/miku2.png";

img.className="character";

img.style.left="100px";
img.style.top="250px";

charactersDiv.appendChild(img);

characters.push({
x:100,
y:250,
damage:2,
element:img
});

}

function unlockTeto(){

const img=document.createElement("img");

img.src="assets/teto.png";

img.className="character";

img.style.left="100px";
img.style.top="400px";

charactersDiv.appendChild(img);

characters.push({
x:100,
y:400,
damage:4,
element:img
});

}

function spawnZombie(type){

const img=document.createElement("img");

img.className="zombie";

if(type==="boss"){
img.src="assets/boss.png";
}else{
img.src="assets/zombie1.png";
}

const lane=Math.floor(Math.random()*5);

const y=lane*140+80;

img.style.left="1200px";
img.style.top=y+"px";

zombiesDiv.appendChild(img);

zombies.push({

hp:type==="boss"?50:5,

speed:type==="boss"?1.5:1+round*.3,

x:1200,

y,

element:img

});

}

function startRounds(){

setInterval(()=>{

if(round===1){

for(let i=0;i<4;i++){

setTimeout(()=>{

spawnZombie();

},i*2000);

}

}

if(round===2){

unlockMiku2();

for(let i=0;i<10;i++){

setTimeout(()=>{

spawnZombie();

},i*1200);

}

}

if(round===3){

unlockTeto();

for(let i=0;i<15;i++){

setTimeout(()=>{

spawnZombie();

},i*800);

}

setTimeout(()=>{

spawnZombie("boss");

},5000);

}

round++;

if(round>3){

round=1;
cycle++;

cycleText.textContent="Ciclo "+cycle;

}

roundText.textContent="Round "+round;

},25000);

}

setInterval(()=>{

characters.forEach(character=>{

character.element.classList.add("hit");

setTimeout(()=>{

character.element.classList.remove("hit");

},200);

zombies.forEach(z=>{

if(Math.abs(z.x-character.x)<350){

z.hp-=character.damage;

}

});

});

},1000);

function update(){

for(let i=zombies.length-1;i>=0;i--){

const z=zombies[i];

z.x-=z.speed;

z.element.style.left=z.x+"px";

if(z.hp<=0){

z.element.remove();

zombies.splice(i,1);

continue;
}

if(z.x<50){

baseLife-=5;

lifeValue.textContent=baseLife;

z.element.remove();

zombies.splice(i,1);

}

}

requestAnimationFrame(update);

}

update();

