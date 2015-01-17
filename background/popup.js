document.addEventListener('DOMContentLoaded', function () {
  poll(data);
});

function poll(data) {
  console.log("start");
  setTimeout(function () {
    $.ajax({
      type: 'POST',
      dataType: 'json',
      data: data,
      url: 'http://localhost:3000/v1/messages/foo',
      success: function (data) {
        console.log("success");
        $('#dummy').text(JSON.stringify(data));
      },
      error: function (data) {
        console.log("error");
        $('#dummy').text(JSON.stringify(data));
      },
      complete: poll
    });
  }, 500);
};

