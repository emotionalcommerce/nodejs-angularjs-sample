/**
 * INSPINIA - Responsive Admin Theme
 *
 * Main directives.js file
 * Define directives for used plugin
 *
 *
 * Functions (directives)
 *  - sideNavigation
 *  - iboxTools
 *  - minimalizaSidebar
 *  - vectorMap
 *  - sparkline
 *  - icheck
 *  - ionRangeSlider
 *  - dropZone
 *  - responsiveVideo
 *  - chatSlimScroll
 *  - customValid
 *  - fullScroll
 *  - closeOffCanvas
 *  - clockPicker
 *  - landingScrollspy
 *  - fitHeight
 *  - iboxToolsFullScreen
 *  - slimScroll
 *  - truncate
 *  - touchSpin
 *  - markdownEditor
 *  - resizeable
 *
 */
import Hls from '../javascript/hls';

/**
 * pageTitle - Directive for set Page title - mata title
 */
function pageTitle($rootScope, $timeout) {
    return {
        link: function(scope, element) {
            var listener = function(event, toState, toParams, fromState, fromParams) {
                // Default title - load on Dashboard 1
                var title = 'License To Drift';
                // Create your own title pattern
                if (toState.data && toState.data.pageTitle) title = 'INSPINIA | ' + toState.data.pageTitle;
                $timeout(function() {
                    element.text(title);
                });
            };
            $rootScope.$on('$stateChangeStart', listener);
        }
    }
};


function uitiny() {
    uiTinymceConfig =  {};
    var generatedIds = 0;
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ngModel) {
            var expression, options, tinyInstance;
            // generate an ID if not present
            if (!attrs.id) {
                attrs.$set('id', 'uiTinymce' + generatedIds++);
            }
            options = {
                // Update model when calling setContent (such as from the source editor popup)
                setup: function (ed) {
                    ed.on('init', function (args) {
                        ngModel.$render();
                    });
                    // Update model on button click
                    ed.on('ExecCommand', function (e) {
                        ed.save();
                        ngModel.$setViewValue(elm.val());
                        if (!scope.$$phase) {
                            scope.$apply();
                        }
                    });
                    // Update model on keypress
                    ed.on('KeyUp', function (e) {
                        console.log(ed.isDirty());
                        ed.save();
                        ngModel.$setViewValue(elm.val());
                        if (!scope.$$phase) {
                            scope.$apply();
                        }
                    });
                },
                mode: 'exact',
                elements: attrs.id
            };
            if (attrs.uiTinymce) {
                expression = scope.$eval(attrs.uiTinymce);
            } else {
                expression = {};
            }
            angular.extend(options, uiTinymceConfig, expression);
            setTimeout(function () {
                tinymce.init(options);
            });


            ngModel.$render = function () {
                if (!tinyInstance) {
                    tinyInstance = tinymce.get(attrs.id);
                }
                if (tinyInstance) {
                    tinyInstance.setContent(ngModel.$viewValue || '');
                }
            };
        }
    };
}
/**
 * tinymce - Directive for run tinymce on sidebar navigation-
 */
function tinyMce($timeout,$rootScope) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            $timeout(function(){
            $rootScope.tinymce=tinymce;
                tinymce.editors = [];
                tinymce.baseURL='javascript/tinymce/';
                tinymce.init({
                    selector: 'textarea.tiny',
                    height:400,
                    plugins: [
                        "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak spellchecker",
                        "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
                        "table contextmenu directionality emoticons template textcolor paste textcolor colorpicker textpattern "
                    ],

                    toolbar1: "newdocument  | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect",
                    toolbar2: "cut copy paste | searchreplace | bullist numlist | outdent indent blockquote | undo redo | link unlink anchor image media code | insertdatetime preview | forecolor backcolor",
                    toolbar3: "table | hr removeformat | subscript superscript | charmap emoticons | print fullscreen | ltr rtl | spellchecker | visualchars visualblocks nonbreaking template pagebreak restoredraft",
                    menubar: false,
                    toolbar_items_size: 'small',
                    relative_urls: true,
                    setup: function (editor) {
                        editor.on('init', function () {
                            $rootScope.$broadcast('tiny-started');
                        });

                    }
                 });
            });
        }
    };
};

/**
 * sideNavigation - Directive for run metsiMenu on sidebar navigation
 */
function sideNavigation($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            // Call the metsiMenu plugin and plug it to sidebar navigation
            $timeout(function(){
                element.metisMenu();
            });
        }
    };
};

