var domain = "http://salty-meadow-1570.herokuapp.com/";

document.addEventListener('DOMContentLoaded', function () {
  params = {hello: "hi"}
  groupsPoll(params); // pass the last updated_at

  setupGroupsList();
  setupTokenInputs();
});


function setupGroupsList(){
  $('body').on('click', '#groupslist li', function(e) {
    var group = e.target.dataset;
    var html_chatroom = ""

    if ($(".chatroom[data-id='"+group.id+"']").size() == 0) {
      html_chatroom += "<div class='chatroom' data-id='"+group.id+"'>";
      html_chatroom += "<h4>"+group.name+"<button class='closebutton'>X</button></h4>";
      html_chatroom += "<div class='messages'>";
      html_chatroom += "<ul></ul>";
      html_chatroom += "</div>";
      html_chatroom += "<textarea class='chatinput'></textarea>";
      html_chatroom += "</div>";
      $("#chatrooms").prepend(html_chatroom);

    }
    setupCloseButtons();
    setupTextAreas();

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


function setupTextAreas(){
  $(".chatinput").keyup(function (e) {
    if (e.keyCode == 13) {
      var focused = $(':focus');

      params = {
        user_id: "..",
        group_id: focused.parent().data("id"),
        text: {text: focused.val().trim()}
      }

      $.post(domain+"groups/add_message/", params, function(data){
      });

      focused.val("");
    }
  });
}


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
        var chatroom = ".chatroom[data-id='"+params.group_id+"']"
        data.forEach( function(message) {
          $(".message[data-id='"+message.id+"']").remove() // remove old
          $(chatroom+" ul").append(htmlMessage(message));
        });
        $(chatroom+" .messages").scrollTop($(chatroom+" .messages")[0].scrollHeight);
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


var selectedFriends = [];

function setupTokenInputs(){
  $("#addmembers").tokenInput("http://salty-meadow-1570.herokuapp.com/groups/friends_autocomplete?name=pranay",
                              { minChars: 3,
                                queryParam: "search_q",
                                method: "GET",
                                propertyToSearch: "name",
                                hintText: "Find your facebook friends",
                                noResultsText: "No results. Invite your friend to use this app.",
                                searchingText: "Loading ...",
                                deleteText: "x",
                                theme: "facebook",
                                resultsFormatter: function(item) {return "<li>" + item.name + "</li>"},
                                tokenFormatter: function(item) { return "<li><p>" + item.name + "</p></li>"},
                                preventDuplicates: true,
                                onAdd: function(item) {
                                  selectedFriends.push(item);
                                  console.log(selectedFriends);
                                },
                                onDelete: function(item) {
                                  selectedFriends.splice($.inArray(item, selectedFriends),1);
                                  console.log(selectedFriends);
                                }
                              });
}
