var itunesURL = "https://itunes.apple.com/ca/album/purpose-deluxe/id1049605561";
Template.postsList.created = function () {
	var self = this;
	self.myAsyncValue = new ReactiveVar("Waiting response"); //Alternate sol: Session
	/*
	Meteor.call('searchData', itunesURL, 
		function(error, response) {
			if (error) console.log(error);
			else  self.myAsyncValue.set(response.data.results);
	});
	*/
	Meteor.call('lookupData',itunesURL,
		function(error, response) {
			if(error) console.log(error);
			else self.myAsyncValue.set(response.data.results);
	});
};

Template.postsList.helpers({
	'posts': function () {
		var tracklist = _.toArray(Template.instance().myAsyncValue.get()).slice(1); //ALternate sol: jQuerry makeArray
		return tracklist;
	},
	'info': function () {
		return Template.instance().myAsyncValue.get()[0];
	}
});

$(document).ready(function(){
    $("button").click(function(){
        $("#main").fadeToggle("slow");
        var s = $("#main").html();
        $("button").attr("data-clipboard-text",s);
    });
});

Template.postsList.onRendered(function() {
    var clipboard = new Clipboard('.btn-copy-link');
});