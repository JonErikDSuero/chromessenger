var CME_body = (function() {

  return {

    setup: function() {
      $('body').on('click', '#cmeInput button', function(){
        var body = {};
        var text = $("#cmeInput textarea").val();

        // refactor later .......................
        if (text == ":yelp"){
          var yelp_titles = [];
          $(".search-result-title .biz-name").each( function() {
            yelp_titles.push($(this).html());
          });
          body = {list: yelp_titles};
        } else {
          body = {text: text};
        }
        // ......................................

        CME_messenger.post({
          sender: "s",
          receiver: "r",
          body: body
        });
        $("#cmeInput textarea").val(""); //clear input
      });
    } //setup

  };

}());
