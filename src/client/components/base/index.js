import angular from 'angular';
import router from './main.router'; //load router

export default function(ngModule, options){
  router(ngModule, { baseUrl: 'components/base'});
};
