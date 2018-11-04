
$(function(){
/*头部订单事件*/
$(".header-main ul").on("mouseenter","li.dropdown",function(){
	var $this= $(this);
	$this.css({"background":"#fff"})
	$this.children(".dd-main").show();
	$this.children(".server").show();
	
})
$(".header-main ul").on("mouseleave","li.dropdown",function(){
	var $this= $(this);

	$this.css({"background":"none","border":"none"})
	$this.children(".dd-main").hide();
	$this.children(".server").hide();
})

$(".header-main ul").on("mouseenter","li.mobile",function(){
	var $this= $(this);
	$this.children(".phone").hide();
	$this.children(".mobile-main").show();
})
$(".header-main ul").on("mouseleave","li.mobile",function(){
	var $this= $(this);
	$this.children(".mobile-main").hide();
	$this.children(".phone").show();

})

$(".nav-header").on("mouseenter",".nav-title",function(){
	var $this =$(this);
	$this.children(".nav-list").slideDown(500)
	
})
$(".nav-header").on("mouseleave",".nav-title",function(){
	var $this =$(this);
	$this.children(".nav-list").slideUp(500);
})




/*头部固定所搜框 */
$(window).scroll(function(){
	var scrollTop = $(window).scrollTop()
	if(scrollTop>=500){
		$(".find").addClass('find-fix')	
	}else{
		$(".find").removeClass('find-fix')
	}
})

/*为搜索框绑定事件 */
	$input = $(".header-search").find("input");
		//console.log($input)
	$(".header-search>a").click(function(e){
		e.preventDefault();
		var kw = $input.val().trim();
		if(kw!==""){
			location.href=`product.html?kwords=${kw}`;
		}
		if(location.search.indexOf("kwords")!=-1){
			var kwords=decodeURI(location.search.split("=")[1]);
			$input.val(kwords);
		}
	})
	$input.keyup(function(e){
		if(e.keyCode==13) $(".header-search>a").click();
	})

	/*头部热词变换事件 */
	let n=0,len=6,timer;
	$searchUl = $(".search-key>ul");
	function changKw(){
		timer=setInterval(()=>{
			if(n>len) n=0;
			$(".header-search>input").attr('placeholder',$searchUl.find(`li:eq(${n})>a`).html())
			n++;
		},3000)
	}
	changKw()
	$(".header-search>input").hover(()=>{
		clearInterval(timer);
		timer=null;
	},
		()=>changKw()
	)

	/*为搜索热词添加单击事件*/
	$searchUl.on("click","li>a",function(e){
		e.preventDefault();
		var kw = $(this).html();
		location.href=`product.html?kwords=`+kw;
	})

	/*为固定搜索框绑定事件 */
	$(".searchbox>span>img").click(function(){
		var kw =$('.searchbox>span>img').parent().siblings().val();
		location.href=`product.html?kwords=${kw}`
	})


/*登录 */
	$.ajax({
		url:"",
		type:"get",
		success:function(res){	
			//绑定登录事件
			$(".login").click(function(e){
				e.preventDefault();
				location.href="login.html?back="+location.href;
			})
			$(".denglu").children(":last-child").click(function(e){
				e.preventDefault();
				location.href="register.html?back="+location.href;
			})

			$.ajax({
				url:"http://localhost:3000/users/islogin",
				type:"get",
				dataType:"json",
				success:function(res){
					//console.log(res);
					if(res.ok==0){
						$(".denglu").show().next().hide();
					}else{
						$(".zhuxiao").children(":first-child").next().html(res.uname);
						$(".zhuxiao").show().prev().hide();
					}
				}
			})



			/*注销功能 */
			$(".zhuxiao>a").click(function(e){
				e.preventDefault();
				$.ajax({
					url:"http://localhost:3000/users/signout",
					type:"get",
					success:function(){
						location.reload();
					}
				})
			})
		}
	})






})





    


