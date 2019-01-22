function UtilCtrl($rootScope, $scope, toastr, AuthService, $filter, localStorageService, $state) {
	$rootScope.action = ''; //to know when add or edit
	$rootScope.dateFormat = 'yyyy-MM-dd HH:mm';

	$rootScope.userAvatar = localStorageService.get('avatarUrl');

	if (localStorageService.get('storageFiles') != null) {
		$rootScope.filesPath = localStorageService.get('storageFiles');
	}

    $rootScope.userImage = function (item) {
        return ($rootScope.userAvatar ? ((item.indexOf('http') == -1) ? $rootScope.filesPath + "/" + $rootScope.userAvatar : $rootScope.userAvatar) : '../../style/img/placeholder_human.jpg');
    };

	$rootScope.dogId = localStorageService.get('dogId');

	$rootScope.error = function (err) {
		if (err.status == 401) {
			AuthService.logout();
			toastr['error']('Unauthorized access');
			return;
		}
		else if (typeof err.data != 'undefined' && typeof err.data.error != 'undefined') toastr['error'](err.data.error.message);
		else if (typeof err.statusText) toastr['error'](err.statusText);
		else toastr['error']('Undefined error');
	};

	$rootScope.$on("loader_show", function () {
		angular.element('#pace_status').addClass('pace-activity');
		angular.element('body').addClass('pace');
	});

	$rootScope.$on("loader_hide", function () {
		angular.element('#pace_status').removeClass('pace-activity');
		angular.element('body').removeClass('pace');
	});

	$rootScope.partOfM2 = function () {
		toastr['success']('Part of M2');
	};


	$rootScope.textLineCount = function (id) {
		return false;
	};

	
	$rootScope.goProfile=function(){
		var id=localStorageService.get('userName');
		id=encodeURI(id);
		window.location.href="../index/"+id;
	};


	$rootScope.searchRedirect = function (keyEvent) {
		if (keyEvent.which === 13) {
			if ($rootScope.search_key && $rootScope.filteredDogs.length > 0) {
				window.location.href = './index/search_results?filter=' + $rootScope.search_key;
				$rootScope.hideSearchResults();
			}
		}
	}

	$rootScope.hideSearchResults = function () {
		$('#search').val("");
		$('#search-result').hide();
	}

}

