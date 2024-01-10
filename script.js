$(document).ready(function() {
    $('#loginForm').submit(function(event) {
      event.preventDefault();
      let username = $('#username').val();
      let password = $('#password').val();
  
      $.ajax({
        url: '/api/login',
        method: 'POST',
        data: { username: username, password: password },
        success: function(response) {
          if (response === true) {
            window.location.href = 'dashboard.html'; // Redirect to Dashboard
          } else {
            alert('Wrong Credentials');
          }
        },
        error: function() {
          alert('Error occurred while logging in');
        }
      });
    });
  });
  