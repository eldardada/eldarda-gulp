"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.build = exports.swiper = exports.reset = exports.normalize = exports.grid = exports.svg = exports.watch = exports.clean = void 0;

var _gulp = _interopRequireDefault(require("gulp"));

var _gulpIf = _interopRequireDefault(require("gulp-if"));

var _del = _interopRequireDefault(require("del"));

var _gulpSass = _interopRequireDefault(require("gulp-sass"));

var _gulpAutoprefixer = _interopRequireDefault(require("gulp-autoprefixer"));

var _gulpCleanCss = _interopRequireDefault(require("gulp-clean-css"));

var _gulpSourcemaps = _interopRequireDefault(require("gulp-sourcemaps"));

var _gulpGroupCssMediaQueries = _interopRequireDefault(require("gulp-group-css-media-queries"));

var _browserSync = _interopRequireDefault(require("browser-sync"));

var _gulpImagemin = _interopRequireDefault(require("gulp-imagemin"));

var _imageminJpegRecompress = _interopRequireDefault(require("imagemin-jpeg-recompress"));

var _imageminMozjpeg = _interopRequireDefault(require("imagemin-mozjpeg"));

var _gulpTinypng = _interopRequireDefault(require("gulp-tinypng"));

var _smartGrid = _interopRequireDefault(require("smart-grid"));

var _gulpFileInclude = _interopRequireDefault(require("gulp-file-include"));

var _gulpW3cHtmlValidator = _interopRequireDefault(require("gulp-w3c-html-validator"));

var _gulpSvgmin = _interopRequireDefault(require("gulp-svgmin"));

var _gulpCheerio = _interopRequireDefault(require("gulp-cheerio"));

var _gulpSvgSprite = _interopRequireDefault(require("gulp-svg-sprite"));

var _gulpReplace = _interopRequireDefault(require("gulp-replace"));

var _gulpTtf2woff = _interopRequireDefault(require("gulp-ttf2woff2"));

var _fs = _interopRequireDefault(require("fs"));

var _gulpTtf2woff2 = _interopRequireDefault(require("gulp-ttf2woff"));

var _webpackStream = _interopRequireDefault(require("webpack-stream"));

require("./conf.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// sys
// else sys
// css
// browser sync
// img
// tinypng
var tiny = 'API';
// my variables for dev
var isDev = process.argv.includes('--dev');
var isProd = !isDev;
// webpack settings
var webConfig = {
  output: {
    filename: 'script.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: '/node_modules/',
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-object-rest-spread']
        }
      }
    }]
  },
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'eval-source-map' : 'none'
}; // delete dist dir

var clean = function clean() {
  return (0, _del["default"])(distDir);
};

exports.clean = clean;

var styles = function styles() {
  return _gulp["default"].src(config.app.sass).pipe((0, _gulpIf["default"])(isDev, _gulpSourcemaps["default"].init())).pipe((0, _gulpSass["default"])().on('error', _gulpSass["default"].logError)).pipe((0, _gulpGroupCssMediaQueries["default"])()).pipe((0, _gulpAutoprefixer["default"])({
    browsers: ['> 0.1%'],
    cascade: false
  })).pipe((0, _gulpIf["default"])(isProd, (0, _gulpCleanCss["default"])({
    level: 2
  }))).pipe((0, _gulpIf["default"])(isDev, _gulpSourcemaps["default"].write())).pipe(_gulp["default"].dest(config.dist.css)).pipe(_browserSync["default"].stream());
};

var scripts = function scripts() {
  return _gulp["default"].src(config.app.js).pipe((0, _webpackStream["default"])(webConfig)).pipe(_gulp["default"].dest(config.dist.js)).pipe(_browserSync["default"].stream());
};

var html = function html() {
  return _gulp["default"].src(html_arch).pipe((0, _gulpFileInclude["default"])()).pipe((0, _gulpW3cHtmlValidator["default"])()).pipe(_gulp["default"].dest(distDir)).pipe(_browserSync["default"].stream());
};

var php = function php() {
  return _gulp["default"].src(config.app.php).pipe(_gulp["default"].dest(distDir)).pipe(_browserSync["default"].stream());
};

