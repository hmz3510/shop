/***秒杀倒计时****/
$(()=>{
    var timer,now1 = new Date()
    target=now1.getTime() +999999999;
    setInterval(()=>{
        function countTime(){
                var now2 = new Date();
                var s = parseInt((target - now2.getTime())/1000);
                if(s>0){
                    var h = parseInt(s%(3600*24)/3600);
                    var m = parseInt(s%3600/60);
                    s = s%60;
                    if(h<10) h='0'+h;
                    if(m<10) m='0'+m;
                    if(s<10) s='0'+s;
                    var $parent=$(".skill-header>.skill-right");
                    $parent.children("strong:eq(0)").html(h);
                    $parent.children("strong:eq(1)").html(m);
                    $parent.children("strong:eq(2)").html(s);
                    timer=setTimeout(countTime,1000)
                }else{
                    clearTimeout(timer);
                    timer=null;
                    $(".sklii-header>.skill-right").children("strong:eq(2)").html("00");
                    alert('开始抢购');
                }
        }
        countTime();
    },1000)

/*商品秒杀点击事件 */
let $ul= $(".skill-footer>ul:first-child");
let lis = $(".skill-footer>ul>li");
//console.log(lis.length);
let move =0; 
let $arrow_l = $(".control-l");
let $arrow_r = $(".control-r");
    $arrow_l.on("click",function(){ 
        let $left = $(this)
        if(!$left.is(".active")){
        move--;
        let m_left=-1152*move
        $ul.css("marginLeft",m_left);
        if(lis.length-move==8){
            $left.addClass("active");
            $arrow_r.removeClass("active");
        }
    }
    })
    /*1152*/
    $arrow_r.on("click",function(){ 
        let $right = $(this)
        if(!$right.is(".active")){
        move++;
        let m_right=-1152*move
        $arrow_l.removeClass("active");
        $ul.css("marginLeft",m_right);
            if(lis.length-move<8){
                $right.addClass("active");
                $arrow_l.removeClass("active");
            }
        }
    })

    
//调用轮播配置
$(".container").show().carousel();




})