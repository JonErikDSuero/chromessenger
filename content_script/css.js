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
  .arrow-w:hover { \
    border-right-color: rgba(102,102,102,0.4); \
    cursor: pointer; \
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

