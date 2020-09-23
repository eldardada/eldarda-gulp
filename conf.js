// main dirs
global.appDir = './app/';
global.appDirstatic = appDir + 'static/';
global.distDir = './dist/';
global.distDirstatic = distDir + 'static/';
// arch your html files
global.html_arch = [
  'index'
].map(element => appDir + element + '.html')
// files name
global.mainSass = 'style.sass';
global.mainJs = 'script.js'
// config dirs
global.config = {

    // ur localhost
    localhost: 'http://localhost/wordpress/',

    // dirs for files ( develop )
    app: {
        php: `${appDir}*.php`,
        js: `${appDirstatic}js/**/*.js`,
        sass: `${appDirstatic}sass/` + mainSass,
        img: `${appDirstatic}img/**/*.+(jpg|jpeg|png|svg)`,
        fonts: `${appDirstatic}fonts/**/*`
    },
    // dirs for files ( deploy )
    dist: {
        js: `${distDirstatic}js/`,
        css: `${distDir}`,
        img: `${distDirstatic}img/`,
        fonts: `${distDirstatic}fonts/`
    },
    // watching files dirs
    watch: {
        html: `${appDir}*.html`,
        php: `${appDir}*.php`,
        js: `${appDirstatic}js/**/*.js`,
        sass: `${appDirstatic}sass/**/*.+(sass|scss)`,
        img: `${appDirstatic}img/**/*`,
        svg: `${appDirstatic}img/svg/*.svg`,
        fonts: `${appDirstatic}fonts/**/*`
    }
};
