var Future = Npm.require( 'fibers/future' ); 

Meteor.methods({
	/*
	'searchData': function () {
		var future = new Future();	
		var url_search = "https://itunes.apple.com/search";
		HTTP.get(url_search,{query: "term=25&entity=album"}, function (error, response) {
			if (error) {
				future.return(error);
			} else {
				future.return(response);
			}
		});
		return future.wait();
	},
	*/
	'lookupData': function (url) {
		var future = new Future();
		var id = url.match(/id\d+/i)[0].substring(2);
		var url_lookup = "https://itunes.apple.com/lookup";
		HTTP.get(url_lookup,{query: "id=" + id + "&entity=song"}, function (error, response) {
			if (error) {
				future.return(error);
			} else {
				future.return(response);
			}
		});
		return future.wait();
	}
})