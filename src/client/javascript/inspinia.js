/**
 * INSPINIA - Responsive Admin Theme
 * 2.5
 *
 * Custom scripts
 */

$(document).ready(function () {



    // Full height of sidebar
	$(document).delegate('#shadow','click',function(event) {
	    var isVisible=$(this).css('display');
	    if(isVisible=='block'){
			var elements=$(".new-comment:visible");
			if(elements.length) {
				var temp=elements[0];
				var postId=$(temp).data('rel');
				$(temp).hide();
				$('#shadow').hide();
				// share box activity
				var share = $('#new-share-' + postId);
				share.removeClass('share-from-comment');
				share.hide();
			}
        }
	});
	$(document).delegate('#wrapper','click',function(event) {
		if ($('#dog-icon').hasClass("active")) {
			$('#show-dogs-result').hide();
			$('#dog-icon').removeClass("active");
		}
		if ($('#notifications').hasClass("active")) {
			$('#notification-result').hide();
			$('#notifications').removeClass("active");
		}
		event.stopPropagation();
	});


    function fix_height() {
        /*var heightWithoutNavbar = $("body > #wrapper").height() - 61;
        $(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");

        var navbarHeigh = $('nav.navbar-default').height();
        var wrapperHeigh = $('#page-wrapper').height();

        if(navbarHeigh > wrapperHeigh){
            $('#page-wrapper').css("min-height", navbarHeigh + "px");
        }

        if(navbarHeigh < wrapperHeigh){
            $('#page-wrapper').css("min-height", $(window).height()  + "px");
        }

        if ($('body').hasClass('fixed-nav')) {
            if (navbarHeigh > wrapperHeigh) {
                $('#page-wrapper').css("min-height", navbarHeigh - 60 + "px");
            } else {
                $('#page-wrapper').css("min-height", $(window).height() - 60 + "px");
            }
        }*/


    }


    $(window).bind("load resize scroll", function() {
        if(!$("body").hasClass('body-small')) {
            //    fix_height();
        }
    })

    // Move right sidebar top after scroll
    $(window).scroll(function(){
        if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav') ) {
            $('#right-sidebar').addClass('sidebar-top');
        } else {
            $('#right-sidebar').removeClass('sidebar-top');
        }
    });

    setTimeout(function(){
      //  fix_height();
     });



});

// Minimalize menu when screen is less than 768px
$(function() {
    $(window).bind("load resize", function() {
         if ($(document).width() < 961) {
            $('body').addClass('body-small');
        } else {
            $('body').removeClass('body-small');
        }
    })
})
