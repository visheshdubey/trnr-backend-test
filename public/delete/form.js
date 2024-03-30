$('button[type="submit"]').prop('disabled', true);

// Check if any radio button is selected
$('input[type="radio"][name="deleteReason"]').change(function () {
     if ($('input[type="radio"][name="deleteReason"]:checked').length > 0) {
          $('button[type="submit"]').prop('disabled', false); // Enable button if any radio is selected

          if ($('#otherOption').is(':checked')) {
               $('#otherReasonInput').removeClass('hidden').addClass('block'); // Show 'Other' input
          }

          else {
               $('#otherReasonInput').addClass('hidden').removeClass('block'); // Hide 'Other' input
          }
     }
});

$(document).ready(function () {
     $('input[type="radio"][name="deleteReason"]').change(function () {
          if ($('#otherOption').is(':checked')) {
               $('#otherReasonInput').removeClass('hidden').addClass('block');
          }

          else {
               $('#otherReasonInput').addClass('hidden').removeClass('block');
          }
     });

     $('#deleteAccountForm').submit(function (e) {
          e.preventDefault();
          // Form submission logic here
          showSnackbar();
     });
});

function showSnackbar() {
     var x = $("#snackbar");
     x.removeClass("hidden").addClass("block");

     setTimeout(function () {
          x.addClass("hidden").removeClass("block");
     }

          , 3000);
}
