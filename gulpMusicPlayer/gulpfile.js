const { src, dest, series, watch } = require('gulp');
//压缩html
var htmlclean = require('gulp-htmlclean');
//压缩图片
// var imagemin = require('gulp-imagemin');
//压缩js文件
var uglify = require('gulp-uglify');
//去掉js中调试语句  
var stripDebug = require('gulp-strip-debug');
// 将less转换成css
var less = require('gulp-less');
// 压缩css
var cleanCSS = require('gulp-clean-css');
// 使用postcss工具安装autoprofixer插件，自动添加css3属性
var postCss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
// 开启服务器
var connect = require('gulp-connect');

// 通过命令行设置环境变量export NODE_ENV=development

// 获取当前环境变量
// var devMod = process.env.NODE_ENV == 'development';
// console.log(devMod);

function html() {
    return src('src/html/*.html')
        // .pipe(htmlclean())
        .pipe(dest('dist/html/'))
        .pipe(connect.reload());
}
function css() {
    return src('src/css/*')
        .pipe(less())
        .pipe(postCss([autoprefixer()]))
        // .pipe(cleanCSS())
        .pipe(dest('dist/css/'))
        .pipe(connect.reload());

}
function js() {
    return src('src/js/*.js')
        // .pipe(stripDebug())
        // .pipe(uglify())
        .pipe(dest('dist/js/'))
        .pipe(connect.reload());
}
// function image() {
//     return src('src/image/*')
//         .pipe(imagemin())
//         .pipe(dest('dist/image'))
// }

// 创建一个开启服务的任务
function server() {
    connect.server({
        // 更改端口号
        port: "8888",
        // 自动刷新页面
        livereload: true
    });
}
// 监听文件，不用在gulp
watch('./src/html/*', html)
watch('./src/css/*', css)
watch('./src/js/*', js)

exports.default = series(html, css, js, server, watch);



