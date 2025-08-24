///ポモドーロタイマーを制作するプログラム
window.onload = function () 
{
    let timeFlag = null;
    let coursFlag = false;
    let allTime;
    let restAllTime;

    function pomodoroCnt ()
    {
        var count = 0;

        return {
            initialize: function(){
                count = 0;
            },
            set: function(value){
                count = value;
            },
            get: function(){
                return count;
            },
            increment: function() {
                count++;
            },
            show: function() {
                console.log(count);
            }
        }; 
    };

    const pomodoroCount = new pomodoroCnt();

    function circleAngle ()
    {
        var angle = 0;

        return {
            initialize: function(){
                angle = 0;
            },
            set: function(value){
                angle = value;
            },
            get: function(){
                return angle;
            },
            add: function(value) {
                angle+=value;
            },
            show: function() {
                console.log(angle);
            }
        }; 
    };

    const circle = 360;
    const pomodoroAngle = new circleAngle();
    const restAngle = new circleAngle();
    
    document.getElementById("start").onclick = function()
    {
        const min = document.getElementById("min");
        const sec = document.getElementById("sec");
        
        const intervalMin = document.getElementById("inter_min");
        const intervalSec = document.getElementById("inter_sec");

        document.getElementById("start").style.display = "none";
        document.getElementById("stop").style.display = "inline";
        document.getElementById("interval_time").style.display = "none";

        document.getElementById('interval_cnt').innerHTML = pomodoroCount.get() + "/"+ document.getElementById("interval").value;

        document.getElementById("interval").style.display = "none";
        //一回目のスタートの処理をしてほしい為、初期値をnullにしている
        if(timeFlag == null)
        {
            coursFlag = true;
            allTime = parseInt(min.value) * 60 + parseInt(sec.value);
            restAllTime = parseInt(intervalMin.value) * 60 + parseInt(intervalSec.value);
            
            document.getElementById('minutes').innerHTML = min.value;
            document.getElementById('second').innerHTML = sec.value;
        }

        min.style.display = "none";
        sec.style.display = "none";

        timeFlag = true;
        
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
        if(timeFlag)
        {
            if( pomodoroAngle.get() < circle ) 
            {
                //1/10秒間隔でアニメーションを進めているため、*10している
                pomodoroAngle.add(circle/(allTime * 10));
            }
            drawCircle();
        }
        else if(coursFlag)
        {
            if(restAngle.get() < circle)
            {
                restAngle.add(circle/(restAllTime * 10));
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

                pomodoroCount.increment();
                document.getElementById('interval_cnt').innerHTML = pomodoroCount.get() +"/"+ document.getElementById("interval").value;

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
            else if(document.getElementById("inter_second").textContent === "0" && document.getElementById("inter_minutes").textContent === "0")
            {
                const stopSound = new Audio("sound/stop.mp3");
                stopSound.play();
                timeFlag = true;

                document.getElementById("second").textContent = parseInt(allTime % 60);
                document.getElementById("minutes").textContent = parseInt(allTime / 60);

                document.getElementById("inter_second").textContent = parseInt(restAllTime % 60);
                document.getElementById("inter_minutes").textContent = parseInt(restAllTime / 60);

                pomodoroAngle.initialize();
                restAngle.initialize();
            }
        }
    }
    ,1000);

    function drawCircle() 
    {
        const shape = document.querySelector(".shape");
        shape.style.backgroundImage = `conic-gradient(black ${pomodoroAngle.get()}deg, white ${pomodoroAngle.get()}deg)`;
    }

    function restDrawCircle() 
    {
        const restShape = document.querySelector(".restShape");
        restShape.style.backgroundImage = `conic-gradient(red ${restAngle.get()}deg, white ${restAngle.get()}deg)`;
    }
}