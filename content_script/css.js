var CME_css = (function () {

  var css_text = " \
  body { \
    position: relative; \
  } \
  #cmeBody { \
    background-color: #c0c0c0; \
    position:fixed; \
    bottom:0; \
    width:350px; \
    z-index:10000; \
  } \
  #cmeBody ul { \
    list-style: none !important; \
    width: 100% !important; \
    margin: 0px !important; \
  } \
  #cmeBody ul li{ \
    margin: 3px 0px !important; \
    background: #aaccff !important; \
  } \
  .comments-closed .highlights{ \
    size: inherit; \
    background-color: inherit; \
  } \
  .highlights { \
    size: inherit; \
    background-color: rgba(255,247,148,0.9); \
  } \
  #comments-body{ \
    position: absolute; \
    top: 0; \
    right: 0; \
    bottom: 0; \
    width: 300px; \
    background-color: rgba(236,236,236,0.9); \
    z-index: 10000; \
    text-align: center; \
    -webkit-touch-callout: none; \
    -webkit-user-select: none; \
    -khtml-user-select: none; \
    -moz-user-select: none; \
    -ms-user-select: none; \
    user-select: none; \
  } \
  .comments-open #comments-body{ \
    display: block; \
  } \
  .comments-closed #comments-body { \
    display: none; \
  } \
  .comments-right #comments-body { \
    top: 0; \
    right: 0; \
    bottom: 0; \
    width: 300px; \
    box-shadow: -3px 0px 15px rgba(0,0,0,0.3); \
  } \
  .comments-left #comments-body { \
    top: 0; \
    left: 0; \
    bottom: 0; \
    width: 300px; \
    box-shadow: 3px 0px 15px rgba(0,0,0,0.3); \
  } \
  #comments-body h1 { \
    position: relative; \
    display: inline-block; \
    text-align: center; \
    margin: 15px 30px; \
    font-size: 25px; \
    color: #333; \
  } \
  #comments-body .comment { \
    background-color: rgba(255,247,148,0.5); \
    max-width: 260px; \
    padding: 3px; \
    font-size: 14px; \
    border-radius: 3px; \
    border: 1px solid #ddd; \
    box-shadow: 0 1px 3px rgba(0,0,0,0.3); \
  } \
  .comment span { \
    position: absolute; \
    font-size: 11px; \
    color: #2153BF; \
    left: 2px; \
    top: -15px; \
  } \
  .comments-left .comment { \
    right: 20px; \
  } \
  .comments-right .comment { \
    left: 20px; \
  } \
  .arrow-n, \
  .arrow-e, \
  .arrow-s, \
  .arrow-w { \
    border-style: dashed; \
    border-color: transparent; \
    border-width: 0.53em; \
    display: -moz-inline-box; \
    display: inline-block; \
    font-size: 20px; \
    height: 0; \
    line-height: 0; \
    position: relative; \
    vertical-align: middle; \
    width: 0; \
  } \
  .arrow-e { \
    border-left-width: 1em; \
    border-left-style: solid; \
    border-left-color: rgba(102,102,102,0.4); \
    left: 0.25em; \
    z-index: 30; \
  } \
  .comments-right .arrow-e{ \
    display: none; \
  } \
  .arrow-e:hover { \
    border-left-color: rgba(102,102,102,0.8); \
    cursor: pointer; \
  } \
  .arrow-w { \
    border-right-width: 1em; \
    border-right-style: solid; \
    border-right-color: rgba(102,102,102,0.4); \
    right: 0.25em; \
  } \
  .comments-left .arrow-w{ \
    display: none; \
  } \
  .arrow-w:hover { \
    border-right-color: rgba(102,102,102,0.8); \
    cursor: pointer; \
  } \
  #activate-comment { \
    position: fixed; \
    width: 200px; \
    bottom: 0; \
    font-size: 14px; \
  } \
  .comments-open #activate-comment{ \
    display: block; \
  } \
  .comments-closed #activate-comment { \
    display: none; \
  } \
  .comments-right #activate-comment{ \
    left: 0; \
  } \
  .comments-left #activate-comment { \
    right: 0; \
  } \
  #activate-comment span { \
    opacity: 0.4; \
    display:inline-block; \
    width: 49%; \
    background-color: rgba(102,102,102,0.4); \
    color: white; \
  } \
  #activate-comment span.unactive { \
    cursor: pointer; \
    opacity: 1; \
    background-color: rgba(102,102,102,1); \
  } \
  .close-thik { \
    color: rgba(102,102,102, 0.4); \
    position: absolute; \
    text-decoration: none; \
    top: 12px; \
    cursor: pointer; \
  } \
  .comments-right .close-thik { \
    right: 17px; \
  } \
  .comments-left .close-thik { \
    left: 17px; \
  } \
  .close-thik:after { \
    font-size:30px; \
    content: '✖';  \
  } \
  #open-the-comments{ \
    position: fixed; \
    padding: 5px; \
    background-color: rgba(85,85,85,0.9); \
    bottom: 0; \
    left: 0; \
    z-index: 10000; \
    cursor: pointer; \
    color: #eee; \
    font-size: 16px; \
  } \
  #open-the-comments:hover { \
    background-color: rgba(236,236,236,1); \
    color: #333; \
    cursor: pointer; \
  } \
  .comments-closed #open-the-comments{ \
    display: block; \
  } \
  .comments-open #open-the-comments{ \
    display: none; \
  } \
  ";

  return {
    apply: function() {
      var sheet = document.createElement('style');
      sheet.innerHTML = css_text;
      document.body.appendChild(sheet);
    } //apply
  }

}());

