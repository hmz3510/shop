$(function(){
	//注册页切换注册方式点击事件
	$(".header-right").on("click","h3",function(){
		$this=$(this);
		if($this.text()=="用户注册"){
			$(".register-email").css("visibility","visible");
			$(".register-telphone").css("right",-280);
			$(".register-email").css("left",20);
            $(".register-telphone").css("visibility","hidden");
            $(".header-right>h3:first").addClass("box-bottom");
            $(".header-right>h3:last").removeClass("box-bottom");
		}else if($this.text()=="手机号注册"){
			$(".register-telphone").css("visibility","visible");
			$(".register-email").css("left",-280);
			$(".register-telphone").css("right",40);
			$(".register-email").css("visibility","hidden");
			$(".header-right>h3:last").addClass("box-bottom");
			$(".header-right>h3:first").removeClass("box-bottom");	
		}
	})

	$(".yhm>input").on("blur",function(){
		var uname = $(".yhm>input").val();
		console.log(1);
		$.ajax({
			url:"http://localhost:3000/users/isregister",
			type:"post",
			data:{uname},
			dataType:"json",
			success:function(res){
				console.log(res);
				if(res.ok==0){
					alert("用户名已存在")
				}else{
					alert("用户名可用")
				}
			}
		})
	})

	$(".bttn").on("click",function(){
		var uname = $(".yhm>input").val();
		var upwd = $(".mm>input").val()
		var email = $(".email>input").val()
		//console.log(uname,upwd,email)
		$.ajax({
			url:"http://localhost:3000/users/register",
			type:"post",
			data:{uname,upwd,email},
			dataType:"json",
			success:function(res){
				//console.log(res);
				if(res.ok==1){
					alert("注册成功,跳转登录页面")
					location.href="login.html";
				}
			}
		})
	})

});