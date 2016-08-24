import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import opn from 'opn';

const $ = gulpLoadPlugins();

// webpack gulp 配置可参考 https://github.com/webpack/webpack-with-common-libs/blob/master/gulpfile.js

//复制替换文件，分开发、线上
//备选插件 https://www.npmjs.com/package/gulp-copy-rex
gulp.task('copy:dev', () => {
  const paths = [
    {src: 'client/config/index.dev.js', dest: 'client/config/index.js'},
    {src: 'client/store/configureStore.dev.js', dest: 'client/store/index.js'},
    {src: 'client/containers/Root.dev.js', dest: 'client/containers/Root.js'},
  ];
  return $.copy2(paths);
});

//正式环境
gulp.task('copy:prod', () => {
  const paths = [
    {src: 'app/scripts/config/index.prod.js', dest: 'app/scripts/config/index.js'},
    {src: 'app/scripts/store/configureStore.prod.js', dest: 'app/scripts/store/index.js'},
    {src: 'app/scripts/containers/Root.prod.js', dest: 'app/scripts/containers/Root.js'},
  ];
  return $.copy2(paths);
});

//清理临时和打包目录
gulp.task('clean', () => {
  return gulp.src(['dist', 'zip'])
    .pipe($.clean({force: true}));
});


//开发环境，启动服务
gulp.task('server', ['copy:dev'], () => {
  $.nodemon({
    exec: 'npm run start',
    watch: ['server'], // 设置监听的文件
    verbose: false,
  });

  // Chrome is google chrome on OS X, google-chrome on Linux and chrome on Windows.
  // app 在 OS X 中是 google chrome, 在 Windows 为 chrome ,在 Linux 为 google-chrome
  opn(port === 443 ? `https://${ip}/m-hongbao/` : `http://${ip}:${port}/m-hongbao/`, {app: 'google chrome'});

  gulp.watch(['client/config/index.dev.js', 'client/containers/Root.dev.js', 'client/store/configureStore.dev.js'], ['copy:dev']);
});


// 编译打包，正式环境
gulp.task('build', ['copy:prod'], () => {
});


//默认任务
gulp.task('default', () => {
  gulp.start('build');
});
