///ポモドーロタイマーを制作するプログラム
window.onload = function () 
{
    let timeFlag = null;
    let coursFlag = false;
    let allTime;

    document.getElementById("start").onclick = function()
    {
        const min = document.getElementById("min");
        const sec = document.getElementById("sec");
        
        //一回目のスタートの処理をしてほしい為、初期値をnullにしている
        if(timeFlag == null)
        {
            coursFlag = true;
            allTime = parseInt(document.getElementById("min").value) * 60 + parseInt(document.getElementById("sec").value);
            min.replaceWith(`${min.value}`);
            sec.replaceWith(`${sec.value}`);
        }
        timeFlag = true;

        document.getElementById("start").style.display = "none";
        document.getElementById("stop").style.display = "inline";

        const startSound = new Audio("sound/start.mp3");
        startSound.play();
    }

    document.getElementById("stop").onclick = function()
    {
        timeFlag = false;
        
        document.getElementById("start").style.display = "inline";
        document.getElementById("stop").style.display = "none";
    }

    document.getElementById("reset").onclick = function()
    {
        location.reload();
    }

    setInterval(function()
    {
        if(timeFlag && coursFlag)
        {
            drawCircle(allTime,coursFlag);
        }
    }
    ,100);

    setInterval(function()
    {
        let oldtimeFlag = timeFlag;
        if(timeFlag && coursFlag)
        {
            if(document.getElementById("second").textContent > 0)
            {
                document.getElementById("second").textContent -=1;
            }
            else if(document.getElementById("minutes").textContent > 0)
            {
                document.getElementById("minutes").textContent -=1;
                document.getElementById("second").textContent = 59;
            }
            else if(document.getElementById("second").textContent == 0 && document.getElementById("minutes").textContent == 0)
            {
                timeFlag = false;
            }
        }
        
        if(oldtimeFlag != timeFlag)
        {
            const stopSound = new Audio("sound/stop.mp3");
            stopSound.play();
        }
    }
    ,1000);

    let angle = 0;
    function drawCircle(allTime,coursFlag) 
    {
        const shape = document.querySelector(".shape");
        if( angle < 365 ) 
        {
            //1/10秒間隔でアニメーションを進めているため、*10している
            angle += 365/(allTime * 10);
            shape.style.backgroundImage = `conic-gradient(black ${angle}deg, white ${angle}deg)`;
        } 
        else
        {
            coursFlag = false;
            console.log("アニメーションが終了しました");
            console.log(`${allTime}`);
        }
    }
}