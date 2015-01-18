var domain = "https://morning-refuge-4780.herokuapp.com/";
var username = undefined;
var user_id = undefined;

document.addEventListener('DOMContentLoaded', function () {
  // get username and user_id
  chrome.storage.local.get(['username','user_id'], function(data) {
    username = data.username;
    user_id = data.user_id;
    if (username == undefined || user_id == undefined) {
      $("#login").show();
      $("#messenger").hide();
      setupLoginPage();
    } else {
      afterLoggedIn();
    }
  });
});

function afterLoggedIn(){
  $("#login").hide();
  $("#messenger").show();

  groupsPoll({user_id: user_id}); // pass the last updated_at
  setupGroupsList();
  setupTokenInputs();
}

function setupLoginPage(){
  $('#login').on('submit', function(e) {

    e.preventDefault();
    $.ajax({
      url : domain+"groups/chrome/login/?name="+$("input[name='name']").val(),
      type: "GET",
      data: $(this).serialize(),
      success: function (data) {
        chrome.storage.local.set({username: data.user_name, user_id: data.user_id}, null);
        afterLoggedIn();
      }
    });
  });
}

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
      var text = focused.val().trim();
      var json = {}
      var list = ["A","B","C"];

      // add filters
      if (text == ":list"){
        json = {list: list}
      } else if (text == ":vote") {
        json = [];
        list.forEach(function(entry) {
          json.push({name: entry, count: 0});
        });
      } else {
        json = {text: text};
      }

      if (json != undefined) {
        params = {
          user_id: user_id,
          group_id: focused.parent().data("id"),
          text: json
        }

        $.post(domain+"groups/add_message/", params, function(data){
        });
      }

      focused.val("");
    }
  });
}


function groupsPoll(params) {
  var alltimes = $('.group').map(function(){
    return $(this).data('updatedat');
  }).get();
  params.last_updated = alltimes.sort().slice(-1)[0];
  setTimeout(function () {
    $.ajax({
      type: 'POST',
      dataType: 'json',
      data: params,
      url: domain+'/groups/get_groups/',
      success: function (data) {
        data.forEach( function(group) {
          if ($("#groupslist ul").find("[data-id='" + group.group_id + "']").size() == 0) {
            $("#groupslist ul").prepend("\
                                        <li class='group' data-id='"+ group.group_id +"' data-name='"+ group.name +" 'data-updatedat='"+ group.last_updated +"'>\
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
  var chatroom = ".chatroom[data-id='"+params.group_id+"']"
  var alltimes = $(chatroom+" .message").map(function(){
    return $(this).data('updatedat');
  }).get();
  params.last_updated = alltimes.sort().slice(-1)[0];
  setTimeout(function () {
    $.ajax({
      type: 'POST',
      dataType: 'json',
      data: params,
      url: 'http://localhost:3000/v1/messages/all',
      success: function (data) {
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
  var json = message.text;
  html = "<li class='message' data-id='"+message.msg_id+"' data-updatedat='"+message.last_updated+"'>";
  if (json.text != undefined){ //  Simple Text
    html+="<p>"+json.text+"</p>";
  } else if (json.votelist != undefined){ //voting list

  }

  html += "<p class='sender'>- "+message.sender+"</p>";
  html += "</li>";
  return html;
}


var selectedFriends = [];
var friends = [];

params = {name: username}

$.post(domain+"groups/friend_autocomplete", params, function(data){
    friend = data;
});

function setupTokenInputs(){
  $("#addmembers").tokenInput(friend,
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
