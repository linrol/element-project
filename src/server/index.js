import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

var proxy = require('http-proxy-middleware');

import router from './router'
import config from '../../webpack.config'

const app = express()


// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: { colors: true }
}))

var proxy_filter = function (path, req) {
    return path.match('^/api') && ( req.method === 'GET' || req.method === 'POST' );
};

var proxy_options = {
    target: 'http://127.0.0.1:8080',
    onError(err, req, res) {
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });
        res.end('Something went wrong. And we are reporting a custom error message.' + err);
    },
    onProxyReq(proxyReq, req, res) {
        if ( req.method == "POST" && req.body ) {
            console.log(req.body);
            let body = req.body;
            body = Object.keys( body ).map(function( key ) {
                return encodeURIComponent( key ) + '=' + encodeURIComponent( body[ key ])
            }).join('&');
            proxyReq.setHeader( 'content-type', 'application/x-www-form-urlencoded' );
            proxyReq.setHeader( 'content-length', body.length );
            proxyReq.write( body );
            proxyReq.end();
        }
    }
};
app.use('/api', proxy( proxy_filter, proxy_options ));

// app.use('/api', proxy({target: 'http://127.0.0.1:8080', changeOrigin: true}));

app.use(webpackHotMiddleware(compiler))



app.use('/', router)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
// will print stacktrace
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: err
  })
})

app.listen(4000)

export default app
