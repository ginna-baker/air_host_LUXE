/*
    The function below is used to:
    1. enable smooth scrolling
    2. in the collapsed mode: close the main menu when an item is clicked
*/
$(".scroll").click(function(event){
	event.preventDefault();
	$("html,body").animate({scrollTop:$(this.hash).offset().top}, 500);
    if ($('.navbar-collapse').hasClass('in')){
        $('.navbar-collapse').removeClass('in').addClass('collapse');
    }
});

/*
    The function below is used to:
    1. validate the contact form
    2. submit the contact form
    3. display the result from submitting the form
*/
$('#submit-contact-form').click( function() {
    var error = false;

    var name = $('#name').val();
    if(name == "" || name == " ") {
        $('#name').css('background-color', '#f2dede');
        $('#name').parent().addClass('has-error');
        error = true;
    } else {
        $('#name').css('background-color', '#fff');
        $('#name').parent().removeClass('has-error');
    }

    var checkEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var email = $('#email').val();
    if (email == "" || email == " ") {
        $('#email').css('background-color', '#f2dede');
        $('#email').parent().addClass('has-error');
        error = true;
    } else if (!checkEmail.test(email)) {
        $('#email').css('background-color', '#f2dede');
        $('#email').parent().addClass('has-error');
        error = true;
    } else {
        $('#email').css('background-color', '#fff');
        $('#email').parent().removeClass('has-error');
    }

    var message = $('#message').val();
    if(message == "" || message == " ") {
        $('#message').css('background-color', '#f2dede');
        $('#message').parent().addClass('has-error');
        error = true;
    } else {
        $('#message').css('background-color', '#fff');
        $('#message').parent().removeClass('has-error');
    }

    var data_string = $('#share-form').serialize();

    if (error == false) {
        $.ajax({
            type: "POST",
            url: "send_message.php",
            data: data_string,
            timeout: 6000,
            error: function(request,error) {
                if (error == "timeout") {
                    $('#share-error').slideDown('slow');
                    $('#share-error span').text('Timed out when contacting server.');
                    setTimeout(function() {
                        $('#share-error').slideUp('slow');
                    }, 10000);
                }
                else {
                    $('#share-error').slideDown('slow');
                    $('#share-error span').text('Something is not working. Please try again.');
                    setTimeout(function() {
                        $('#share-error').slideUp('slow');
                    }, 10000);
                }
            },
            success: function() {
                $('#share-success').slideDown('slow');
                $('#share-success span').text('Message sent.');
                setTimeout(function() {
                    $('#share-success').slideUp('slow');
                }, 10000);
                $('#name').val('');
                $('#email').val('');
                $('#message').val('');
            }
        });
    } else {
        $('#share-error').hide();
        $('#share-success').hide();
    }
});

$(document).ready(function() {
    /*
        The function below is used to:
        1. start the gallery in the work section
    */
    $('.popup-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
				return item.el.attr('title') + '<small></small>';
			}
		}
	});

    //.parallax(xPosition, speedFactor, outerHeight) options:
	//xPosition - Horizontal position of the element
	//inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
	//outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport
	// parallax background on windows larger than 720px
	if($(window).width() > 720) {
	    $('#header').parallax("50%", 0.1);
	    $('#your_stay').parallax("50%", 0.2);
	    $('#where_to_eat').parallax("50%", 0.1);
	}

	 // When the window has finished loading create our google map below
	google.maps.event.addDomListener(window, 'load', init);

	function init() {
		// The latitude and longitude to center the map (always required)
		var myLocation = new google.maps.LatLng(40.6700, -73.9400); // New York

		// Basic options for a simple Google Map
		// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
		var mapOptions = {
			// How zoomed in you want the map to start at (always required)
			zoom: 11,

			center: myLocation,

			// How you would like to style the map.
			// This is where you would paste any style found on Snazzy Maps.
			styles: [	{
							featureType:'water',
							stylers:[{color:'#118dff'},{visibility:'on'}]
						},
						{
							featureType:'landscape',
							stylers:[{color:'#f2f2f2'}]
						},
						{
							featureType:'road',
							stylers:[{saturation:-100},{lightness:45}]
						},
						{
							featureType:'road.highway',
							stylers:[{visibility:'simplified'}]
						},
						{
							featureType:'road.arterial',
							elementType:'labels.icon',
							stylers:[{visibility:'off'}]
						},
						{
							featureType:'administrative',
							elementType:'labels.text.fill',
							stylers:[{color:'#444444'}]
						},
						{
							featureType:'transit',
							stylers:[{visibility:'off'}]
						},
						{
							featureType:'poi',
							stylers:[{visibility:'off'}]
						}
					]
		};

		// Get the HTML DOM element that will contain your map
		// We are using a div with id="map" seen below in the <body>
		var mapElement = document.getElementById('map');

		// Create the Google Map using out element and options defined above
		var map = new google.maps.Map(mapElement, mapOptions);

		var marker = new google.maps.Marker({
			position: myLocation,
			map: map,
			title: 'We are here!'
		});
	}
});
