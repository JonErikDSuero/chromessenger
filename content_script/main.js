CME_css.apply();

// CME_body.apply();

// CME_messenger.update();

// CME_body.setup();
var id = 1;
var time_fetch;

function getTime(){
	var current = new Date();
	time_fetch = current.toUTCString();
}

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

function placeComment(data){
	var selector = data.selector;
	var author = data.author;
	var comment = data.comment;
	var comment_id = data.comment_id;
	$('#comments-body').prepend(" \
	<div class='comment' id='comment-"+comment_id+"'>"+comment+
	"<span>"+author+"</span></div> \
	").find('#comment-'+comment_id).css({
		position: "absolute",
		top: $(selector).offset().top+"px"
	});
	$(selector).addClass('highlights');
}

function populateCommentBody(){
	var request = $.ajax({
		url: "https://morning-refuge-4780.herokuapp.com/groups/get_comments/",
		type: "POST",
		data: { 
			"url" : window.location.href,
			"group_id" : "1",
		},
		dataType: "json"
	});
	request.done(function(data){
		console.log(data);
		var i;
		for(i = 0; i < data.comments.length; i++){
			placeComment(data.comments[i]);
		}
	});
	request.fail(function(jqXHR, textStatus){
		console.log(textStatus);
	});
}

$(function(){
	populateCommentBody();
	$('body').addClass('comments-right');
	$('body').prepend(" \
                        <div id='comments-body'> \
                        	<div class='title'> \
                        		<span class='arrow-w'></span><h1>Comments</h1><span class='arrow-e'></span> \
                        	</div> \
                        	<div id='activate-comment'> \
								<span class='activate unactive'>ACTIVATE</span> \
								<span class='deactivate'>DEACTIVATE</span> \
                        	</div> \
                        </div> \
                        ");

	$('body').on('click', '#activate-comment .activate.unactive', function(){
		$('body').addClass('comment-on');
		$(this).removeClass('unactive');
		$('#activate-comment .deactivate').addClass('unactive');
	});

	$('body').on('click', '#activate-comment .deactivate.unactive', function(){
		$('body').removeClass('comment-on');
		$(this).removeClass('unactive');
		$('#activate-comment .activate').addClass('unactive');
	});

	$(document).on('click', 'body.comments-left .arrow-e', function(){
		$('body').removeClass('comments-left').addClass('comments-right');
	});

	$(document).on('click', 'body.comments-right .arrow-w', function(){
		$('body').removeClass('comments-right').addClass('comments-left');
	});

	

	$(document).on('mouseup', 'body.comment-on',function (e){
		var text = getSelectionText();
		console.log(text);

	    if(text.length < 2){
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
	    	console.log(selectorArr);
	    	// if(selectorArr[0] == 'div#comments-body' || selectorArr[0] == 'div#activate-comment'){
	    	// 	return;
	    	// }
	    	var selector = selectorArr.join(" > ");
	    	$(selector).addClass('highlights');

	    	var commentText = prompt("Write your comment! Press cancel to stop action", "This is your comment");
	    	if(commentText == null){
	    		return;
	    	}
	    	var request = $.ajax({
				url: "https://morning-refuge-4780.herokuapp.com/groups/add_comment/",
				type: "POST",
				data: { 
					"selector" : selector,
					"url" : window.location.href,
					"author_id" : "1",
					"group_id" : "1",
					"comment" : commentText
				},
				dataType: "json"
			});
			request.done(function(data){
				$('#comments-body').prepend(" \
				<div class='comment' id='new-"+id+"'>"+commentText+"</div> \
		    	").find('#new-'+id).css({
		    		position: "absolute",
		    		top: $(selector).offset().top+"px"
		    	});
		    	id++;
			});
			request.fail(function(jqXHR, textStatus){
				console.log(textStatus);
			});

			// yelp list
			var voting_dom = '';
			var voting_dom_target = e.target;
			while(voting_dom_target != null && 
				voting_dom_target.tagName != "UL" && 
				voting_dom_target.tagName != "OL") {
					if(voting_dom != '')
						voting_dom = voting_dom_target.tagName.toLowerCase() + '>' + voting_dom;
					else
						voting_dom = voting_dom_target.tagName.toLowerCase();
					voting_dom_target = voting_dom_target.parentElement;
			}
			console.log('voting dom: '+voting_dom);
			var voting_list = [];
			$(voting_dom).each(function() {
		        voting_list.push($(this).text());
		    });

			chrome.runtime.sendMessage({method: "setLocalStorage", key: "voting-list-dom", data: voting_list.join('#:#')}, function(response){
				console.log(response);
			});
	    }
	});

	setTimeout(function(){
		var request = $.ajax({
			url: "https://morning-refuge-4780.herokuapp.com/groups/get_comments/",
			type: "POST",
			data: { 
				"url" : window.location.href,
				"group_id" : "1",
				"time": getTime()
			},
			dataType: "json"
		});
		request.done(function(data){
			time_fetch = getTime();
			var i;
			for(i = 0; i < data.comments.length; i++){
				placeComment(data.comments[i]);
			}
		});
		request.fail(function(jqXHR, textStatus){
			console.log(textStatus);
		});
	}, 1000);

});
