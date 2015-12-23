// NAVIGATION FUNCTIONALITY

(function($) {

    $animationDuration = 1 * 1000; // seconds * (convert to milliseconds);

    $('.watch-video-button').click(function(){
        // when clicking the watch video button...

        // hide the purple overlay strip (css transition immediate, drops and fades out)
        // and fade out the foreground video (after delay, fades and z-index to background)
        $('.video-overlay-box, .autoplay-looping-video, .watch-video-button')
            .addClass('hidden')
            .delay($animationDuration)
            .queue(function(next){
                // triggers different animation delays for the reverse animation
                $(this).addClass('animation-complete');
                next();
            });

        // display the background video (after delay, visible and z-index to top)
        $('.click-to-play-target-video')
            .addClass('visible')
            .delay($animationDuration)
            .queue(function(next){
                // triggers different animation delays for the reverse animation
                $(this).addClass('animation-complete');
                next();
            });
    });

    $('.click-to-play-target-video').click(function(){
        // todo = this will change to a handler function for when the video is stopped/ends

        // hid the purple overlay strip (css transition immediate, drops and fades out)
        $('.video-overlay-box')
            .removeClass('hidden')
            .delay($animationDuration)
            .queue(function(next){
                $(this).removeClass('animation-complete');
                next();
            });

        // display the background video (after delay, visible and z-index to top)
        // fade out the foreground video (after delay, fades and z-index to background)
        $('.click-to-play-target-video, .autoplay-looping-video')
            .removeClass('animation-complete')
            .removeClass('hidden')// make the looping video show back up immediately, fades in CSS
            .delay($animationDuration)
            .queue(function(next){
                // removing both 'visible' and 'hidden' classes since one is on each video
                $(this).removeClass('visible');
                next();
            });

        // make the button fade back in after delay
        $('.watch-video-button')
            .removeClass('animation-complete')
            .delay($animationDuration)
            .queue(function(next){
                $(this).removeClass('hidden');
                next();
            });
    })

    // this will probably go in base?
    $('.blur-video-play-button').click(function(){
        // targeting the play button, which should be inside of a "will-blur-on-play-container" classed div.
        // all elements in the container that will blur should have a "will-blur-on-play" class added. CSS
        // targets all the text and image assets including backgrounds and pseudo-classes and adds a
        // transitioned blur effect to them.
        $container = $(this).parents(".will-blur-on-play-container");
        $container
            .find('.will-blur-on-play')
            .addClass('blur');

        // the blur and video visibility will be triggered based on the focus of the video container
        $blurObj = $container
            .find('.blur-video-video-container')
            .addClass('video-is-active')
            .find('.wistia_embed') // we only care about monitoring the focus on video itself
            .attr("tabindex",-1);// focus on a div requires a tabindex attribute to be set, see: http://stackoverflow.com/questions/5965924/jquery-focus-to-div-is-not-working

        $blurObj.focus(); // add focus to the video, this allows us to dismiss the video at the point when it loses browser focus!

        console.log('bob');

        // when this thing is actively blurred and the container gets a click
        // reverse the blur and dismiss the video
        $blurObj.focusout(function(){
            jQuery('.blur').removeClass('blur');
            jQuery('.video-is-active').removeClass('video-is-active');
        });
    });


})(jQuery);