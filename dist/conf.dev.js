"use strict";

// main dirs
global.appDir = './app/';
global.nodeModules = 'node_modules/';
global.appDirstatic = appDir + 'static/';
global.distDir = './dist/';
global.distDirstatic = distDir + 'static/'; // arch your html files

global.html_arch = appDir + '*.html'; // files name

global.mainSass = 'style.sass';
global.mainJs = 'script.js'; // for fonts include

global.srcFonts = appDirstatic + 'sass/_fonts.scss';

global.cb = function () {};

global.appFonts = appDirstatic + 'fonts/'; // config dirs

global.config = {
  // ur localhost
  localhost: 'http://localhost/wordpress/',
  // dirs for files ( develop )
  npm: {
    normalize: "".concat(nodeModules, "normalize.scss/*.scss"),
    reset: "".concat(nodeModules, "reset-css/sass/*.scss"),
    swiper: "".concat(nodeModules, "swiper/*.scss")
  },
  app: {
    php: "".concat(appDir, "*.php"),
    js: "".concat(appDirstatic, "js/index.js"),
    sass: "".concat(appDirstatic, "sass/") + mainSass,
    img: "".concat(appDirstatic, "img/**/*.+(jpg|jpeg|png|svg)"),
    fonts: "".concat(appDirstatic, "fonts/**/*"),
    svg: "".concat(appDirstatic, "img/svg/**/*.svg"),
    stylesLibs: "".concat(appDirstatic, "sass/libs")
  },
  // dirs for files ( deploy )
  dist: {
    js: "".concat(distDirstatic, "js/"),
    css: "".concat(distDir),
    img: "".concat(distDirstatic, "img/"),
    fonts: "".concat(distDirstatic, "fonts/")
  },
  // watching files dirs
  watch: {
    html: "".concat(appDir, "**/*.html"),
    php: "".concat(appDir, "*.php"),
    js: "".concat(appDirstatic, "js/**/*.js"),
    sass: "".concat(appDirstatic, "sass/**/*.+(sass|scss)"),
    img: "".concat(appDirstatic, "img/**/*"),
    svg: "".concat(appDirstatic, "img/svg/*.svg"),
    fonts: "".concat(appDirstatic, "fonts/**/*"),
    grid: "./smartgrid.js"
  }
};