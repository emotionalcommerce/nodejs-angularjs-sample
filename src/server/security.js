
module.exports = function enable(app,useSSL,allowHPP) {
  var helmet = require('helmet');
  // enable authentication
  app.use(helmet()); //default protection
  //deal with http parameter pollution
  app.use(require('hpp')());

  app.use(helmet.xssFilter());
  // Don't allow anyone to put us into a frame.
  app.use(helmet.frameguard('deny'));
  // Allow from a specific host:
  //app.use(helmet.frameguard('allow-from', 'http://example.com'));

  //a little bit of peekaboo :-)
  app.use(helmet.hidePoweredBy({
    setTo: 'PHP/4.3.3',
    app: 'Apache/2.0.47 (Unix) DAV/2 PHP/4.3.3',
  }));

  //no sniff of headers
  app.use(helmet.noSniff());  //disable caching
  // app.use(helmet.noCache({ noEtag: true }));

  var compression = require('compression');
  app.use(compression());

  if (useSSL) {
    //enforce https
    var ninetyDaysInMilliseconds = 7776000000;
    app.use(helmet.hsts({ maxAge: ninetyDaysInMilliseconds }));
    //disable public key pinning
    var ninetyDaysInMilliseconds = 7776000000;
    app.use(helmet.publicKeyPins({
      maxAge: ninetyDaysInMilliseconds,
      sha256s: ['AbCdEf123=', 'ZyXwVu456='],
      includeSubdomains: true,         // optional
      reportUri: 'http://example.com'  // optional
    }));
  }

  //disable content security policy - for now
  app.use(helmet.contentSecurityPolicy({
   defaultSrc: ["'self'", 'localhost'],
   scriptSrc: ['self'],
   //styleSrc: ['style.com'],
   //imgSrc: ['img.com'],
   //connectSrc: ['connect.com'],
   //fontSrc: ['font.com'],
   //objectSrc: ['object.com'],
   //mediaSrc: ['media.com'],
   //frameSrc: ['frame.com'],
   //sandbox: ['allow-forms', 'allow-scripts'],
   //reportUri: '/report-violation',
   //reportOnly: false, // set to true if you only want to report errors
   //setAllHeaders: false, // set to true if you want to set all headers
   //disableAndroid: false, // set to true if you want to disable Android (browsers can vary and be buggy)
   //safari5: false // set to true if you want to force buggy CSP in Safari 5
   }));

};
