$(document).ready(function() {
  // Add User Form Submission
  $('#addUserForm').submit(function(event) {
    event.preventDefault();
    let username = $('#username').val();
    let password = $('#password').val();
    let departmentId = $('#departmentId').val();

    $.ajax({
      url: '/api/adduser',
      method: 'POST',
      data: {
        username: username,
        password: password,
        departmentId: departmentId
      },
      success: function(response) {
        if (response === true) {
          // Update table of users (you need a function to update the table)
          updateUserTable();
        } else {
          alert('Error happened. Please try again later');
        }
      },
      error: function() {
        alert('Error occurred while adding user');
      }
    });
  });

  // Function to update the user table
  function updateUserTable() {
    
  }

  updateUserTable();
});
// ... previous code remains unchanged ...

// Function to update the user table
function updateUserTable() {
  // Perform AJAX request to fetch updated user data and populate the table
  // Example:
  $.ajax({
    url: '/api/getusers', // Replace with your endpoint to fetch user data
    method: 'GET',
    success: function(response) {
      // Assuming response is an array of user objects
      let tableContent = '';
      response.forEach(user => {
        tableContent += `<tr>
                          <td>${user.username}</td>
                          <td>${user.password}</td>
                          <td>${user.department}</td>
                          <td><button class="btn btn-danger delete-user-btn" data-userid="${user.id}">Delete</button></td>
                        </tr>`;
      });
      $('#userTableBody').html(tableContent);

      // Set up event listener for delete user button
      $('.delete-user-btn').click(function() {
        let userId = $(this).data('userid');

        $.ajax({
          url: '/api/deleteuser',
          method: 'POST',
          data: { userId: userId },
          success: function(response) {
            if (response === true) {
              // If deletion is successful, update the user table
              updateUserTable();
            } else {
              alert('Error happened. Please try again later');
            }
          },
          error: function() {
            alert('Error occurred while deleting user');
          }
        });
      });
    },
    error: function() {
      alert('Error occurred while fetching users');
    }
  });
}

// Initial population of user table on page load
updateUserTable();

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

