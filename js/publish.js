var config; //声明最终要发送给后台的参数对象

$(function() {
	
	var uploaders = $("input[name='uploadfile']");
	uploaders.each(function() {
		$(this).on('blur', function(event) {
			var file = $(this).val();
			if (file) {


				//向后台发送请求
				$.ajax({
					url: 'testjson/publishImgreturn.json',
					type: 'GET',
					data: file,
					dataType: 'json',
					success: function(data) {
						if (data.ret) {
							config.addr = data.file;
							console.log(config.addr)
							$(".upnotice").html("上传成功");
						};

					},
					error: function() {
						$(".upnotice").html("上传失败");
					}
				})

			}
		});

	})


	$(".boxclose").on('click', function(event) {
		$(".exit").removeClass('hide');
		
	});


	$(".boxpublish").on('click', function(event) {
		var uptext = $("#rl_exp_input");
		if (uptext) {

			var upcontent = uptext.val();
			console.log(upcontent)
			config.txt = upcontent;
		};
		if (uploaders || uptext) {
			$.ajax({
				url: 'testjson/publishAllreturn.json',
				type: 'GET',
				data: config,
				dataType: 'json',
				success: function(data) {
					if (data.ret) {

						console.log("success")
						$(".publishAlert").addClass('hide');
						$(".bodyMask").addClass('hide');

					};

				}
			})
		} else {
			alert("请输入您想要发表的内容")
		}
	});





	$("input[name='yes']").on('click', function(event) {
		$(".exit").addClass('hide');
		$(".publishAlert").addClass('hide');
		$(".bodyMask").addClass('hide');
		/*向后台发送请求删除之前的图片*/
		var deleteFile=1;
		$.ajax({
				url: 'testjson/publishAllreturn.json',
				type: 'GET',
				data: deleteFile,
				dataType: 'json',
				success: function(data) {
					if (data.ret) {

						console.log("删除成功")

					};

				}
			})

	});
	$("input[name='no']").on('click', function(event) {
		$(".exit").addClass('hide');

	});



})