import angular from 'angular';
import angular_router from 'angular-ui-router';
import angular_resource from 'angular-resource';
import angular_animate from 'angular-animate';
import bootstrap_ui from 'angular-bootstrap';
import localstorage from 'angular-local-storage';
import fileUpload from 'angular-file-upload';
import angular_tags_input from 'ng-tags-input';
import toastr from 'angular-toastr';
import jquery from 'jquery';
import metismenu from 'metismenu';
import angular_elastic from 'angular-elastic';
import angularImgCropper from 'angular-img-cropper';
import ngImgCrop from 'ui-cropper';
import angularCaptcha from 'angular-recaptcha';
import queryString from 'query-string';


/* components */
import baseRouter from 'components/base/index'; //base-portal router
import main from 'components/base/main.directive.js'; //main controller directive
import homepage from 'components/base/homepage/index.js';

import controllers from 'controllers/controllers.js';

/* directives */
import flex from 'directives/flexslider/jquery.flexslider-min.js';
import icheck from 'directives/icheck/index.js';
import chosen from 'directives/chosen/chosen.js';
import lengthDirective from 'directives/length-indicator/index';
import directives from 'directives/directives.js';


/* services */
import AuthService from 'services/backend/auth.service.js';
import LBService from 'services/backend/lb.services.js';

//css
import 'font-awesome/css/font-awesome.min.css!';
import 'style/pace.css!';
import 'directives/flexslider/flexslider.css!';

/* filters   */
import filters from 'filters/filters.js';

import owlCarousel from 'javascript/owl.carousel.js';
import timepicker from 'javascript/timepicker.js';
import javascript from 'javascript/inspinia.js';

/**************************************************************************
 * Define Angular application
 *************************************************************************/

var ngModule = angular.module('app', [
    'ui.router',
    'ngAnimate',
    'monospaced.elastic',
    'ui.bootstrap',
    'LocalStorageModule',
    'lbServices',
    'localytics.directives',
    'toastr',
    'load_theme_directive',
    'load_theme_filters',
    'load_theme_ctrl',
    'ngFileUpload',
    'angular-img-cropper',
    'uiCropper',
    'vcRecaptcha'
]);

ngModule.run(function () {  console.log('Bootstrapped!');});

var options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "500",
    "hideDuration": "1000",
    "timeOut": "8000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};


ngModule.config(function (toastrConfig) {
  angular.extend(toastrConfig, options);
});

ngModule.config(function(LoopBackResourceProvider) {
  LoopBackResourceProvider.setUrlBase(BASEPATH+'api/v1');
  LoopBackResourceProvider.setAuthHeader('x-access-token');
});

/**************************************************************************
 * Initialize components and pass component specific options
 *************************************************************************/
baseRouter(ngModule, {baseUrl: 'components/base'});

/**************************************************************************
 * Main Layout config controller directive
 *************************************************************************/
main(ngModule,{});

homepage(ngModule,{ baseUrl:'components/base/homepage' });

/**************************************************************************
 * directives
 *************************************************************************/
icheck(ngModule,{});
lengthDirective(ngModule, {});
/**************************************************************************
 * services
 *************************************************************************/
AuthService(ngModule);




