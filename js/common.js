var cam_flg = false;
var csr = $('#cursor');
var btn = $('#snapshot');
var btn_pos = btn.offset();
var n = 0;
function meta(){
	var video = $('#shoot_video').get(0);
	var video_pos = $('#shoot_video').position();
	var video_left = video_pos.left;
	var video_top = video_pos.top;
	$('#canvas').css({'width':video.clientWidth, 'height':video.clientHeight});
	var	canvas = $('#canvas').get(0);
	var ctx = canvas.getContext("2d");
	function shoot(){
		n++;
		ctx.clearRect ( 0 , 0 , video.clientWidth , video.clientHeight );
		ctx.drawImage(video,0,0);
		var img = new Image();
		img.src = canvas.toDataURL('image/png');
		img.onload = function(){
			$('#images_background').prepend(img);
		}
	}
	function shoot2(){
		n++;
		var csr_pos = csr.position();
		ctx.clearRect ( 0 , 0 , video.clientWidth , video.clientHeight );
		ctx.drawImage(video,(csr_pos.left-video_left),(csr_pos.top-video_top),284,160,0,0,video.clientWidth,video.clientHeight);
		var img = new Image();
		img.src = canvas.toDataURL('image/png');
		img.onload = function(){
			$('#images_background').prepend(img);
		}

/*		$(document).mousemove(function(e){
			var offset=$('#cam').offset();
			console.log(offset.left);
			console.log(offset.top);
			console.log(e.pageX);
			console.log(e.pageY);
			if(cam_flg){
				if(e.pageX>offset.left && e.pageY > offset.top){
					$('#cursor').css({'display':'none'});
					cam_flg = false;
				}
			}
		});*/


	}
	$('#snapshot').click(shoot);
	$('#cursor').click(function(e) {
			if(cam_flg){
				var offset=$('#cam').offset();
				if(e.pageX>offset.left && e.pageY > offset.top){
					$('#cursor').css({'display':'none'});
					cam_flg = false;
				}else{
					shoot2();
				}
			}
			

		});
}
$('#cam').click(cam);
function cam(){
	if(!cam_flg){
		$('#cursor').css({'display':'block'});
		cam_flg = true;
	}else{
		cam_flg = false;
		$('#cursor').css({'display':'none'});
	}
}
$(document).mousemove(function(e){
	var offset=$('#cam').offset();
	$("#cursor").css({left:e.pageX-100, top:e.pageY-100});

});
