$("#btn-face").click(function(e) {
	RequestService("/online/user/isAlive", "GET", null, function(data) {
		if(!data.success) {
			return false;
		} else {
			var strFace;
			var path = '/web/images/emoj/em2/';
			var path2 = '/web/images/emoj/em/';
			var tip = 'em2_';
			var tip2 = 'em_';
			if($('#embox').length <= 0) {
				strFace = '<div id="embox" style="position:absolute;z-index:1000;bottom:155px;right:0;">' +
					'<table border="0" cellspacing="0" cellpadding="0"><tr>';
				for(var i = 1; i <= 20; i++) {
					strFace += '<td><img src="' + path + handleEm(i) +
						'.png" onclick="setEm(' + handleEm(i) +
						')" /></td>';
					if(i % 10 == 0)
						strFace += '</tr><tr>';
				}
				for(var i = 1; i <= 20; i++) {
					strFace += '<td><img src="' + path2 + handleEm(i) +
						'.gif" onclick="setEm2(' + handleEm(i) +
						')" /></td>';
					if(i % 10 == 0)
						strFace += '</tr><tr>';
				}
				strFace += '</tr></table></div>';
				$('.right-list').append(strFace);
			} else {
				$('#embox').hide().remove();
			}

			e.stopPropagation();
		}
	});
});
//静态emoje
function setEm(e) {
	var emstr = '[em2_' + handleEm(e) + ']';
	//	var emstr='<img src="../images/emoj/em/' + handleEm(e) + '.gif" border="0" />';
	if($("#chat-content").val().length < 140) {
		$('#chat-content').val(function() {
			return $(this).val() + emstr;
		}).focus();
	}
};
//动态emoje
function setEm2(e) {
	var emstr = '[em_' + handleEm(e) + ']';
	//	var emstr='<img src="../images/emoj/em/' + handleEm(e) + '.gif" border="0" />';
	if($("#chat-content").val().length < 140) {
		$('#chat-content').val(function() {
			return $(this).val() + emstr;
		}).focus();
	}
};
template.helper("showEm", function(str) {
	if(!$.trim(str)) {
		return '';
	}
	str = str.replace(/\</g, '&lt;');
	str = str.replace(/\>/g, '&gt;');
	str = str.replace(/\n/g, '<br/>');
	str = str.replace(/\[em_([0-9]*)\]/g, '<img src="/web/images/emoj/em/$1.gif" border="0" />');
	str = str.replace(/\[em2_([0-9]*)\]/g, '<img src="/web/images/emoj/em2/$1.png" border="0" />');
	var nmsg = '';
	$.each(str.split(' '), function(i, n) {
		n = $.trim(n);
		if(n.indexOf('[uri_') == 0 && n.indexOf(']') == n.length - 1 && n.length > 6) {
			var u = n.substring(5, n.length - 1) + ' ';
			nmsg += '<a target="_blank" style="color: #2f53ff" href="' + u + '">' + u + '</a>' + ' ';
		} else if(n.indexOf('[bas_') == 0 && n.indexOf(']') == n.length - 1 && n.length > 6) {
			var u = n.substring(5, n.length - 1) + ' ';
			nmsg += '<img src="' + u + '"></img>' + ' ';
		} else {
			nmsg += n + ' ';
		}
		//      if (n.indexOf('[bas_') == 0 && n.indexOf(']') == n.length - 1 && n.length > 6) {
		//          var u = n.substring(5, n.length - 1) + ' ';
		//          nmsg += '<img src="' + u + '"></img>' + ' ';
		//      } else {
		//          nmsg += n + ' ';
		//      }
	});

	return nmsg;
})

