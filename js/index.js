// --------------------------------------分页------------------------------------------
$(function(){
	//根据总页数判断，如果小于5页，则显示所有页数，如果大于5页，则显示5页。根据当前点击的页数生成
	//每页5条
	var pageCount = 11;//模拟后台总页数
	//生成分页按钮
	if(pageCount>5){
		page_icon(1,5,0);
	}else{
		page_icon(1,pageCount,0);
	}
	
	//点击分页按钮触发
	$("#pageGro li").live("click",function(){
		if(pageCount > 5){
			var pageNum = parseInt($(this).html());//获取当前页数
			pageGroup(pageNum,pageCount);
		}else{
			$(this).addClass("on");
			$(this).siblings("li").removeClass("on");
		}
	});
	
	//点击上一页触发
	$("#pageGro .pageUp").click(function(){
		
		if(pageCount > 5){
			var pageNum = parseInt($("#pageGro li.on").html());//获取当前页
			pageUp(pageNum,pageCount);
		}else{
			var index = $("#pageGro ul li.on").index();//获取当前页
			if(index > 0){
				$("#pageGro li").removeClass("on");//清除所有选中
				$("#pageGro ul li").eq(index-1).addClass("on");//选中上一页
			}
		}
	});
	
	//点击下一页触发
	$("#pageGro .pageDown").click(function(){

		// 当页数大于5页时
		if(pageCount > 5){
			var pageNum = parseInt($("#pageGro li.on").html());//获取当前页--1
			pageDown(pageNum,pageCount);
		}else{
			var index = $("#pageGro ul li.on").index();//获取当前页
			if(index+1 < pageCount){
				$("#pageGro li").removeClass("on");//清除所有选中
				$("#pageGro ul li").eq(index+1).addClass("on");//选中上一页
			}
		}
	});


	//发布弹框
	$(".publish").click(function(event) {
		$(".publishAlert").removeClass('hide').addClass('animated fadeInRightBig');
		$(".bodyMask").removeClass('hide');
			$("body").on('mousewheel',  function(event) {
			
			 scrollFunc(event);

			
		});
			//火狐下兼容
		$("body").on('DOMMouseScroll',  function(event) {
			
			scrollFunc(event);

			
		});
		setTimeout(function(){
			$(".publishAlert").removeClass('fadeInRightBig').addClass('bounce');
		}, 600)
		setTimeout(function(){
			$(".publishAlert").removeClass('bounce');
		}, 1200)

	});

	//关闭弹框
	$(".close").click(function(event) {
		$(".publishAlert").addClass('animated fadeOutLeftBig');
		$(".bodyMask").addClass('hide');
		setTimeout(function(){
			$(".publishAlert").removeClass('animated fadeOutLeftBig').addClass('hide');
		}, 600)
	});




});

//点击跳转页面
function pageGroup(pageNum,pageCount){
	switch(pageNum){
		case 1:
			page_icon(1,5,0);
		break;
		case 2:
			page_icon(1,5,1);
		break;
		case pageCount-1:
			page_icon(pageCount-4,pageCount,3);
		break;
		case pageCount:
			page_icon(pageCount-4,pageCount,4);
		break;
		default:
			page_icon(pageNum-2,pageNum+2,2);
		break;
	}
}

//根据当前选中页生成页面点击按钮
function page_icon(page,count,eq){
	var ul_html = "";
	for(var i=page; i<=count; i++){
		ul_html += "<li>"+i+"</li>";
	}
	$("#pageGro ul").html(ul_html);

	$("#pageGro ul li").eq(eq).addClass("on");
	// 根据当前的页数选择要显示的动态
	//(page-1)*5~(page-1)*5+5,将当前页数发给后台，向后台取数据
	

var url1='testjson/indextest.json';
getData(url1,page);



// $(window).scroll(function () {



//         var scrollTop = $(this).scrollTop();

//         var scrollHeight = $(document).height();
//         var windowHeight = $(this).height();
//         var topLocation=$(".sort").offset().top;
      
    
//         /*if (scrollTop + windowHeight == scrollHeight){*/

//         	if (scrollTop >=3*windowHeight/2){

//         	var url2='testjson/indextest2.json';
//         	getData(url2,page);
    
//         }

//         //固定top榜
        
//         if (scrollTop>topLocation) {
//         	$(".sort").css({
//         		position: 'fixed',
//         		top: '0',
//         		right: '150px'
//         	});

			
//         } 


      
//     })









	
}

//上一页
function pageUp(pageNum,pageCount){
	switch(pageNum){
		case 1:
		break;
		case 2:
			page_icon(1,5,0);
		break;
		case pageCount-1:
			page_icon(pageCount-4,pageCount,2);
		break;
		case pageCount:
			page_icon(pageCount-4,pageCount,3);
		break;
		default:
			page_icon(pageNum-2,pageNum+2,1);
		break;
	}
}

//下一页
//pageNum是当前页数
function pageDown(pageNum,pageCount){
	switch(pageNum){
		case 1:
			page_icon(1,5,1);//到第2页（12345）
		break;
		case 2:
			page_icon(1,5,2);//到第3页（12345）
		break;
		case pageCount-1:
			page_icon(pageCount-4,pageCount,4);
		break;
		case pageCount:
		break;
		default:
			page_icon(pageNum-2,pageNum+2,3);
		break;
	}
}
// --------------------------------------分页------------------------------------------
//获取数据

function getData(url,page){

 $.ajax({
        url:url,
        type:'GET',
        dataType:'json',
        data:{page:page},
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
$(".gosignin").on("click",function(){
	window.location.href = "signin.html";
})
$(".gosignup").on("click",function(){
	window.location.href = "signin.html";
})
$(".nickname").on("click",function(){
     $(".nickLink").removeClass('hide')
})
$(".nickLink .goperpage").on("click",function(){
	window.location.href = "personpage.html";
})
//----------------------用户登陆后初始化页面------------------------------------------
$(function(){
	initPage();
})

function initPage(){
	if (sessionStorage.getItem("state")==1) {
	    	//当前登录者的数据
			var personconfig=JSON.parse(sessionStorage.data);
			$(".nosigin").addClass("hide");
			$(".nickname").html(personconfig.username);
			$(".nickname").removeClass('hide');
		    };
	}

//----------------------发表----------------------------------------------------

