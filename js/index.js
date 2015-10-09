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

//发布弹框
    $(".publish").click(function(event) {
        // $(".publishAlert").show().addClass('animated fadeInRightBig');
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

    //关闭弹框
    $(".boxclose").click(function(event) {
        // $(".publishAlert").hide().addClass('animated fadeOutLeftBig');
        $(".publishAlert").hide()
        $(".bodyMask").addClass('hide');
        // setTimeout(function(){
        //     $(".publishAlert").removeClass('animated fadeOutLeftBig').addClass('hide');
        // }, 600)
    });
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
$(".nickLink .goperpage").on("click",function(){
	window.location.href = "personpage.html";
})
//----------------------用户登陆后初始化页面------------------------------------------
$(function(){
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
			 data:{"jsessionid":mycookies},
			dataType:'json',
			success:function(data){
				//将得到的数据渲染到页面上
				$(".nosigin").addClass("hide");
				$(".nickname").html(data.username);
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

//--------------文件上传-------------------------
 jQuery(function() {
    var $ = jQuery,
        $list = $('#fileList'),
        // 优化retina, 在retina下这个值是2
        ratio = window.devicePixelRatio || 1,

        // 缩略图大小
        thumbnailWidth = 100 * ratio,
        thumbnailHeight = 100 * ratio,

        // Web Uploader实例
        uploader;

    // 初始化Web Uploader
    uploader = WebUploader.create({

        // 自动上传。
        auto: true,

        // swf文件路径
        swf: 'js/Uploader.swf',

        // 文件接收服务端。
        server: 'upload.html',

        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#filePicker',

        // 只允许选择文件，可选。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        }
    });

    // 当有文件添加进来的时候(文件加入队列)
    uploader.on( 'fileQueued', function( file ) {
        
        var $li = $(
                '<div id="' + file.id + '" class="file-item thumbnail">' +
                    '<img>' +
                    '<div class="info">' + file.name + '</div>' +
                '</div>'
                ),
            $img = $li.find('img');
        $list.html($li)
        $list.append( $li );

        // 创建缩略图
        uploader.makeThumb( file, function( error, src ) {
            if ( error ) {
                alert("不能预览")
                $img.replaceWith('<span>不能预览</span>');
                return;
            }

            $img.attr( 'src', src );
        }, thumbnailWidth, thumbnailHeight );
    });

    // 文件上传过程中创建进度条实时显示。
    uploader.on( 'uploadProgress', function( file, percentage ) {
        var $li = $( '#'+file.id ),
            $percent = $li.find('.progress span');

        // 避免重复创建
        if ( !$percent.length ) {
            $percent = $('<p class="progress"><span></span></p>')
                    .appendTo( $li )
                    .find('span');
        }

        $percent.css( 'width', percentage * 100 + '%' );
    });

    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploader.on( 'uploadSuccess', function( file ) {
        
        $( '#'+file.id ).addClass('upload-state-done');
    });

    // 文件上传失败，现实上传出错。
    uploader.on( 'uploadError', function( file ) {
        var $li = $( '#'+file.id ),
            $error = $li.find('div.error');

        // 避免重复创建
        if ( !$error.length ) {
            $error = $('<div class="error"></div>').appendTo( $li );
        }

        $error.text('上传失败');
    });

    // 完成上传完了，成功或者失败，先删除进度条。
    uploader.on( 'uploadComplete', function( file ) {
        $( '#'+file.id ).find('.progress').remove();
    });
    // -----------------------判断是否上传成功及获取后台返回的数据---------------------------
    uploader.on('uploadAccept',function(file, response){
    if ( hasError ) {
        // 通过return false来告诉组件，此文件上传有错。
        return false;
    }
    })
});

