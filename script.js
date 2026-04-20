let player = document.getElementById("player");
let game = document.getElementById("game");

let score = 0, coins = 0, lives = 5;

function jump() {
  player.style.bottom = "150px";
  setTimeout(()=>player.style.bottom="20px",300);
}

document.addEventListener("click", jump);

// spawn coin
setInterval(()=>{
  let coin = document.createElement("div");
  coin.classList.add("coin");
  coin.style.left = "100vw";
  coin.style.top = Math.random()*80+"%";
  game.appendChild(coin);

  move(coin,"coin");
},2000);

// spawn enemy
setInterval(()=>{
  let e = document.createElement("div");
  e.classList.add("enemy");
  e.style.left = "100vw";
  e.style.bottom = "20px";
  game.appendChild(e);

  move(e,"enemy");
},3000);

function move(el,type){
  let pos = window.innerWidth;
  let m = setInterval(()=>{
    pos -= 5;
    el.style.left = pos+"px";

    if(collide(player,el)){
      if(type=="coin"){coins++; score+=10;}
      else{lives--;}
      update();
      el.remove();
      clearInterval(m);
    }

    if(pos<0){
      el.remove();
      clearInterval(m);
    }
  },30);
}

function collide(a,b){
  let r1=a.getBoundingClientRect();
  let r2=b.getBoundingClientRect();
  return !(r1.right<r2.left || r1.left>r2.right || r1.bottom<r2.top || r1.top>r2.bottom);
}

function update(){
  document.getElementById("score").innerText=score;
  document.getElementById("coins").innerText=coins;
  document.getElementById("lives").innerText=lives;

  if(lives<=0){
    alert("Game Over");
    location.reload();
  }
}
