$(function($){

	initPage();
	$(".personal").on("click","a",function(){
		$(".personLink").removeClass("hide");
		$(".personLink").addClass("show");

	})
})

function initPage(){
	// ------这里是前端设置的jsessionid的值，这个cookie应该由后台设置，这里是模拟
	setcookie("jsessionid","1");
	// -----------------------------
	
	var mycookies=getcookie("jsessionid");
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

	//前端设置一个cookie
	function setcookie(name,value)
	{
		var cookie=name+"="+encodeURIComponent(value);
		document.cookie=cookie;
	}
	//前端获取cookie的值
	 function getcookie(objname){//获取指定名称的cookie的值
          var arrstr = document.cookie.split("; ");
          for(var i = 0;i < arrstr.length;i ++){
          var temp = arrstr[i].split("=");
          if(temp[0] == objname) return unescape(temp[1]);
      }
}