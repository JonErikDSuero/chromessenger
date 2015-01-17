CME_css.apply();

// CME_body.apply();

// CME_messenger.update();

// CME_body.setup();

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

jQuery.fn.highlight = function (str, className) {
    var regex = new RegExp(str, "gi");
    return this.each(function () {
        $(this).contents().filter(function() {
            return this.nodeType == 3 && regex.test(this.nodeValue);
        }).replaceWith(function() {
            return (this.nodeValue || "").replace(regex, function(match) {
                return "<span class=\"" + className + "\">" + match + "</span>";
            });
        });
    });
};

$(function(){
	console.log($(document).height());
	
	// $(document).on('scroll', function(){
	// 	console.log($(document).scrollTop());
	// });

	$('body').prepend(" \
                        <div id='comments-body'> \
                        	<div id='title'> \
                        		<span class='arrow-w'></span><h1>Comments</h1><span class='arrow-e'></span> \
                        	</div> \
                        </div>\
                        ");

	$(document).on('mouseup', function (e){
		var text = getSelectionText();
		console.log(text);
	    if(text.length < 3){
	    	return;
	    } else {
	    	var target = e.target;
	    	var selectorArr = [];
	    	while(target.parentElement.tagName != "BODY"){
	    		var ind = "";
	    		ind += target.tagName.toLowerCase();
	    		if(target.id.length > 0){
	    			ind += "#"+target.id;
	    			selectorArr.unshift(ind);
	    			break;
	    		}
	    		if(target.className.length > 0){
	    			//ind += "."+target.className.split(" ").join(".");
	    		} 
	    		selectorArr.unshift(ind);
	    		target = target.parentElement;
	    	}
	    	for(var i = 2; i <= selectorArr.length; i++){
	    		var parentSel = selectorArr.slice(0,i);
	    		var child = e.target;
	    		var j = selectorArr.length - i;
	    		while(j > 0){
	    			child = child.parentElement;
	    			j--;
	    		}
	    		if($(parentSel.join(" > ")).length == 1){
	    			continue;
	    		}
	    		var childNum = $.inArray(child, $(parentSel.join(" > "))) + 1;
	    		if(childNum == 0){ childNum = 1; }
	    		selectorArr[parentSel.length-1] = selectorArr[parentSel.length-1]+":nth-of-type("+childNum+")";
	    	}
	    	var selector = selectorArr.join(" > ");
	    	$(selector).addClass('highlights');
	    	console.log($(selector).offset().top);
	    	$('#comments-body').prepend(" \
				<div class='comment'>This is my comment</div> \
	    	").find('.comment').css({
	    		backgroundColor: "yellow",
	    		position: "absolute",
	    		top: $(selector).offset().top+"px"
	    	});
	    }
	});

});