/**
 * responsibleVideo - Directive for responsive video
 */
function responsiveVideo() {
    return {
        restrict: 'A',
        link:  function(scope, element) {
            var figure = element;
            var video = element.children();
            video
                .attr('data-aspectRatio', video.height() / video.width())
                .removeAttr('height')
                .removeAttr('width')

            //We can use $watch on $window.innerWidth also.
            $(window).resize(function() {
                var newWidth = figure.width();
                video
                    .width(newWidth)
                    .height(newWidth * video.attr('data-aspectRatio'));
            }).resize();
        }
    }
}

/**
 * iboxTools - Directive for iBox tools elements in right corner of ibox
 */
function iboxTools($timeout) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox_tools.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.find('div.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            };
            // Function for close ibox
            $scope.closebox = function () {
                var ibox = $element.closest('div.ibox');
                ibox.remove();
            }
        }
    };
}

/**
 * iboxTools with full screen - Directive for iBox tools elements in right corner of ibox with full screen option
 */
function iboxToolsFullScreen($timeout) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox_tools_full_screen.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.find('div.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            };
            // Function for close ibox
            $scope.closebox = function () {
                var ibox = $element.closest('div.ibox');
                ibox.remove();
            };
            // Function for full screen
            $scope.fullscreen = function () {
                var ibox = $element.closest('div.ibox');
                var button = $element.find('i.fa-expand');
                $('body').toggleClass('fullscreen-ibox-mode');
                button.toggleClass('fa-expand').toggleClass('fa-compress');
                ibox.toggleClass('fullscreen');
                setTimeout(function() {
                    $(window).trigger('resize');
                }, 100);
            }
        }
    };
}

/**
 * minimalizaSidebar - Directive for minimalize sidebar
 */
function minimalizaSidebar($timeout) {
    return {
        restrict: 'A',
        template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
        controller: function ($scope, $element) {
            $scope.minimalize = function () {
                $("body").toggleClass("mini-navbar");
                if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
                    // Hide menu in order to smoothly turn on when maximize menu
                    $('#side-menu').hide();
                    // For smoothly turn on menu
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(400);
                        }, 200);
                } else if ($('body').hasClass('fixed-sidebar')){
                    $('#side-menu').hide();
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(400);
                        }, 100);
                } else {
                    // Remove all inline style from jquery fadeIn function to reset menu state
                    $('#side-menu').removeAttr('style');
                }
            }
        }
    };
};


function closeOffCanvas() {
    return {
        restrict: 'A',
        template: '<a class="close-canvas-menu" ng-click="closeOffCanvas()"><i class="fa fa-times"></i></a>',
        controller: function ($scope, $element) {
            $scope.closeOffCanvas = function () {
                $("body").toggleClass("mini-navbar");
            }
        }
    };
}

/**
 * vectorMap - Directive for Vector map plugin
 */
function vectorMap() {
    return {
        restrict: 'A',
        scope: {
            myMapData: '=',
        },
        link: function (scope, element, attrs) {
            var map = element.vectorMap({
                map: 'world_mill_en',
                backgroundColor: "transparent",
                regionStyle: {
                    initial: {
                        fill: '#e4e4e4',
                        "fill-opacity": 0.9,
                        stroke: 'none',
                        "stroke-width": 0,
                        "stroke-opacity": 0
                    }
                },
                series: {
                    regions: [
                        {
                            values: scope.myMapData,
                            scale: ["#1ab394", "#22d6b1"],
                            normalizeFunction: 'polynomial'
                        }
                    ]
                },
            });
            var destroyMap = function(){
                element.remove();
            };
            scope.$on('$destroy', function() {
                destroyMap();
            });
        }
    }
}


/**
 * sparkline - Directive for Sparkline chart
 */
function sparkline() {
    return {
        restrict: 'A',
        scope: {
            sparkData: '=',
            sparkOptions: '=',
        },
        link: function (scope, element, attrs) {
            scope.$watch(scope.sparkData, function () {
                render();
            });
            scope.$watch(scope.sparkOptions, function(){
                render();
            });
            var render = function () {
                $(element).sparkline(scope.sparkData, scope.sparkOptions);
            };
        }
    }
};

/**
 * icheck - Directive for custom checkbox icheck
 */
