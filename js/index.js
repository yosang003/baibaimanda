//获取动态数据
function getData(url,page){

 $.ajax({
        url:url,
        type:'GET',
        dataType:'json',
        data:{curpage:page},
        success:function(data){



          var myhtml="";
          //ajax结合模板引擎使用
          //<!-- 渲染模板 -->
          myhtml+=template('mytest',data);
          $('#content').html(myhtml);
        },
        error:function(){
          alert("cuowu")
        }
      })
}


//获取top榜数据
function getTopData(url){

 $.ajax({
        url:"testjson/topreturn.json",
        type:'GET',
        dataType:'json',
        
        success:function(data){



          var myhtml="";
          //ajax结合模板引擎使用
          //<!-- 渲染模板 -->
          myhtml+=template('topBar',data);
          $('.sort').html(myhtml);
        },
        error:function(){
          alert("cuowu")
        }
      })
}


//发布弹框
    $(".publish").click(function(event) {
        // $(".publishAlert").show().addClass('animated fadeInRightBig');
        $(".publishAlert").removeClass('hide')
        
        var uploaders = $("input[name='uploadfile']");
        uploaders.each(function() {
         
           $(this).after($(this).clone().val(""));
            $(this).remove(); 

        });
        $("#rl_exp_input").val("");
        $(".publishAlert").show()
        $(".bodyMask").removeClass('hide');
            $("body").on('mousewheel',  function(event) {
            
             scrollFunc(event);

            
        });
            //火狐下兼容
        $("body").on('DOMMouseScroll',  function(event) {
            
            scrollFunc(event);

            
        });
        // setTimeout(function(){
        //     $(".publishAlert").removeClass('fadeInRightBig').addClass('bounce');
        // }, 600)
        // setTimeout(function(){
        //     $(".publishAlert").removeClass('bounce');
        // }, 1200)

    });
/*
    //关闭弹框
    $(".boxclose").click(function(event) {
        // $(".publishAlert").hide().addClass('animated fadeOutLeftBig');
        $(".publishAlert").hide()
        $(".bodyMask").addClass('hide');
        // setTimeout(function(){
        //     $(".publishAlert").removeClass('animated fadeOutLeftBig').addClass('hide');
        // }, 600)
    });*/
//弹框弹出后禁止滚动条滚动

function scrollFunc(e){
    e=e||window.event;
   if (e&&e.preventDefault){
        e.preventDefault();
        e.stopPropagation();
    }else{ 
     e.returnvalue=false;  
 
     return false;     
    }
}


//事件绑定
$(".nickname").on("click",function(){
     $(".nickLink").removeClass('hide')
})

//----------------------用户登陆后初始化页面------------------------------------------
$(function(){
  $.ajax({
        url:"testjson/topreturn.json",
        type:'GET',
        dataType:'json',
        
        success:function(data){



          var myhtml="";
          //ajax结合模板引擎使用
          //<!-- 渲染模板 -->
          myhtml+=template('topBar',data);
          var before=$('.sort').html();
          var sumhtml=before+myhtml;
          $('.sort').html(sumhtml);
        },
        error:function(){
          alert("cuowu")
        }
      })
	initPage();
})

function initPage(){
	var mycookies=getcookie("jsessionid");
	//首先判断是否已经登录，cookie是否有jsessionid这个属性
	if(mycookies=="1"){
          //向后台发送请求
          $.ajax({
			url:'testjson/indexreturn.json',
			type:'GET',
		
			dataType:'json',
			success:function(data){
				//将得到的数据渲染到页面上
				$(".nosigin").addClass("hide");
				$(".nickname").html(data.nickname);
				$(".nickname").removeClass('hide');
			}
		})
	}
	 	    
}
	
	//前端获取cookie的值
	 function getcookie(objname){//获取指定名称的cookie的值
          var arrstr = document.cookie.split("; ");
          for(var i = 0;i < arrstr.length;i ++){
          var temp = arrstr[i].split("=");
          if(temp[0] == objname) return unescape(temp[1]);
      }
}

//----------------------发表----------------------------------------------
//向后台发送文字及表情（先假设没有表情）信息
$(".fabiao").on("click",function(){
	var fabiaotext=$("#rl_exp_input").val();
    $.ajax({
			url:'testjson/fabiaoreturn.json',
			type:'GET',
			 data:{"text":fabiaotext},
			dataType:'json',
			success:function(data){
				//将得到的数据渲染到页面上(图片的路径，和发表的文字字符串)
				alert(data.text);
				
			}
		})
})



