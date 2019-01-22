import angular from 'angular';

export default function(ngModule, config) {

  function createComponent() {

    //the controller part
    function controllerLogic($scope,AuthService,$state) {
      var self = this;
      this.errors = [];
      this.data = {
        email:'',
        password:''
      };

      this.login = function() {
        this.errors = [];
        return AuthService.login(self.data)
          .then(function(user) {
            if (self.successState)
              $state.go(self.successState);
          })
          .catch(function(err) {
            self.errors = [err.data.error.message];
            if ($scope.failState)
              $state.go(self.failState);
          })
      };

      this.logout = function() {
        return AuthService.logout()
          .then(function(user) {
            $state.go('login');
          })
      };

        $scope.login = function(keyEvent) {
            if (keyEvent.which === 13)     self.login();
        }

    }

    return {
      bindings: {
        successState:'@successState',
        failState:'@failState',
        config:'=config'
      },
      controller: controllerLogic,
      templateUrl: config.baseUrl + '/component.html'
    }
  }
  ngModule.component('login', createComponent());

}