function icheck($timeout) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function($scope, element, $attrs, ngModel) {
            return $timeout(function() {
                var value;
                value = $attrs['value'];

                $scope.$watch($attrs['ngModel'], function(newValue){
                    $(element).iCheck('update');
                })

                return $(element).iCheck({
                    checkboxClass: 'icheckbox_square-green',
                    radioClass: 'iradio_square-green'

                }).on('ifChanged', function(event) {
                    if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
                        $scope.$apply(function() {
                            return ngModel.$setViewValue(event.target.checked);
                        });
                    }
                    if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
                        return $scope.$apply(function() {
                            return ngModel.$setViewValue(value);
                        });
                    }
                });
            });
        }
    };
}

/**
 * ionRangeSlider - Directive for Ion Range Slider
 */
function ionRangeSlider() {
    return {
        restrict: 'A',
        scope: {
            rangeOptions: '='
        },
        link: function (scope, elem, attrs) {
            elem.ionRangeSlider(scope.rangeOptions);
        }
    }
}

/**
 * dropZone - Directive for Drag and drop zone file upload plugin
 */
function dropZone() {
    return {
        restrict: 'C',
        link: function(scope, element, attrs) {

            var config = {
                url: 'http://localhost:8080/upload',
                maxFilesize: 100,
                paramName: "uploadfile",
                maxThumbnailFilesize: 10,
                parallelUploads: 1,
                autoProcessQueue: false
            };

            var eventHandlers = {
                'addedfile': function(file) {
                    scope.file = file;
                    if (this.files[1]!=null) {
                        this.removeFile(this.files[0]);
                    }
                    scope.$apply(function() {
                        scope.fileAdded = true;
                    });
                },

                'success': function (file, response) {
                }

            };

            dropzone = new Dropzone(element[0], config);

            angular.forEach(eventHandlers, function(handler, event) {
                dropzone.on(event, handler);
            });

            scope.processDropzone = function() {
                dropzone.processQueue();
            };

            scope.resetDropzone = function() {
                dropzone.removeAllFiles();
            }
        }
    }
}

/**
 * chatSlimScroll - Directive for slim scroll for small chat
 */
function chatSlimScroll($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            $timeout(function(){
                element.slimscroll({
                    height: '234px',
                    railOpacity: 0.4
                });

            });
        }
    };
}

/**
 * customValid - Directive for custom validation example
 */
function customValid(){
    return {
        require: 'ngModel',
        link: function(scope, ele, attrs, c) {
            scope.$watch(attrs.ngModel, function() {

                // You can call a $http method here
                // Or create custom validation

                var validText = "Inspinia";

                if(scope.extras == validText) {
                    c.$setValidity('cvalid', true);
                } else {
                    c.$setValidity('cvalid', false);
                }

            });
        }
    }
}

function fileUpload($parse,$rootScope){
    return {
        scope: false,        //create a new scope
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
               // var f = element[0].files[0];
                var selectedFile = event.target.files[0];

                $parse(attrs.ngModel).assign(scope,selectedFile);
                var reader = new FileReader();

                var imgtag = document.getElementById("logo");
                imgtag.title = selectedFile.name;

                reader.onload = function(event) {
                    imgtag.src = event.target.result;

                    $("#editAdobeCreative").trigger('click');
                };

                reader.readAsDataURL(selectedFile);
                $rootScope.upload=true;

                scope.$apply();
            });
        }
    };
}

function avatarUpload($parse,$rootScope){
    return {
        scope: false,        //create a new scope
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                // var f = element[0].files[0];
                var selectedFile = event.target.files[0];

                $parse(attrs.ngModel).assign(scope,selectedFile);
                var reader = new FileReader();

                /*reader.onload = function(event) {
                    $('#dog-image').css('background-image','url(' + event.target.result + ')');
                };*/

                reader.readAsDataURL(selectedFile);
                $rootScope.changeAvatar += 1;

                scope.$apply();
            });
        }
    };
}
/**
 * fullScroll - Directive for slimScroll with 100%
 */
function fullScroll($timeout){
    return {
        restrict: 'A',
        link: function(scope, element) {
            $timeout(function(){
                element.slimscroll({
                    height: '100%',
                    railOpacity: 0.9
                });

            });
        }
    };
}

/**
 * slimScroll - Directive for slimScroll with custom height
 */
function slimScroll($timeout){
    return {
        restrict: 'A',
        scope: {
            boxHeight: '@'
        },
        link: function(scope, element) {
            $timeout(function(){
                element.slimscroll({
                    height: scope.boxHeight,
                    railOpacity: 0.9
                });

            });
        }
    };
}

/**
 * clockPicker - Directive for clock picker plugin
 */
function clockPicker() {
    return {
        restrict: 'A',
        link: function(scope, element) {
            element.clockpicker();
        }
    };
};