function ModalInstanceCtrl($scope, $rootScope, $uibModalInstance) {
	$scope.ok = function (type) {
		switch (type) {
			case 'reset':
				$uibModalInstance.close($scope.user);
				break;
			case 'post':
			case 'ban':
				$uibModalInstance.close();
				break;
			case 'user':
				$uibModalInstance.close($scope.user);
				break;
			case 'key':
				$uibModalInstance.close($scope.key);
				break;
		}
	};

	$scope.okDel = function () {
		switch ($rootScope.deleteType) {
			case 'etype':
				$uibModalInstance.close($scope.etype);
				break;
			case 'key':
				$uibModalInstance.close($scope.key);
				break;
			case 'event':
				$uibModalInstance.close($scope.event);
				break;
			case 'place':
				$uibModalInstance.close();
				break;
			case 'review':
				$uibModalInstance.close();
				break;
			case 'score':
				$uibModalInstance.close($scope.score);
				break;
			case 'text':
				$uibModalInstance.close($scope.text);
				break;
			default:
				$uibModalInstance.close();
				break;
		}
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
}

function PaginationCtrl($scope) {
	$scope.setPage = function (pageNo) {
		$scope.currentPage = pageNo;
		console.log(pageNo);
	};

	$scope.pageChanged = function () {
		console.log('Page changed to: ' + $scope.currentPage);
	};

	$scope.maxSize = 8;

}

function DatepickerCtrl($scope) {
	$scope.today = function () {
		$scope.dt = new Date();
		$scope.start = new Date();
		$scope.end = new Date();
	};
	$scope.today();

	$scope.clear = function () {
		$scope.dt = null;
		$scope.start = null;
		$scope.end = null;
	};

	// Disable weekend selection
	$scope.disabled = function (date, mode) {
		return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
	}

	$scope.toggleMin = function () {
		$scope.minDate = $scope.minDate ? null : new Date();
	}
	$scope.toggleMin();

	$scope.maxDate = new Date(2020, 5, 22);

	$scope.open = function ($event, type) {
		$scope.status.opened = true;
		if (type == 'start') $scope.status.start = true;
		if (type == 'end') $scope.status.end = true;
	};

	$scope.open1 = function () {
		$scope.popup1.opened = true;
	};
	$scope.open2 = function () {
		$scope.popup2.opened = true;
	};

	$scope.setDate = function (year, month, day) {
		$scope.dt = new Date(year, month, day);
	};
	$scope.popup1 = {opened: false};
	$scope.popup2 = {opened: false};

	$scope.getDayClass = function (date, mode) {
		if (mode === 'day') {
			var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

			for (var i = 0; i < $scope.events.length; i++) {
				var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

				if (dayToCheck === currentDay) {
					return $scope.events[i].status;
				}
			}
			return 'text-warning';
		}
		return '';

	};

	$scope.dateOptions = {
		formatYear: 'yy',
		startingDay: 1
	};

	/* $scope.formats = ['MM/dd/yyyy HH:mm:ss','dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	 $scope.altInputFormats = ['MM/dd/yyyy HH:mm:ss'];*/

	$scope.formats = ['MM/dd/yyyy', 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	$scope.altInputFormats = ['MM/dd/yyyy'];
	$scope.format = $scope.formats[0];

	$scope.status = {
		opened: false,
		start: false,
		end: false
	};

	var tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	var afterTomorrow = new Date();
	afterTomorrow.setDate(tomorrow.getDate() + 2);
	$scope.events =
		[
			{
				date: tomorrow,
				status: 'full'
			},
			{
				date: afterTomorrow,
				status: 'partially'
			}
		];

}

function TimepickerCtrl($scope, $log) {

	$scope.mytime = new Date();
	$scope.start_time = new Date();
	$scope.end_time = new Date();

	$scope.hstep = 1;
	$scope.mstep = 1;

	$scope.options = {
		hstep: [1, 2, 3],
		mstep: [1, 5, 10, 15, 25, 30]
	};

	$scope.ismeridian = true;
	$scope.toggleMode = function () {
		$scope.ismeridian = !$scope.ismeridian;
	};

	$scope.update = function () {
		var d = new Date();
		d.setHours(14);
		d.setMinutes(0);
		$scope.mytime = d;
	};

	$scope.changed = function () {
		//$log.log('Time changed to: ' + $scope.mytime);
	};

	$scope.clear = function () {
		$scope.mytime = null;
	};
}

function DropdownCtrl($scope, $log) {
	/* $scope.items = [
		 'The first choice!',
		 'And another choice for you.',
		 'but wait! A third!'
	 ];

	 $scope.status = {
		 isopen: false
	 };
 */
	$scope.toggled = function (open) {
		$log.log('Dropdown is now: ', open);
	};

	$scope.toggleDropdown = function ($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.status.isopen = !$scope.status.isopen;
	};

	$scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));
}

function ResetPCtrl($scope, $stateParams, UserService, LoopBackAuth, toastr, $state) {
    $scope.errors = [];
    $scope.data = {"password": "", "cfpassword": ""};
    LoopBackAuth.accessTokenId = $scope.token = $stateParams.access_token || '';
    $scope.resetP = function () {
        if (!$scope.data.password || !$scope.data.cfpassword || $scope.data.password != $scope.data.cfpassword) {
            $scope.errors.push('Passwords don\'t match');
            return;
        }

        UserService.passwordChangeByToken({"password": $scope.data.password})
            .then(function (response) {
                LoopBackAuth.accessTokenId = '';
                toastr['success']('Your password has been changed');
                $state.go('login');
            })
            .catch(function (err) {
                LoopBackAuth.accessTokenId = '';
                toastr['error']("Cannot change password");
            })
    }
}

function validExtension() {
    var validFormats = ['jpg', 'jpeg', 'png', 'tiff'];
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            ctrl.$validators.validFile = function() {
                elem.on('change', function () {
                    var value = elem.val(),
                        ext = value.substring(value.lastIndexOf('.') + 1).toLowerCase();

                    return validFormats.indexOf(ext) !== -1;
                });
            };
        }
    };
}


angular
	.module('load_theme_ctrl', [])
	.controller('ModalInstanceCtrl', ModalInstanceCtrl)
	.controller('TimepickerCtrl', TimepickerCtrl)
	.controller('UtilCtrl', UtilCtrl)
	.controller('PaginationCtrl', PaginationCtrl)
	.controller('DropdownCtrl', DropdownCtrl)
	.controller('ResetPCtrl', ResetPCtrl)
	.controller('DatepickerCtrl', DatepickerCtrl)
	.controller('validExtension', validExtension);