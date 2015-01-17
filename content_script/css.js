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
  .highlights { \
    size: inherit; \
    background-color: yellow; \
  } \
  #comments-body{ \
    position: absolute; \
    top: 0; \
    right: 0; \
    bottom: 0; \
    width: 300px; \
    background-color: #ECECEC; \
    z-index: 10000; \
    text-align: center; \
    -webkit-touch-callout: none; \
    -webkit-user-select: none; \
    -khtml-user-select: none; \
    -moz-user-select: none; \
    -ms-user-select: none; \
    user-select: none; \
  } \
  .comments-right #comments-body { \
    top: 0; \
    right: 0; \
    bottom: 0; \
    width: 300px; \
  } \
  .comments-left #comments-body { \
    top: 0; \
    left: 0; \
    bottom: 0; \
    width: 300px; \
  } \
  #comments-body h1 { \
    position: relative; \
    display: inline-block; \
    text-align: center; \
    margin: 15px 30px; \
    font-size: 25px; \
    color: #333; \
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
    border-left-color: rgba(102,102,102,0.2); \
    left: 0.25em; \
  } \
  .comments-right .arrow-e{ \
    display: none; \
  } \
  .arrow-e:hover { \
    border-left-color: rgba(102,102,102,0.4); \
    cursor: pointer; \
  } \
  .arrow-w { \
    border-right-width: 1em; \
    border-right-style: solid; \
    border-right-color: rgba(102,102,102,0.2); \
    right: 0.25em; \
  } \
  .comments-left .arrow-w{ \
    display: none; \
  } \
  .arrow-w:hover { \
    border-right-color: rgba(102,102,102,0.4); \
    cursor: pointer; \
  } \
  #activate-comment { \
    position: fixed; \
    width: 200px; \
    bottom: 0; \
    left: 0; \
    font-size: 14px; \
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
  ";

  return {
    apply: function() {
      var sheet = document.createElement('style');
      sheet.innerHTML = css_text;
      document.body.appendChild(sheet);
    } //apply
  }

}());