/**
 * landingScrollspy - Directive for scrollspy in landing page
 */
function landingScrollspy(){
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.scrollspy({
                target: '.navbar-fixed-top',
                offset: 80
            });
        }
    }
}

/**
 * fitHeight - Directive for set height fit to window height
 */
function fitHeight(){
    return {
        restrict: 'A',
        link: function(scope, element) {
            element.css("height", $(window).height() + "px");
            element.css("min-height", $(window).height() + "px");
        }
    };
}

/**
 * truncate - Directive for truncate string
 */
function truncate($timeout){
    return {
        restrict: 'A',
        scope: {
            truncateOptions: '='
        },
        link: function(scope, element) {
            $timeout(function(){
                element.dotdotdot(scope.truncateOptions);

            });
        }
    };
}


/**
 * touchSpin - Directive for Bootstrap TouchSpin
 */
function touchSpin() {
    return {
        restrict: 'A',
        scope: {
            spinOptions: '='
        },
        link: function (scope, element, attrs) {
            scope.$watch(scope.spinOptions, function(){
                render();
            });
            var render = function () {
                $(element).TouchSpin(scope.spinOptions);
            };
        }
    }
};

/**
 * markdownEditor - Directive for Bootstrap Markdown
 */
function markdownEditor() {
    return {
        restrict: "A",
        require:  'ngModel',
        link:     function (scope, element, attrs, ngModel) {
            $(element).markdown({
                savable:false,
                onChange: function(e){
                    ngModel.$setViewValue(e.getContent());
                }
            });
        }
    }
};

/**
 * iboxTools - Directive for iBox tools elements in right corner of ibox
 */
function iboxToolsA($timeout) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'components/base/common/ibox_toolsa.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox

            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.find('div.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            },
                // Function for close ibox
                $scope.closebox = function () {
                    var ibox = $element.closest('div.ibox');
                    ibox.remove();
                }
        }
    };
}




function uploadFile($rootScope,toastr) {
    return {
        restrict: 'A',
        scope: true,
        link: function (scope, element, attr) {
            element.bind('change', function () {
                var f = element[0].files[0],
                    r = new FileReader();
                r.onloadend = function(e){
                    var data = e.target.result;
                    $rootScope.fileBin=data;
                    $rootScope.fileB64=btoa(data);
                    if(typeof attr.logo!='undefined') {
                        var img = new Image();
                        img.src="data:image/jpeg;base64,"+$rootScope.fileB64;
                       var w=img.width;
                       var h=img.height;
                       if(w!=400 || h!=400){
                           toastr['error']('Logo should be 400X400!');
                           $rootScope.fileBin='';
                           $rootScope.fileB64='';
                           element.val('');
                       } else $rootScope.$apply();
                   }else       $rootScope.$apply();
                    //send you binary data via $http or $resource or do anything else with it
                }
                r.readAsBinaryString(f);

            });

        }
    }
}

function uploadCrop($rootScope,toastr) {
    return {
        restrict: 'A',
        scope: true,
        link: function (scope, element, attr) {
            element.bind('change', function () {
                var file=element[0].files[0];
                var reader = new FileReader();
                reader.onloadend = function (e) {
                    $rootScope.isUpload=true;
                    $rootScope.imageData=e.target.result;
                    $rootScope.$apply();
                };
                reader.readAsDataURL(file);
            });

        }
    }
}

function  hcChart() {
    return {
        restrict: 'E',
        template: '',
        scope: {
            options: '='
        },
        link: function (scope, element) {
            Highcharts.chart(element[0],scope.options);
        }
    }
}


function flexslider($timeout,$rootScope) {
	return {
		restrict: 'A',
		link: function(scope, element) {
			$timeout(function(){
			    var ww=$(window).width();
			    var count=4;
			    if(ww<700){
			        count=3;
                }
				if(ww<700){
					count=2;
				}
			    var w=$('.flexslider').width();

				$('.flexslider').flexslider({
					animation: "slide",
					animationLoop: false,
					itemWidth: w/count,
					itemMargin: 5,
					directionNav:true,
					controlNav:false,
					minItems: count, // use function to pull in initial value
					maxItems: 4 // use function to pull in initial value
				});
			});
		}
	};
};




