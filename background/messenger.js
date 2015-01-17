var CME_messenger = (function() {

  return {

    update: function() {
      jQuery(document).ready(function() {
        var source = new EventSource(CME_domain.url('v1/messages/stream?receiver=r'));
        source.addEventListener('messages_stream', function(e) {
          var data = JSON.parse(e.data);
          data.forEach( function(element) {
            var id = element._id.$oid
            if ($("#cmeBody ul").find("[data-id='" + id + "']").size() == 0) {
              $("#cmeBody ul").append("\
                <li data-id="+id+">\
                  "+JSON.stringify(element.body)+"\
                </li>\
              ");
           }
          });
        });
      });
    }, // update

    post: function(params) {
      $.post(CME_domain.url('v1/messages/insert'), params, function(data){
        if (data.status == false) {
          console.log("messenger.insert failed!");
        }
      });
    } // post

  };

}());

