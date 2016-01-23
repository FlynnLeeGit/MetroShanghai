var webpack = require('webpack');
var path = require('path');
var OpenBrowserWebpackPlugin = require('open-browser-webpack-plugin');

var args = require('./env.js');


var config = {
    entry: './entry.js',

    output: {
        path: path.join(__dirname, 'build'),
        publicPath: '/build/', //公共文件目录
        filename: 'bundle.js' //此处的name与entry中的键名一样
    },
    module: {
        //noParse:[/react/,/react-dom/],  //会直接打包而进行扫文件解析 省去了时间 注意此项会忽略此包依赖
        loaders: [{
            test: /\.css$/,
            loader: 'style!css!autoprefixer'
        }, {
            test: /\.scss$/,
            loader: 'style!css!autoprefixer!sass'
        }, {
            test: /\.png$/,
            loader: 'url?limit=8000' //url loader将尺寸小于8k图片转为base64
        }, {
            test: /\.js[x]?$/, //jsx文件的加载
            loader: 'jsx!babel',
            exclude: /node_modules/ //babel会将所有js文件预编译
        }, {
            test: /\.(eot|svg|ttf|woff)$/, //字体文件加载loader
            loader: 'url'
        }]
    },
    plugins: [
        new OpenBrowserWebpackPlugin({
            url: 'http://localhost:8080'
        }),
    ],

    resolve:{
        extensions:['','.js','.jsx','.json']  //可以省略的require后缀
    }

}



//生产环境插件配置
if (args.minify) { //minify参数下加载以下优化插件
    config.plugins = [
        new webpack.optimize.UglifyJsPlugin({ //压缩js文件
            compress: {
                warnings: false //不用显示警告信息
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(), //优化js插件
    ]
}

module.exports = config;