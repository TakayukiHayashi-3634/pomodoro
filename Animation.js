const CircleAngle = (function()
{
    return{
        circleAngle : function()
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
        }
    }
}());

const Animation = function()
{
    const rad = 360;
    const pomodoroAngle = CircleAngle.circleAngle();

    return {
        circleAnimation : function(allTime)
        {
            if(pomodoroAngle.get() < rad) 
            {
                //1/10秒間隔でアニメーションを進めているため、*10している
                pomodoroAngle.add(rad/(allTime * 10));
            }
        },
        drawCircle :function(queryName,color)
        {
            const shape = document.querySelector(queryName);
            shape.style.backgroundImage = `conic-gradient(${color} ${pomodoroAngle.get()}deg, white ${pomodoroAngle.get()}deg)`;
            //console.log(`${pomodoroAngle.get()}`);
        },
        radReset : function()
        {
            pomodoroAngle.initialize();
        },
        debug : function()
        {
            //console.log(`${pomodoroAngle.get()}`);
        }
    }
};

export default Animation;