

// 初始化邮箱自动提示功能函数
$(function() {
	new EmailAutoComplete({});
});

$(document).ready(function() {
	//淡入
	// $(".wrap").fadeTo("slow", 1);
	//当输入框获得焦点的时候对应文字出现
	// $("p").on("focusin", function() {
	// 	$(this).find("span").css('display', 'inline').fadeIn(1000);
	// })
	// $("p").on("focusout", function() {
	// 	$(this).find("span").css('display', 'none').fadeOut(1000);
	// })
	$(".form-login .btn-gosign").on("click", function() {
		$(".login-box").addClass("rotation");
		$(".login-box").css('height', '480px');
		$(".form-signup").css('display', 'block');
		$(".form-login").css('display', 'none');
		setTimeout(function() {
			$(".login-box").removeClass("rotation");
		}, 500);
		return false;
	})
	$(".form-signup .btn-gologin").on("click", function() {
		// alert("shabi");
		$(".login-box").addClass("rotation");
		$(".login-box").css('height', '500px');
		$(".form-login").css('display', 'block');
		$(".form-signup").css('display', 'none');
		setTimeout(function() {
			$(".login-box").removeClass("rotation");
		}, 500);
		return false;
	})
	$(".two-code").on("click", function() {
		if ($(".two-code").hasClass("two-codemove")) {
			$(".two-code").removeClass("two-codemove");
			$(".two-code").animate({
				left: "0px"
			}, 500);
			$(".two-code-box").animate({
				left: "-150px"
			}, 500);
		} else {
			$(".two-code").addClass("two-codemove");
			$(".two-code").animate({
				left: "150px"
			}, 500);
			$(".two-code-box").animate({
				left: "0px"
			}, 500);
		}
	})
	$("button").focus(function() {
		this.blur()
	});
	//判断浏览器是否支持placeholder属性
	supportPlaceholder = 'placeholder' in document.createElement('input'),

		placeholder = function(input) {

			var text = input.attr('placeholder'),
				defaultValue = input.defaultValue;

			if (!defaultValue) {

				input.val(text).addClass("phcolor");
			}

			input.focus(function() {

				if (input.val() == text) {

					$(this).val("");
				}
			});


			input.blur(function() {

				if (input.val() == "") {

					$(this).val(text).addClass("phcolor");
				}
			});

			//输入的字符不为灰色
			input.keydown(function() {

				$(this).removeClass("phcolor");
			});
		};

	//当浏览器不支持placeholder属性时，调用placeholder函数
	if (!supportPlaceholder) {

		$('input').each(function() {

			text = $(this).attr("placeholder");

			if ($(this).attr("type") == "text") {

				placeholder($(this));
			}
		});
	}
})

//-----------------登录后台交互---------------------------------------
//为登录按钮绑定事件
$('#login-btn').on("click",function(){
	// 获取输入域的值
	var email=$('.inputElem').val();
	var pwd=$('.txt-password').val();
	//对输入是否合法进行判断
	var oksignin=function(email,pwd){
		return true;
	}()
	if(oksignin){

		var config={
			email:email,
			pwd:pwd
		}
		//向后台发送请求，自带jsessionid
		//这里并不需要后台返回数据，只是前端向后台提交数据，后台保存在session中，并在下一个页面调用相关信息（？此处的数据下一个页面中并未使用）
		$.ajax({
			url:'testjson/signreturn.json',
			type:'GET',
			 data:config,
			dataType:'json',
			success:function(data){

				
				if(data.ret==1)
				{

					alert("登录成功")


					
					//如果成功后台将跳转至新的页面,与此同时后台在相应中设置cookie jsessionid的值
					// ------这里是前端设置的jsessionid的值，这个cookie应该由后台设置，这里是模拟
	                 setcookie("jsessionid","1");
	                // -----------------------------
					window.location.href = "index.html";
				}
				else if(data.ret==-1)
				{
					alert("登录失败")
				}
			}
		})
	}
})

//前端设置一个cookie
	function setcookie(name,value)
	{
		var cookie=name+"="+encodeURIComponent(value);
		document.cookie=cookie;
	}
