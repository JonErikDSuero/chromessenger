document.addEventListener('DOMContentLoaded', function () {
  params = {hello: "hi"}
  groupsPoll(params); // pass the last updated_at

  setupGroupsList();
});

function setupGroupsList(){
  $('body').on('click', '#groupslist li', function(e) {
    var group = e.target.dataset;

    if ($(".chatroom[data-id='"+group.id+"']").size() == 0) {
      $("#chatrooms").prepend("<div class='chatroom' data-id='"+group.id+"'><h4>"+group.name+"<button class='closebutton'>X</button></h4><ul></ul></div>");
    }
    params = {
      group_id: group.id
    }
    messagesPoll(params);
  });
};

function groupsPoll(params) {
  setTimeout(function () {
    $.ajax({
      type: 'POST',
      dataType: 'json',
      data: params,
      url: 'http://localhost:3000/v1/messages/groups',
      success: function (data) {
        data.forEach( function(group) {
          if ($("#groupslist ul").find("[data-id='" + group.id + "']").size() == 0) {
            $("#groupslist ul").prepend("\
                                        <li class='group' data-id='"+ group.id +"' data-status='new' data-name='"+ group.name +"'>\
                                        "+group.name+"\
                                        </li>\
                                        ");
          }
        });

      },
      complete: groupsPoll
    });
  }, 500);
};

function messagesPoll(params) {
  params.last_updated_at = "time" // get last updated_at
  setTimeout(function () {
    $.post({
      dataType: 'json',
      data: params,
      url: 'http://localhost:3000/v1/messages/foo',
      success: function (data) {
        console.log("success");
        $('#dummy').text(JSON.stringify(data));
      },
      complete: messagesPoll
    });
  }, 500);
};