function showEm(str) {
	if(!$.trim(str)) {
		return '';
	}
	str = str.replace(/\</g, '&lt;');
	str = str.replace(/\>/g, '&gt;');
	str = str.replace(/\n/g, '');
	str = str.replace(/\[em_([0-9]*)\]/g, '<img src="/web/images/emoj/em/$1.gif" border="0" />');
	str = str.replace(/\[em2_([0-9]*)\]/g, '<img src="/web/images/emoj/em2/$1.png" border="0" />');

	var nmsg = '';
	$.each(str.split(' '), function(i, n) {
		n = $.trim(n);
		if(n.indexOf('[uri_') == 0 && n.indexOf(']') == n.length - 1 && n.length > 6) {
			var u = n.substring(5, n.length - 1) + ' ';
			nmsg += '<a target="_blank" style="color: #2f53ff" href="' + u + '">' + u + '</a>' + ' ';
		} else if(n.indexOf('[bas_') == 0 && n.indexOf(']') == n.length - 1 && n.length > 6) {
			var u = n.substring(5, n.length - 1) + ' ';
			nmsg += '<img src="' + u + '"></img>' + ' ';
		} else {
			nmsg += n + ' ';
		}
	});

	return nmsg;
}

function handleEm(i) {
	if(i < 10) {
		return '0' + i;
	}
	return i;
}

// 监听表情
$(document).bind('click', function(ev) {
	var fid = ev.target;
	if(fid.id !== 'btn-face') {
		$('#emotion').fadeOut(200);
	}
	$('#embox').hide().remove();
});

//只看我的回答
$('#only-me').bind('click', function() {
	if(!($(this).find('i').hasClass("active"))) {
		$(this).find('i').addClass("active");
		$('#question-main .not-mines').hide();
	} else {
		$(this).find('i').removeClass("active");
		$('#question-main .not-mines').show();
	}
});

// 优选网络
$('#btn-network').bind('click', function() {

	var l = DWLive.getLine();
	var netlist = '';

	for(var i in l) {
		var net = l[i];
		netlist += '<li><input type="radio" value="' + i + '" name="network" id="network' + i + '" ' + (net.select == '1' ? "checked" : "") + '><label for="network' + i + '"></label></li>';
	}

	$('#change-network').html('').append(netlist);

	$('#network0').next().text('主线路');
	$('#network1').next().text('备用线路');

	$('#network').fadeToggle(200);

});

$('#work-close').bind('click', function() {
	$('#network').fadeOut(200);
});

// 选择网络
$('#btn-netsubmit').bind('click', function() {
	var network = $('input[name="network"]:checked').val();

	$('#network').fadeOut(200);

	DWLive.changeLine(network);

});

$('#btn-netcannel').bind('click', function() {
	$('#network').fadeOut(200);
});

// 只听音频
$("#btn-audio").click(function() {
	$(this).toggleClass("audio-enable");
	DWLive.onlyAudio();
});

// 侧边栏
// 右侧侧边栏
$('#right-bar').bind('click', function() {
	var winMain = $('#doc-main').attr('data-module');

	if($('#right-bar').css('right') == '260px') {
		$('#video-middle').animate({
			'right': 10
		}, 200);
		$('#right-bar').stop(1, 1).animate({
			"right": 0
		}, 200, function() {
			$('#right-switch').removeClass('right-icons').addClass('left-icons');
		});
		$('#ppt-tools').stop(1, 1).animate({
			"right": 10
		}, 200);
		// 判断当前主要内容
		if(winMain == '0') {
			$('#widget-video').stop(1, 1).animate({
				'width': '+=260',
				"right": 10
			}, 200);
		}
	} else {
		$('#video-middle').animate({
			right: 270
		}, 200);
		$('#right-bar').stop(1, 1).animate({
			"right": 260
		}, 200, function() {
			$('#right-switch').addClass('right-icons').removeClass('left-icons');
		});
		$('#ppt-tools').stop(1, 1).animate({
			"right": 270
		}, 200);
		// 判断当前主要内容
		if(winMain == '0') {
			$('#widget-video').stop(1, 1).animate({
				'width': '-=260',
				"right": 270
			}, 200);
		}
	}
	return;
});

