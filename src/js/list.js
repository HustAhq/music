//列表页
(function ($, root) {
    var $playList = $('<div class="play-list">'+
					'<div class="head">播放列表</div>'+
					'<ul class="play-list-wrap"></ul>'+
					'<div class="close-btn">关闭</div>'+
					'</div>');
	var $scope = $(document.body);
	var controlManager;
	//渲染列表
	function render(data){
		var html = '';
		var len = data.length
		for(var i = 0;i < len;i++){
			html += '<li><h3>'+ data[i].song +'-<span>'+ data[i].singer +'</span></h3></li>';
		}
		$playList.find('.play-list-wrap').html(html);
		$scope.append($playList);
		bindEvent();
	}
    //标记歌曲
	function signSong(index) {
		$playList.find('li').removeClass('playing');
		$playList.find('li').eq(index).addClass('playing');
	}

	//展示播放列表
	function show (control) {
		controlManager = control;
		var index = controlManager.index;
		signSong(index);
		$playList.addClass('show');
	}
	function bindEvent(){
		$playList.find('.close-btn').on('click', function () {
              $playList.removeClass('show');
		});
		$playList.find('ul li').on('click', function () {
			var index = $(this).index();
			controlManager.index = index;
			$scope.trigger('play:change',[index,true]);
			signSong(index);
			$scope.find('.play-btn').addClass('playing');
			setTimeout(function(){
				$playList.removeClass('show');
			},500)
		})
	}
    root.List = {
        render : render,
		show : show,
		signSong : signSong
    }
}(window.Zepto, window.player || (window.player = {})))