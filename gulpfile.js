// sys
const gulp = require('gulp');
// else sys
const gulpif = require('gulp-if');
const del = require('del');
// html
// const rigger = require('gulp-rigger');
// css
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const gcmq = require('gulp-group-css-media-queries');
// js
// const concat= require('gulp-concat');
const babel = require('gulp-babel');
const uglyfly = require('gulp-uglyfly');
// browser sync
const browserSync = require('browser-sync').create();
// img
const imagemin = require('gulp-imagemin');
const imgCompress  = require('imagemin-jpeg-recompress');
const mozjpeg = require('imagemin-mozjpeg');
// tinypng
const tiny = 'API';
const tingpng = require('gulp-tinypng');
// smartgrid
const smartgrid = require('smart-grid');
// my variables fo dev
const isDev = process.argv.includes('--dev');
const isProd = !isDev;
// include files
const fileinclude = require("gulp-file-include");
// svg sprite
const svgmin = require("gulp-svgmin");
const cheerio = require("gulp-cheerio");
const svgSprite = require("gulp-svg-sprite");
const replace = require("gulp-replace");
// html validate
const htmlValidator = require('gulp-w3c-html-validator');
// fonts 
const ttf2woff2 = require('gulp-ttf2woff2');
const fs = require('fs');
const ttf2woff = require('gulp-ttf2woff');

require('./conf.js')

// delete dist dir
function clean(){
    return del(distDir)
}

function styles(){

    return gulp.src(config.app.sass)

            .pipe(gulpif(isDev, sourcemaps.init()))
            .pipe(sass().on('error', sass.logError))
            .pipe(gcmq())
            .pipe(autoprefixer({
                browsers: ['> 0.1%'],
                cascade: false
            }))
            .pipe(gulpif(isProd, cleanCSS({
                level: 2
            })))
            .pipe(gulpif(isDev, sourcemaps.write()))

            .pipe(gulp.dest(config.dist.css))
            .pipe(browserSync.stream())

}

function scripts(){

    return gulp.src(config.app.js)
            // .pipe(concat('script.js'))
            .pipe(fileinclude())
            .pipe(babel({
              presets: ['@babel/env']
             }))
             
            .pipe(gulpif(isProd,
              uglyfly({
                toplevel: true
              })
            ))

            .pipe(gulp.dest(config.dist.js))
            .pipe(browserSync.stream())
}

function html(){

    return gulp.src(html_arch)

            // .pipe(rigger())
            .pipe(fileinclude())
            .pipe(htmlValidator())
            .pipe(gulp.dest(distDir))
            .pipe(browserSync.stream())
}

function php(){

    return gulp.src(config.app.php)


            .pipe(gulp.dest(distDir))
            .pipe(browserSync.stream())
}

function images(){

    return gulp.src([config.app.img, '!./app/static/img/svg/*.+(jpg|jpeg|png|svg)'])

    .pipe(gulpif(isProd,
      imagemin([
        imgCompress({
            loops: 4,
            min: 70,
            max: 80,
            quality: 'high'
        }),
        mozjpeg({
          quality: 60,
          progressive: true,
          tune: "ms-ssim",
          smooth: 2
        }),
        imagemin.gifsicle(),
        imagemin.svgo()
      ])
    ))

    .pipe(gulpif(isProd, tingpng(tiny) ))

    .pipe(gulp.dest(config.dist.img))
    .pipe(browserSync.stream())
}

// function fonts(){

//     return gulp.src(config.app.fonts)

//            .pipe(gulp.dest(config.dist.fonts))
//            .pipe(browserSync.stream())
// }

const fontTtf2Woff = () => {
  return gulp.src('./app/static/fonts/**/*.ttf')
    .pipe(ttf2woff())
    .pipe(gulp.dest('./dist/static/fonts/'));
}

const fontTtf2Woff2 = () => {
  return gulp.src('./app/static/fonts/**/*.ttf')
    .pipe(ttf2woff2())
    .pipe(gulp.dest('./dist/static/fonts/'));
}

const checkWeight = (fontname) => {
  let weight = 400;
  switch (true) {
    case /Thin/.test(fontname):
      weight = 100;
      break;
    case /ExtraLight/.test(fontname):
      weight = 200;
      break;
    case /Light/.test(fontname):
      weight = 300;
      break;
    case /Regular/.test(fontname):
      weight = 400;
      break;
    case /Medium/.test(fontname):
      weight = 500;
      break;
    case /SemiBold/.test(fontname):
      weight = 600;
      break;
    case /Semi/.test(fontname):
      weight = 600;
      break;
    case /Bold/.test(fontname):
      weight = 700;
      break;
    case /ExtraBold/.test(fontname):
      weight = 800;
      break;
    case /Heavy/.test(fontname):
      weight = 700;
      break;
    case /Black/.test(fontname):
      weight = 900;
      break;
    default:
      weight = 400;
  }
  return weight;
}

const cb = () => {}

let srcFonts = './app/static/sass/_fonts.scss';
let appFonts = './app/static/fonts/';

const fontsStyle = (done) => {
  fs.writeFile(srcFonts, '', cb);
  fs.readdir(appFonts, function (err, items) {
    if (items) {
      let c_fontname;
      for (var i = 0; i < items.length; i++) {
				let fontname = items[i].split('.');
				fontname = fontname[0];
        let font = fontname.split('-')[0];
        let weight = checkWeight(fontname);

        if (c_fontname != fontname) {
          fs.appendFile(srcFonts, '@include font-face("' + font + '", "' + fontname + '", ' + weight +');\r\n', cb);
        }
        else {
          console.log(c_fontname);
          console.log(fontname);

        }
        c_fontname = fontname;
      }
    }
  })

  done();
}


function watch() {

        browserSync.init({

          server: {
            baseDir: distDir
          }
          // if u want to use sync + ur localhost
          // proxy: config.localhost
        })

      gulp.watch(config.watch.html, html)
      gulp.watch(config.watch.php, php)
      gulp.watch(config.watch.sass, styles)
      gulp.watch(config.watch.img, images)
      gulp.watch(config.watch.js, scripts)
      gulp.watch(config.watch.svg, svg)
      gulp.watch(config.watch.grid, grid)
      gulp.watch(config.watch.fonts, ttf2woff);
      gulp.watch(config.watch.fonts, ttf2woff2);
      gulp.watch('./dist/static/fonts', fontsStyle);
}

function svg() {
  return gulp.src(config.app.svg)
    .pipe(svgmin({
        js2svg: {
            pretty: true
        }
    }))
    .pipe(cheerio({
        run: function($) {
            $('[fill]').removeAttr('fill');
            $('[stroke]').removeAttr('stroke');
            $('[style]').removeAttr('style');
        },
        parserOptions: {xmlMode: true}
    }))
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite({
        mode: {
          symbol: {
              sprite: "../svg/sprite.svg"
          }
        }
    }))
    .pipe(gulp.dest('dist/static/img'));
}

function grid(done){
    let settings = require(config.watch.grid)
    smartgrid(appDirstatic + 'sass/libs', settings)
    done()
};

let build = gulp.series(clean, gulp.parallel(styles, php, html, scripts, images, fontTtf2Woff, fontTtf2Woff2, fontsStyle, svg));

gulp.task('clean', clean);
gulp.task('build', build);
gulp.task('grid', grid);
gulp.task('svg', svg);
gulp.task('watch', gulp.series(build, watch));
