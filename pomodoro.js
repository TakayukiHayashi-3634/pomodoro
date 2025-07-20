///ポモドーロタイマーを制作するプログラム
let m = 0;
let s = 10;

setInterval(function()
{
   document.getElementById("m").textContent = m;
   document.getElementById("s").textContent = s;
   
   if(s > 0) {s--;}
   if(s < 0 && m!=0)
   {
    m--;
    s = 59;
   }
   
   drawCircle(11);
}
,1000);


let angle = 0;
function drawCircle(s) {
    const shape = document.querySelector(".shape");

    if( angle < 365 ) {
        angle += Math.floor(365 / s);
        shape.style.backgroundImage = `conic-gradient(black ${angle}deg, white ${angle}deg)`;
    } else {
        console.log("アニメーションが終了しました");
    }
}