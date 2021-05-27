// Project pathes
const projectFolder = "build";
const sourceFolder = "source";
const path = {
    build: {
        html: `${projectFolder}/`,
        css: `${projectFolder}/css`,
        js: `${projectFolder}/js`,
        img: `${projectFolder}/img`,
        fonts: `${projectFolder}/fonts`
    },
    src: {
        html: [`${sourceFolder}/html/*.html`, `!${sourceFolder}/html/_*.html`],
        css: `${sourceFolder}/scss/style.scss`,
        js: `${sourceFolder}/js/script.js`,
        img: [`${sourceFolder}/img/**/*.{png,jpg,gif,svg,ico,webp}`],
        svgIcons: `${sourceFolder}/icons/*.svg`,
        fonts: `${sourceFolder}/fonts/*.{ttf,woff,woff2}`,
        favicon: {
            icon: `${sourceFolder}/favicon/favicon.svg`,
            manifest: `${sourceFolder}/favicon/manifest.json`
        }
    },
    watch: {
        html: `${sourceFolder}/html/**/*.html`,
        css: `${sourceFolder}/scss/**/*.scss`,
        js: `${sourceFolder}/js/**/*.js`,
        img: `${sourceFolder}/img/**/*.{png,jpg,gif,svg,ico,webp}`
    },
    clean: `./${projectFolder}/`
};

// Plugins
const {src, dest} = require("gulp");
const gulp = require("gulp");
const server = require("browser-sync").create();
const fileInclude = require("gulp-file-include");
const del = require("del");
const scss = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const groupMedia = require("gulp-group-css-media-queries");
const cleanCss = require("gulp-clean-css");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgSprite = require("gulp-svg-sprite");
const ttf2woff = require("gulp-ttf2woff");
const ttf2woff2 = require("gulp-ttf2woff2");
const fonter = require("gulp-fonter");
const svg2png = require("gulp-svg2png");
const ghPages = require("gulp-gh-pages");


function browserSync() {
    server.init({
        server: {
            baseDir: `./${projectFolder}/`,
        },
        port: 3000,
        notify: false
    });
}

function html() {
    return src(path.src.html)
        .pipe(fileInclude())
        .pipe(dest(path.build.html))
        .pipe(server.stream());
}

function css() {
    return src(path.src.css)
        .pipe(scss({
            outputStyle: "expanded"
        }))
        .pipe(groupMedia())
        .pipe(autoprefixer({
            overrideBrowserslist: ["last 5 versions"],
            cascade: true
        }))
        .pipe(dest(path.build.css))
        .pipe(cleanCss())
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(dest(path.build.css))
        .pipe(server.stream());
}

function js() {
    src(path.src.js)
        .pipe(fileInclude())
        .pipe(dest(path.build.js))

    return src(path.src.js)
        .pipe(fileInclude())
        .pipe(uglify())
        .pipe(rename({
            extname: ".min.js"
        }))
        .pipe(dest(path.build.js))
        .pipe(server.stream());
}

function img() {
    return src(path.src.img)
        .pipe(webp({
            quality: 80
        }))
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true,
            optimizationLevel: 1 // 0-7
        }))
        .pipe(dest(path.build.img))
        .pipe(server.stream());
}

function fonts() {
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts));
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts));
}

function spritesSVG() {
    return gulp.src(path.src.svgIcons)
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: "../sprite.svg"
                }
            }
        }))
        .pipe(imagemin())
        .pipe(dest((path.build.img)));
}

function favicon() {
    gulp.src(path.src.favicon.manifest)
        .pipe(dest(path.build.html));

    gulp.src(path.src.favicon.icon)
        .pipe(imagemin())
        .pipe(dest(path.build.html));

    gulp.src(path.src.favicon.icon)
        .pipe(svg2png({
            width: 180,
            height: 180
        }))
        .pipe(imagemin())
        .pipe(rename("apple-touch-icon.png"))
        .pipe(dest(path.build.html));

    return gulp.src(path.src.favicon.icon)
        .pipe(svg2png({
            width: 512,
            height: 512
        }))
        .pipe(imagemin())
        .pipe(rename("google-touch-icon.png"))
        .pipe(dest(path.build.html));
}

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], img);
}

function clean() {
    return del(path.clean);
}

gulp.task("otf2ttf" , function() {
    return gulp.src(`${sourceFolder}/fonts/*.otf`)
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest(`${sourceFolder}/fonts`));
});

gulp.task('deploy', function() {
    return gulp.src(`${projectFolder}/**/*`)
      .pipe(ghPages());
  });

const build = gulp.series(clean, gulp.parallel(js, css, html, img, fonts, spritesSVG, favicon));
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));

exports.favicon  = favicon;
exports.spritesSVG = spritesSVG;
exports.fonts = fonts;
exports.img = img;
exports.js = js;
exports.css = css;
exports.clean = clean;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
