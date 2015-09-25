$(function($){

	initPage();
	$(".personal").on("click","a",function(){
		$(".personLink").removeClass("hide");
		$(".personLink").addClass("show");

	})
})

function initPage(){
	    //当前登录者的数据
		var personconfig=JSON.parse(sessionStorage.data);
		$(".currentPer").html(personconfig.username);
		$(".perImg").attr("src",personconfig.img)
		$(".say .nickname").html(personconfig.username);
		$(".say .sentence").html(personconfig.signature);

	}