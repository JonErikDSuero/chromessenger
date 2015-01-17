document.addEventListener('DOMContentLoaded', function () {
  params = {hello: "hi"}
  groupsPoll(params); // pass the last updated_at


  $('body').on('click', '#groupslist li', function() {
    params = {
      group_id: $(this).data('id'),
    }
    messagesPoll(params);

    $.post('/v1/video_sessions/graph_points', params, function(data){
      for (var wave_type in data){
        updateLineChart(data[wave_type], wave_type)
      }
      $('#waves_graphs').show()
    });
  });

});

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
                                    <li class='group' data-id='"+ group.id +"' data-status='new'>\
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

