///ポモドーロタイマーを制作するプログラム
window.onload = function () 
{
    let timeFlag = null;
    let coursFlag = false;
    let allTime;
    let restTime;
    let restAngle = 0;

    document.getElementById("start").onclick = function()
    {
        const min = document.getElementById("min");
        const sec = document.getElementById("sec");
        
        document.getElementById("start").style.display = "none";
        document.getElementById("stop").style.display = "inline";
        document.getElementById("interval_time").style.display = "none";
        document.getElementById("interval_cnt").style.display = "none";

        //一回目のスタートの処理をしてほしい為、初期値をnullにしている
        if(timeFlag == null)
        {
            coursFlag = true;
            allTime = parseInt(document.getElementById("min").value) * 60 + parseInt(document.getElementById("sec").value);
            restTime = parseInt(document.getElementById("inter_min").value) * 60 + parseInt(document.getElementById("inter_sec").value);
            
            document.getElementById('minutes').innerHTML = min.value;
            document.getElementById('second').innerHTML = sec.value;
        }

        document.getElementById("min").style.display = "none";
        document.getElementById("sec").style.display = "none";

        timeFlag = true;
        
        restAngle = 0;
        
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

    let angle = 0;

    setInterval(function()
    {
        if(timeFlag)
        {
            if( angle < 365 ) 
            {
                //1/10秒間隔でアニメーションを進めているため、*10している
                angle += 365/(allTime * 10);
            }
            drawCircle();
        }
        else if(coursFlag)
        {
            if(restAngle < 365)
            {
                //1/10秒間隔でアニメーションを進めているため、*10している
                restAngle += 365/(restTime * 10);
            }
            else
            {

            }
            restDrawCircle();
        }
    }
    ,100);

    setInterval(function()
    {
        if(timeFlag)
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
                const stopSound = new Audio("sound/stop.mp3");
                stopSound.play();

                document.getElementById("interval_time").style.display = "inline";
                document.getElementById("interval_cnt").style.display = "inline";
                // document.getElementById("min").style.display = "inline";
                // document.getElementById("sec").style.display = "inline";
                // document.getElementById("minutes").style.display = "none";
                // document.getElementById("second").style.display = "none";

                document.getElementById('inter_minutes').innerHTML = document.getElementById("inter_min").value;
                document.getElementById('inter_second').innerHTML = document.getElementById("inter_sec").value;
                document.getElementById("inter_min").style.display = "none";
                document.getElementById("inter_sec").style.display = "none";
            }
        }
        else
        {
            if(document.getElementById("inter_second").textContent > 0)
            {
                document.getElementById("inter_second").textContent -=1;
            }
            else if(document.getElementById("inter_minutes").textContent > 0)
            {
                document.getElementById("inter_minutes").textContent -=1;
                document.getElementById("inter_second").textContent = 59;
            }
        }
    }
    ,1000);

    function drawCircle() 
    {
        const shape = document.querySelector(".shape");
        shape.style.backgroundImage = `conic-gradient(black ${angle}deg, white ${angle}deg)`;
    }

    function restDrawCircle() 
    {
        const restShape = document.querySelector(".restShape");
        restShape.style.backgroundImage = `conic-gradient(red ${restAngle}deg, white ${restAngle}deg)`;
    }
}