function uploadSave($parse,$rootScope){
    return {
        scope: false,        //create a new scope
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                //var selectedFile = event.target.files[0];
                var selectedFile = el[0].files[0];
                $parse(attrs.ngModel).assign(scope,selectedFile);
                $rootScope.$broadcast("uploadImage");
                scope.$apply();
            });
        }
    };
}
function firstChar(){
    return {
        restrict: 'A', // only activate on element attribute
        require: '?ngModel',
        link: function (scope, element, attrs,ngModel) {
            ngModel.$render = function() {
                element.val(ngModel.$viewValue);
            };

            // Listen for change events to enable binding
            element.on('blur keyup change', function() {
                scope.$evalAsync(read);
            });
            read(); // initialize

            // Write data to the model
            function read() {
                var selectedVal = element.val();
                if(selectedVal && selectedVal[0]!='1') {
                    selectedVal='1'+selectedVal;
                    ngModel.$setViewValue(selectedVal);
                }
            }
        }
    };
}

function validNumber() {
    return {
        require: '?ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {
            if(!ngModelCtrl) {
                return;
            }

            ngModelCtrl.$parsers.push(function(val) {
                if (angular.isUndefined(val)) {
                    var val = '';
                }

                var clean = val.replace(/[^-0-9\.]/g, '');
                var negativeCheck = clean.split('-');
                var decimalCheck = clean.split('.');
                if(!angular.isUndefined(negativeCheck[1])) {
                    negativeCheck[1] = negativeCheck[1].slice(0, negativeCheck[1].length);
                    clean =negativeCheck[0] + '-' + negativeCheck[1];
                    if(negativeCheck[0].length > 0) {
                        clean =negativeCheck[0];
                    }

                }

                if(!angular.isUndefined(decimalCheck[1])) {
                    decimalCheck[1] = decimalCheck[1].slice(0,2);
                    clean =decimalCheck[0] + '.' + decimalCheck[1];
                }

                if (val !== clean) {
                    ngModelCtrl.$setViewValue(clean);
                    ngModelCtrl.$render();
                }
                return clean;
            });

            element.bind('keypress', function(event) {
                if(event.keyCode === 32) {
                    event.preventDefault();
                }
            });
        }
    };
}


function minHeightContent($timeout){
	return {
		restrict: 'A',
		link: function(scope, element) {
			$timeout(function(){
				var hW=$(window).height();
				var hH=$('#header').height();
				var hF=$('#for-footer').height();
				element.css("min-height", hW-hH-hF-40 + "px");
            });

		}
	};
}

function windowHeight($timeout){
    return {
        restrict: 'A',
        link: function($scope, element) {
            $timeout(function(){
                angular.element(window).bind('resize', function(){
                    $scope.width = $(window).innerHeight();
                    if($scope.width < 150) element.css("height", 320 + "vh");
                    else if($scope.width < 350) element.css("height", 210 + "vH");
                    else element.css("height", '');
                });
            });

        }
    };
}

function infiniteScroll($rootScope, $window, $timeout) {
	return {
		link: function(scope, elem, attrs) {
			var checkWhenEnabled, handler, scrollDistance, scrollEnabled;
			$window = angular.element($window);
			scrollDistance = 0;
			if (attrs.infiniteScrollDistance != null) {
				scope.$watch(attrs.infiniteScrollDistance, function(value) {
					return scrollDistance = parseInt(value, 10);
				});
			}
			scrollEnabled = true;
			checkWhenEnabled = false;
			if (attrs.infiniteScrollDisabled != null) {
				scope.$watch(attrs.infiniteScrollDisabled, function(value) {
					scrollEnabled = !value;
					if (scrollEnabled && checkWhenEnabled) {
						checkWhenEnabled = false;
						return handler();
					}
				});
			}
			handler = function() {

				var elementBottom, remaining, shouldScroll, windowBottom;
				windowBottom = $window.height() + $window.scrollTop();
				elementBottom = elem.offset().top + elem.height();
				remaining = elementBottom - windowBottom;

				shouldScroll = remaining <= $window.height() * scrollDistance/100;
				if (shouldScroll && scrollEnabled) {
					if ($rootScope.$$phase) {
						return scope.$eval(attrs.infiniteScroll);
					} else {
						return scope.$apply(attrs.infiniteScroll);
					}
				} else if (shouldScroll) {
					return checkWhenEnabled = true;
				}
			};
			$window.on('scroll', handler);
			scope.$on('$destroy', function() {
				return $window.off('scroll', handler);
			});
			return $timeout((function() {
				if (attrs.infiniteScrollImmediateCheck) {
					if (scope.$eval(attrs.infiniteScrollImmediateCheck)) {
						return handler();
					}
				} else {
					return handler();
				}
			}), 0);
		}
	};
}

