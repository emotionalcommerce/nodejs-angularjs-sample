import angular from 'angular';

export default function (ngModule) {

  function createDirective() {

    return {
      restrict: 'E',
      scope: {
          ngModel: '=ngModel',
          maxlength: '=maxlength'
      },
      template: '<span class="pull-right primary-color fadeIn" ng-show="ngModel.length > 0">{{maxlength-ngModel.length}}&nbsp;characters left</span>'
    }

  }

  ngModule.directive('lengthIndicator', createDirective);
  createDirective.$inject = [];

}

