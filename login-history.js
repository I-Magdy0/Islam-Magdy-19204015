$(document).ready(function() {
    // Function to fetch and populate login history
    function populateLoginHistory() {
      $.ajax({
        url: '/api/getloginhistory', // Replace with your endpoint to fetch login history
        method: 'GET',
        success: function(response) {
          // Assuming response is an array of login history objects
          let tableContent = '';
          response.forEach(login => {
            tableContent += `<tr>
                              <td>${login.username}</td>
                              <td>${login.loginDate}</td>
                            </tr>`;
          });
          $('#loginHistoryTableBody').html(tableContent);
        },
        error: function() {
          alert('Error occurred while fetching login history');
        }
      });
    }
  
    // Initial population of login history table on page load
    populateLoginHistory();
  });
  
  $(document).ready(function() {
    $('#signoutBtn').on('click', function() {
      $.ajax({
        url: '/api/logout',
        method: 'POST',
        success: function(response) {
          if (response === true) {
            window.location.href = 'index.html'; // Redirect to index on successful logout
          } else {
            alert('Logout error');
          }
        },
        error: function() {
          alert('Error occurred while logging out');
        }
      });
    });
  });
    