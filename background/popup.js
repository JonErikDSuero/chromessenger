document.addEventListener('DOMContentLoaded', function () {
  params = {hello: "hi"}
  groupsPoll(params); // pass the last updated_at

  setupGroupsList();
});

function setupGroupsList(){
  $('body').on('click', '#groupslist li', function(e) {
    var group = e.target.dataset;

    if ($(".chatroom[data-id='"+group.id+"']").size() == 0) {
      $("#chatrooms").prepend("<div class='chatroom' data-id='"+group.id+"'><h4>"+group.name+"<button class='closebutton'>X</button></h4><div class='messages'><ul></ul></div></div>");
    }
    setupCloseButtons();

    params = {
      group_id: group.id
    }
    messagesPoll(params);
  });
};

function setupCloseButtons(){
  $('body').on('click', '.closebutton', function(e) {
    e.target.parentElement.parentElement.remove();
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
      complete: groupsPoll(params)
    });
  }, 500);
};

function messagesPoll(params) {
  setTimeout(function () {
    $.ajax({
      type: 'POST',
      dataType: 'json',
      data: params,
      url: 'http://localhost:3000/v1/messages/all',
      success: function (data) {
        data.forEach( function(message) {
          $(".message[data-id='"+message.id+"']").remove() // remove old
          $(".chatroom[data-id='"+params.group_id+"'] ul").prepend(htmlMessage(message));
        });
      },
      complete: messagesPoll(params)
    });
  }, 500);
};

function htmlMessage(message){
  var json = message.body;
  html = "<li class='message' data-id='"+message.id+"'>";
  if (json.text != undefined){ //  Simple Text
    html+="<p>"+json.text+"</p>"
  } else if (json.votelist != undefined){ //voting list

  }

  html += "<p class='sender'>- "+message.sender+"</p>";
  html += "</li>";
  return html;
}
