System.config({
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
  },
  paths: {
    "github:*": "vendor/jspm_packages/github/*",
    "npm:*": "vendor/jspm_packages/npm/*"
  },

  map: {
    "angular": "github:angular/bower-angular@1.5.1",
    "angular-animate": "npm:angular-animate@1.5.0",
    "angular-bootstrap": "github:angular-ui/bootstrap-bower@1.1.2",
    "angular-cookies": "npm:angular-cookies@1.7.5",
    "angular-elastic": "npm:angular-elastic@2.5.1",
    "angular-file-upload": "github:danialfarid/ng-file-upload-bower@12.0.4",
    "angular-img-cropper": "npm:angular-img-cropper@0.0.2",
    "angular-local-storage": "npm:angular-local-storage@0.2.2",
    "angular-md5": "npm:angular-md5@0.1.10",
    "angular-mocks": "github:angular/bower-angular-mocks@1.5.0",
    "angular-moment": "npm:angular-moment@1.0.0-beta.4",
    "angular-oauth2": "npm:angular-oauth2@4.2.0",
    "angular-recaptcha": "npm:angular-recaptcha@4.1.5",
    "angular-resource": "github:angular/bower-angular-resource@1.5.0",
    "angular-toastr": "npm:angular-toastr@1.7.0",
    "angular-ui-bootstrap": "npm:angular-ui-bootstrap@1.1.2",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.15",
    "animate.less": "npm:animate.less@2.2.0",
    "babel": "npm:babel-core@5.8.25",
    "babel-runtime": "npm:babel-runtime@5.8.25",
    "bootstrap-less": "github:distros/bootstrap-less@3.3.9",
    "clean-css": "npm:clean-css@3.4.9",
    "core-js": "npm:core-js@1.2.0",
    "css": "github:systemjs/plugin-css@0.1.20",
    "dropzone": "npm:dropzone@4.3.0",
    "font-awesome": "npm:font-awesome@4.5.0",
    "jquery": "npm:jquery@2.2.0",
    "less": "github:aaike/jspm-less-plugin@0.0.5",
    "lodash": "npm:lodash@4.6.1",
    "metismenu": "npm:metismenu@2.5.0",
    "moment": "npm:moment@2.11.2",
    "ng-backstretch": "npm:ng-backstretch@0.1.3-beta",
    "ng-file-upload": "npm:ng-file-upload@11.2.3",
    "ng-tags-input": "npm:ng-tags-input@3.2.0",
    "query-string": "npm:query-string@6.2.0",
    "toastr": "npm:toastr@2.1.2",
    "ui-cropper": "npm:ui-cropper@1.0.6",
    "github:aaike/jspm-less-plugin@0.0.5": {
      "less.js": "github:distros/less@2.4.0"
    },
    "github:angular-ui/ui-router@0.2.15": {
      "angular": "github:angular/bower-angular@1.5.1"
    },
    "github:angular/bower-angular-mocks@1.5.0": {
      "angular": "github:angular/bower-angular@1.5.1"
    },
    "github:angular/bower-angular-resource@1.5.0": {
      "angular": "github:angular/bower-angular@1.5.1"
    },
    "github:distros/bootstrap-less@3.3.9": {
      "jquery": "github:components/jquery@2.2.0"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.4.1"
    },
    "github:jspm/nodelibs-buffer@0.1.1": {
      "buffer": "npm:buffer@5.1.0"
    },
    "github:jspm/nodelibs-events@0.1.1": {
      "events": "npm:events@1.0.2"
    },
    "github:jspm/nodelibs-http@1.7.1": {
      "Base64": "npm:Base64@0.2.1",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "github:jspm/nodelibs-https@0.1.0": {
      "https-browserify": "npm:https-browserify@0.0.0"
    },
    "github:jspm/nodelibs-os@0.1.0": {
      "os-browserify": "npm:os-browserify@0.1.2"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.10"
    },
    "github:jspm/nodelibs-stream@0.1.0": {
      "stream-browserify": "npm:stream-browserify@1.0.0"
    },
    "github:jspm/nodelibs-url@0.1.0": {
      "url": "npm:url@0.10.3"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:jspm/nodelibs-vm@0.1.0": {
      "vm-browserify": "npm:vm-browserify@0.0.4"
    },
    "npm:amdefine@1.0.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "module": "github:jspm/nodelibs-module@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:angular-animate@1.5.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:angular-elastic@2.5.1": {
      "angular": "npm:angular@1.6.9"
    },
    "npm:angular-moment@1.0.0-beta.4": {
      "moment": "npm:moment@2.11.2"
    },
    "npm:angular-oauth2@4.2.0": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:assert@1.4.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@5.8.25": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:buffer@5.1.0": {
      "base64-js": "npm:base64-js@1.2.3",
      "ieee754": "npm:ieee754@1.1.11"
    },
    "npm:clean-css@3.4.9": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "commander": "npm:commander@2.8.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "http": "github:jspm/nodelibs-http@1.7.1",
      "https": "github:jspm/nodelibs-https@0.1.0",
      "os": "github:jspm/nodelibs-os@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "source-map": "npm:source-map@0.4.4",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:commander@2.8.1": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "graceful-readlink": "npm:graceful-readlink@1.0.1",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:core-js@1.2.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:core-util-is@1.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1"
    },
    "npm:dropzone@4.3.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:font-awesome@4.5.0": {
      "css": "github:systemjs/plugin-css@0.1.20"
    },
    "npm:graceful-readlink@1.0.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2"
    },
    "npm:https-browserify@0.0.0": {
      "http": "github:jspm/nodelibs-http@1.7.1"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:lodash@4.6.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:metismenu@2.5.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:moment@2.11.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:ng-file-upload@11.2.3": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:os-browserify@0.1.2": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.10": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:punycode@1.3.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:query-string@6.2.0": {
      "decode-uri-component": "npm:decode-uri-component@0.2.0",
      "strict-uri-encode": "npm:strict-uri-encode@2.0.0"
    },
    "npm:readable-stream@1.1.13": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "core-util-is": "npm:core-util-is@1.0.2",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@0.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream-browserify": "npm:stream-browserify@1.0.0",
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "npm:source-map@0.4.4": {
      "amdefine": "npm:amdefine@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:stream-browserify@1.0.0": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "readable-stream": "npm:readable-stream@1.1.13"
    },
    "npm:string_decoder@0.10.31": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1"
    },
    "npm:toastr@2.1.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:ui-cropper@1.0.6": {
      "angular": "npm:angular@1.6.9",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:url@0.10.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "punycode": "npm:punycode@1.3.2",
      "querystring": "npm:querystring@0.2.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
    }
  }
});
