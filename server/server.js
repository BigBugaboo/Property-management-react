const Koa = require('koa');
const webpack = require('webpack');
const webpackConfig = require('../config/dev.js');
const devMiddleware = require('./middleware/devMiddleware');
const hotMiddleware = require('./middleware/hotMiddleware');
const path = require('path');
const Router = require('koa-router');
const fs = require('fs');

const router = new Router();
const app = new Koa();
const compiler = webpack(webpackConfig);

app.use(devMiddleware(compiler, {
    noInfo: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: false
    },
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true
    }
}))

app.use(hotMiddleware(compiler, {
    // log: console.log,
    // path: '/__webpack_hmr',
    // heartbeat: 10 * 1000
}))

router.get('/favicon.ico', (ctx, next) => {
    ctx.body = null
})

// 渲染页面
router.get('*', async (ctx, next) => {
    const htmlFile = await new Promise((resolve, reject) => {
        fs.readFile(
            path.resolve(__dirname, '../client/index.html'),
            (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data.toString());
                }
            });
        ctx.type = 'html';
        ctx.body = htmlFile;
    })
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);

console.log("     🚀   live server of part http://localhost:3000");