function owlCarousel($timeout){
        return {
            restrict: 'A',
            link: function(scope, element) {
                $timeout(function(){
                    $('.owl-carousel').owlCarousel({
                        loop: true,
                        margin: 20,
                        responsiveClass: true,
                        nav: true,
                        navText: ["<img class='owlArrowLeft' src='../../style/img/arrow_left.png'>","<img class='owlArrowRight' src='../../style/img/arrow_right.png'>"],
                        responsive: {
                            0: {
                                items: 1,
                                nav: true
                            },
                            600: {
                                items: 1,
                                nav: true
                            },
                            768: {
                                items: 1,
                                nav: false,
                                loop: true
                            },
                            900: {
                                items: 1,
                                nav: true,
                                loop: true
                            },
                            1200: {
                                items: 1,
                                nav: true,
                                loop: true
                            }
                        }
                    })
                });
            }
        };
    };


function dtimepicker($timeout){
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function(scope, element,attrs,ngModel) {
            $timeout(function(){
                var temp=$(element).timepicker();
                temp.model=ngModel;
                temp.type=attrs.ngType;
            });
        }
    };
};


function hlsVideo($timeout,$rootScope) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            $timeout(function () {
                var model=ngModel.$modelValue;

                var video = $(element)[0];
                $rootScope.mediaPlayer=$(element)[0];
                video.addEventListener('pause', function(){
                    $rootScope.$apply();
                }, false);
                video.addEventListener('play', function(){
                    $rootScope.$apply();
                }, false);
                video.addEventListener('load', function(){
                    $rootScope.$apply();
                }, false);

                if(model.thumbURL) video.poster=model.thumbURL;
                //if hls url exists
                if(model.hlsURL){
                    if(Hls.isSupported()) {
                        var hls = new Hls();
                        hls.loadSource(model.hlsURL);

                        hls.attachMedia(video);
                        hls.on(Hls.Events.MANIFEST_PARSED,function() {
                            //video.play();
                        });
                    }
                    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                        video.src = model.hlsURL ;

                        video.addEventListener('canplay',function() {
                            //video.play();
                        });
                    } else  {
                        video.src = model.videoURL ;

                        video.addEventListener('canplay',function() {
                            //video.play();
                        });
                    }
                } else  {
                    //before transcoder
                    video.src = model.videoURL ;


                    video.addEventListener('canplay',function() {
                        //video.play();
                    });
                }

            });
        }
    };
}



/**
 *
 * Pass all functions into module
 */
angular
    .module('load_theme_directive',[])
    .directive('pageTitle', pageTitle)
    .directive('minHeightContent', minHeightContent)
    .directive('windowHeight', windowHeight)
    .directive('sideNavigation', sideNavigation)
    .directive('iboxTools', iboxTools)
    .directive('iboxToolsA', iboxToolsA)
    .directive('minimalizaSidebar', minimalizaSidebar)
    .directive('vectorMap', vectorMap)
    .directive('infiniteScroll', infiniteScroll)
    .directive('sparkline', sparkline)
    .directive('icheck', icheck)
    .directive('ionRangeSlider', ionRangeSlider)
    .directive('dropZone', dropZone)
    .directive('responsiveVideo', responsiveVideo)
    .directive('chatSlimScroll', chatSlimScroll)
    .directive('customValid', customValid)
    .directive('fullScroll', fullScroll)
    .directive('closeOffCanvas', closeOffCanvas)
    .directive('clockPicker', clockPicker)
    .directive('landingScrollspy', landingScrollspy)
    .directive('fitHeight', fitHeight)
    .directive('iboxToolsFullScreen', iboxToolsFullScreen)
    .directive('slimScroll', slimScroll)
	.directive('fileUpload', fileUpload)
	.directive('uploadSave', uploadSave)
    .directive('firstChar', firstChar)
    .directive('truncate', truncate)
    .directive('touchSpin', touchSpin)
    .directive('uploadFile', uploadFile)
    .directive('uploadCrop', uploadCrop)
    .directive('validNumber', validNumber)
    .directive('hcChart', hcChart)
    .directive('tinyMce', tinyMce)
    .directive('uitiny', uitiny)
    .directive('flexslider', flexslider)
    .directive('avatarUpload', avatarUpload)
    .directive('owlCarousel', owlCarousel)
    .directive('dtimepicker', dtimepicker)
    .directive('markdownEditor', markdownEditor)
    .directive('hlsVideo', hlsVideo);