// 左侧侧边栏
$('#left-bar').bind('click', function() {
	// 判断当前主要内容
	var winMain = $('#doc-main').attr('data-module');

	if($('#left-bar').css('left') == '260px') {
		// console.log($('#left-bar').css('left'))
		$('#video-middle').animate({
			left: 10
		}, 200);
		$('#left-bar').stop(1, 1).animate({
			"left": 0
		}, 200, function() {
			$('#left-switch').addClass('right-icons');
		});
		$('#ppt-tools').stop(1, 1).animate({
			"left": 10
		}, 200);
		// 判断当前主要内容
		if(winMain == '0') {
			$('#widget-video').stop(1, 1).animate({
				'width': '+=260',
				"left": 10
			}, 200);
			console.log('当前主要内容是视频');
		}
	} else {
		$('#video-middle').animate({
			left: 270
		}, 200);
		$('#left-bar').stop(1, 1).animate({
			"left": 260
		}, 200, function() {
			$('#left-switch').removeClass('right-icons');
		});
		$('#ppt-tools').stop(1, 1).animate({
			"left": 270
		}, 200);
		// 判断当前主要内容
		if(winMain == '0') {
			$('#widget-video').stop(1, 1).animate({
				'width': '-=260',
				"left": 270
			}, 200);
			console.log('当前主要内容是视频');
		}
	}
	return;
});

// 视频切换
$('#btn-switch').bind('click', switchPptToVideo);

function switchPptToVideo() {
	if($('#widget-video').is(':animated')) {
		return false;
	}
	var video = $('#widget-video'),
		videoWidth = video.width(),
		videoHeight = video.height(),
		videoLeft = video.css('left'),
		videoRight = video.css('right'),
		videoZindex = video.css('z-index'),
		ppt = $('#doc-main'),
		pptWidth = $('#video-middle').width(),
		pptHeight = ppt.height(),
		pptLeft = $('#video-middle').css('left'),
		pptRight = $('#video-middle').css('right'),
		pptZindex = parseInt($('#video-middle').css('z-index')) + 1,
		op = video.offset().left,
		winMain = ppt.attr('data-module'),
		pptStyle, videoStyle, _width, _height;

	if(winMain == 1) {
		videoLeft = (videoLeft == 'auto' || videoLeft == '0px') ? '-270px' : videoLeft;
		pptStyle = {
				'width': videoWidth,
				'height': videoHeight,
				'left': videoLeft,
				'right': videoRight,
				'z-index': videoZindex
			},
			videoStyle = {
				'width': pptWidth,
				'height': pptHeight,
				'left': pptLeft,
				'right': pptRight,
				'z-index': pptZindex
			};

		if($.support.opacity) {
			video.fadeOut(400, function() {
				video.css(videoStyle).show();
			});

			ppt.fadeOut(400, function() {
				ppt.css(pptStyle).show();
			});
		} else {
			video.css(videoStyle);
			ppt.css(pptStyle);
		}
		ppt.attr('data-module', '0');
		$('#full-ppt').fadeOut(0, function() {
			$('#full-vod').fadeIn()
		});
	} else {
		pptLeft = (pptLeft == '270px') ? '0' : pptLeft;
		pptWidth = 'auto';
		videoLeft = (videoLeft == '270px') ? '0' : videoLeft;

		pptStyle = {
				'width': videoWidth,
				'height': videoHeight,
				'left': videoLeft,
				'right': videoRight,
				'z-index': videoZindex
			},
			videoStyle = {
				'width': pptWidth,
				'height': pptHeight,
				'left': pptLeft,
				'right': pptRight,
				'z-index': pptZindex
			};

		if($.support.opacity) {
			video.stop(1, 1).fadeOut(400, function() {
				video.css(videoStyle).removeAttr('style').show();
			});
			ppt.stop(1, 1).fadeOut(400, function() {
				ppt.css(pptStyle).removeAttr('style').show();
			});
		} else {
			video.css(videoStyle);
			ppt.css(pptStyle);
		}
		ppt.attr('data-module', '1');
		$('#full-vod').fadeOut(0, function() {
			$('#full-ppt').fadeIn()
		});
	}
	return false;
}

var userAgent = navigator.userAgent.toLowerCase();
if(userAgent.indexOf('safari') > 0 && userAgent.indexOf('chrome') < 0) {
	$('.select-span').css('vertical-align', 0);
}