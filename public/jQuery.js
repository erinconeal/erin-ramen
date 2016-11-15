$(document).ready(function() {
  $(function() {
      // Select link by id and add click event
      $('#anchor').click(function() {

        $('html,body').animate({
          scrollTop: $("#anchor").offset().top }, // Tell it to scroll to the top
          2000 // How long scroll will take in milliseconds
        );
        // Prevent default behavior of link
        return false;
      });
    });
});
