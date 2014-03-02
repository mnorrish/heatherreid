$(function(){

  var validityTests = {
    name: function(value) {
      var isValid = value.length > 0;
      $('#cName').siblings('.error').toggleClass('hidden', isValid);
      return isValid;
    },
    phone: function(value) {
      var isValid = value.length > 0;
      $('#cPhone').siblings('.error').toggleClass('hidden', isValid);
      return isValid;

    },
    email: function(value) {
      var isValid = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value);
      $('#cEmail').siblings('.error').toggleClass('hidden', isValid);
      return isValid;
    },
    message: function(value) {
      var isValid = value.length > 0;
      $('#cMessage').siblings('.error').toggleClass('hidden', isValid);
      return isValid;
    }
  };

  var isValidFormData  = function(data) {
    var isValid = true;
    $.each(data, function(index, item) {
      isValid = isValid && validityTests[item.name](item.value);
    });

    return isValid;
  };

  $('#contactForm').on('submit', function(e) {
    e.preventDefault();

    var formData = $(this).serializeArray();
    console.log(formData);

    if (isValidFormData(formData)) {
      $('input, textarea, button', '#contactForm').prop('disabled', true);

      $.ajax({
        url: '/test',
        type: 'POST',
        data: formData,
        success: function() {
          console.log('success');
        },
        error: function() {
          console.log('error');
        },
        complete: function() {
          $('input, textarea, button', '#contactForm').prop('disabled', false);
        }
      });
    }

  });

});
