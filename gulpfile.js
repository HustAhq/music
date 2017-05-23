var gulp = require('gulp');
var connect = require('gulp-connect');//server
var less = require('gulp-less');
//第一步，创建自定义的事件
        //  参数1 ：自定义事件的名字
        //  参数2 ：自定义事件在什么之前触发
        //  参数3 ：触发事件的回调函数

//转换html文件
gulp.task('html', function () {
    gulp.src('./src/index.html')  //找到要转换的文件
        .pipe(connect.reload())  //服务器的监听
        .pipe(gulp.dest('./dist'))  //写入输出的文件
}); 

//转换css文件
gulp.task('css', function () {
    gulp.src('./src/css/*.less')
        .pipe(connect.reload())
        .pipe(less())
        .pipe(gulp.dest('./dist/css'))
});

//转换js文件
gulp.task('js', function () {
    gulp.src('./src/js/*.js')
        .pipe(connect.reload())
        .pipe(gulp.dest('./dist/js'))
})
//开启服务器
gulp.task('server', function () {
    connect.server({
        port: 8080,
        livereload: true
    });
});

//监听任务
gulp.task('watch', function () {
    gulp.watch('./src/index.html', ['html']);
    gulp.watch('./src/css/*.less', ['css']);  //本地监听
    gulp.watch('./src/js/*.js', ['js']);
});


gulp.task('default', ['html', 'css', 'js', 'watch', 'server']);  //触发html的任务