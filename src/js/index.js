//主文件
var $ = window.Zepto;
var $scope = $(document.body);
var root = window.player;
var dataUrl = '/mock/data.json';
var render = root.render; 
var controlManager;
var processor = root.processor;
var audioMananer = new root.AudioManager();
var songList;  //获取的歌曲列表
var list = root.List; 

//绑定touch事件
function bindTouch(){
	$slidePoint = $scope.find('.point');
	var offset = $scope.find('.pro-wrapper').offset();
	var left = offset.left;
	var width = offset.width;
	$slidePoint.on('touchstart',function(){
		processor.stop();
	}).on('touchmove',function(e){
		var x = e.changedTouches[0].clientX;
		var percertage = (x - left) / width;
		if(percertage < 0 || percertage > 1){//解决边界值问题
			percertage = 0;
		}
		processor.update(percertage);
	}).on('touchend',function(e){
		var x = e.changedTouches[0].clientX;
		var percertage = (x - left) / width;
		if(percertage < 0 || percertage > 1){
			percertage = 0;
		}
		var index = controlManager.index;
		var curData = songList[index];
		var currenttime = curData.duration * percertage;
		processor.start(percertage);
		audioMananer.jumpToPlay(currenttime);
		$scope.find('.play-btn').addClass('playing');
		audioMananer.status = 'play';
	})
}

$scope.on('play:change', function (event, index, flag) {
    var curdata = songList[index];
    render(curdata);
    audioMananer.setAudioSource(curdata.audio);
	list.signSong(controlManager.index);
	if(audioMananer.status == 'play' || flag){
		audioMananer.play();
		processor.start();
	}
	processor.render(curdata.duration);
	processor.update(0);
});
//上一首
$scope.on('click', '.pre-btn',function () {
    var index = controlManager.prev();
    $scope.trigger('play:change', index);
});

//下一首
$scope.on('click', '.next-btn',function (){
    var index = controlManager.next();
    $scope.trigger('play:change', index);
});

//播放按钮
$scope.on('click','.play-btn',function(){
	if(audioMananer.status === 'play'){
		audioMananer.pause();
		processor.stop();
	}else{
		audioMananer.play();
		processor.start();
	}
	$(this).toggleClass('playing');
});

//点击列表按钮
$scope.on('click', '.list-btn', function () {
	list.show(controlManager);
});

//成功的回调函数
function successCallback(data) {
    songList = data;
    bindTouch();
	list.render(data);
    controlManager = new root.ControlManager(data.length);
    $scope.trigger('play:change', 0);
}
//获取信息
function getData (url, callback) {
    $.ajax({
        url: url,
        type: 'GET',
        success: callback,
        error: function () {
            console.log('出错了');
        }
    });
}

getData(dataUrl, successCallback);