var images = function images() {
  return _gulp["default"].src([config.app.img, '!app/static/img/svg/**']).pipe((0, _gulpIf["default"])(isProd, (0, _gulpImagemin["default"])([(0, _imageminJpegRecompress["default"])({
    loops: 4,
    min: 70,
    max: 80,
    quality: 'high'
  }), (0, _imageminMozjpeg["default"])({
    quality: 60,
    progressive: true,
    tune: "ms-ssim",
    smooth: 2
  }), _gulpImagemin["default"].gifsicle(), _gulpImagemin["default"].svgo()]))).pipe((0, _gulpIf["default"])(isProd, (0, _gulpTinypng["default"])(tiny))).pipe(_gulp["default"].dest(config.dist.img)).pipe(_browserSync["default"].stream());
};

var fontTtf2Woff = function fontTtf2Woff() {
  return _gulp["default"].src('./app/static/fonts/**/*.ttf').pipe((0, _gulpTtf2woff2["default"])()).pipe(_gulp["default"].dest('./dist/static/fonts/'));
};

var fontTtf2Woff2 = function fontTtf2Woff2() {
  return _gulp["default"].src('./app/static/fonts/**/*.ttf').pipe((0, _gulpTtf2woff["default"])()).pipe(_gulp["default"].dest('./dist/static/fonts/'));
};

var checkWeight = function checkWeight(fontname) {
  var weight = 400;

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
};

var fontsStyle = function fontsStyle(done) {
  _fs["default"].writeFile(srcFonts, '', cb);

  _fs["default"].readdir(appFonts, function (err, items) {
    if (items) {
      var c_fontname;

      for (var i = 0; i < items.length; i++) {
        var fontname = items[i].split('.');
        fontname = fontname[0];
        var font = fontname.split('-')[0];
        var weight = checkWeight(fontname);

        if (c_fontname != fontname) {
          _fs["default"].appendFile(srcFonts, '@include font-face("' + font + '", "' + fontname + '", ' + weight + ');\r\n', cb);
        } else {
          console.log(c_fontname);
          console.log(fontname);
        }

        c_fontname = fontname;
      }
    }
  });

  done();
};

var watch = function watch() {
  _browserSync["default"].init({
    server: {
      baseDir: distDir
    } // if u want to use sync + ur localhost
    // proxy: config.localhost

  });

  _gulp["default"].watch(config.watch.html, html);

  _gulp["default"].watch(config.watch.php, php);

  _gulp["default"].watch(config.watch.sass, styles);

  _gulp["default"].watch(config.watch.img, images);

  _gulp["default"].watch(config.watch.js, scripts);

  _gulp["default"].watch(config.watch.svg, svg);

  _gulp["default"].watch(config.watch.grid, grid);

  _gulp["default"].watch(config.watch.fonts, _gulp["default"].parallel(_gulpTtf2woff2["default"], _gulpTtf2woff["default"]));

  _gulp["default"].watch(config.dist.fonts, fontsStyle);
};

exports.watch = watch;

var svg = function svg() {
  return _gulp["default"].src(config.app.svg).pipe((0, _gulpSvgmin["default"])({
    js2svg: {
      pretty: true
    }
  })).pipe((0, _gulpCheerio["default"])({
    run: function run($) {
      $('[fill]').removeAttr('fill');
      $('[stroke]').removeAttr('stroke');
      $('[style]').removeAttr('style');
    },
    parserOptions: {
      xmlMode: true
    }
  })).pipe((0, _gulpReplace["default"])('&gt;', '>')).pipe((0, _gulpSvgSprite["default"])({
    mode: {
      symbol: {
        sprite: "../svg/sprite.svg"
      }
    }
  })).pipe(_gulp["default"].dest('dist/static/img'));
};

exports.svg = svg;

var grid = function grid(done) {
  var settings = require(config.watch.grid);

  (0, _smartGrid["default"])(appDirstatic + 'sass/libs', settings);
  done();
};

exports.grid = grid;

var normalize = function normalize() {
  return _gulp["default"].src(config.npm.normalize).pipe(_gulp["default"].dest(config.app.stylesLibs));
};

exports.normalize = normalize;

var reset = function reset() {
  return _gulp["default"].src(config.npm.reset).pipe(_gulp["default"].dest(config.app.stylesLibs));
};

exports.reset = reset;

var swiper = function swiper() {
  return _gulp["default"].src(config.npm.swiper).pipe(_gulp["default"].dest(config.app.stylesLibs));
};

exports.swiper = swiper;

var build = _gulp["default"].series(clean, _gulp["default"].parallel(styles, php, html, images, scripts, fontTtf2Woff, fontTtf2Woff2, fontsStyle, svg));

exports.build = build;