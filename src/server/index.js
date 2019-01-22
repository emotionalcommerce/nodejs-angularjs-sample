var express = require('express'),
    app = express(),
    path = require('path'),
    morgan = require('morgan'),
    request=require('request'),
    assert = require('assert'),
    cluster = require('cluster'),
    numCPUs = require('os').cpus().length;

module.exports = createApp;
function createApp (options) {
    app.use(morgan('combined'));
    app.set('views',__dirname + '/../client');
    app.set('view engine', 'ejs'); // so you can render('index')

    /**************************************************************************
     * Enable additional security
     *************************************************************************/
    require('./security')(app);
    //http://192.168.65.101:3000
    //https://dev.mainapi.emotionalcommerce.com
    if (!process.env.APP_BACKEND)     process.env.APP_BACKEND = 'https://mainapi.emotionalcommerce.com';
    if (!process.env.DM_BASEPATH)    process.env.DM_BASEPATH = '/';


    var proxyMiddleware = require('http-proxy-middleware'),
        url = require('url'),
        rewrite = {},
        backendUrl = url.parse(process.env.APP_BACKEND);

    rewrite['^'+ process.env.DM_BASEPATH + 'api'] = backendUrl.path + 'api';

    var backend = backendUrl.protocol + '//' + backendUrl.host;
    var proxy = proxyMiddleware('/', {
        pathRewrite: rewrite,
        changeOrigin: true, // needed for virtual hosted sites
        target: backend,
        onProxyReq: function (proxyReq, req, res) {
            console.log('Proxying request to %s%s',backend,req.url);
        }
    });

    var rootpath = process.env.DM_BASEPATH || '/';

    app.use(express.static(__dirname+'/../client'));
    app.use('/api', proxy);



    app.get('/getToken', function(req, res, next){
        var ClientOAuth2 = require('client-oauth2')
        var ecAuth = new ClientOAuth2({
            clientId:  process.env.EC_CLIENT_ID,
            clientSecret: process.env.EC_CLIENT_SECRET,
            accessTokenUri: 'https://appapi.emotionalcommerce.com/oauth/token',
            authorizationUri: 'https://appapi.emotionalcommerce.com/oauth/authorize',
            scopes: ['client']
        });

        ecAuth.credentials.getToken().then(function (user) {
            var accessToken = user.accessToken;
            return res.send(accessToken);
        }).catch(function (error) {

        });
    });

    app.get('/*',function(req,res,next){
        var title='Virtual Store - Enabling The Human Side Of Commerce';
        var descr='We provide solutions that bring emotional experiences to digital and physical products, allowing your brand to increase its touch points with customers.';

        res.render('index', {
            environment: process.env.NODE_ENV,
            fullMenu: process.env.FULL_MENU || 1,
            basePath: process.env.DM_BASEPATH || req.basepath || '/',
            apiPath: process.env.APP_BACKEND,
            title: title,
            description: descr
        });


    });

    return app;
}

/**
 * Start the application if module is called
 * directly and not required by other module
 */
if(require.main === module){
    console.log('Running for ' + process.env.NODE_ENV);
    //if basepath is set we do a verification - basepath must start and end with a slash
    if (process.env.DM_BASEPATH) {
        assert(process.env.DM_BASEPATH.match(/^\/[\w\/]+\/$/),'DM_BASEPATH must match pattern /baseurl/ (must start and end with a slash like in /basepathOfFrontend/)')
    }

    if (process.env.APP_BACKEND) {
        assert(process.env.APP_BACKEND.match(/^http[s]?:\/\/[\-\w\d.\/:@]+\/$/),'APP_BACKEND must contain servername and rootpath of server (must end with a slash line in http://foo.com/basepathOfBackend/)')
    }

    //wrap app with a outer one to support application contexts

    if (cluster.isMaster) {
        console.log("Master is running" + process.pid);

        // Fork workers.
        for (var i = 0; i < numCPUs; i++) {
            cluster.fork();
        }

        cluster.on('exit', function (worker, code, signal) {
            console.log("worker died" + worker.process.pid);
        });
    } else {

        var outerApp = express();
        outerApp.use(process.env.DM_BASEPATH || '/', createApp());

        var port = process.env.DM_PORT || 8084;
        var range = process.env.DM_RANGE || '0.0.0.0';
        outerApp.listen(port, range, function(){
            console.log('Express running on port %s:%s', range, port);
        });
    }


}