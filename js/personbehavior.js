$(function($){

	initPage();
	$(".personal").on("click","a",function(){
		$(".personLink").removeClass("hide");
		$(".personLink").addClass("show");

	})
})

function initPage(){
	    //当前登录者的数据
	    $.ajax({
			url:'testjson/indexreturn.json',
			type:'GET',
			 data:{"jsessionid":mycookies},
			dataType:'json',
			success:function(data){
				//将得到的数据渲染到页面上
				$(".currentPer").html(data.username);
				$(".perImg").attr("src",data.img)
				$(".say .nickname").html(data.username);
				$(".say .sentence").html(data.signature);
			}
		})
		

	}