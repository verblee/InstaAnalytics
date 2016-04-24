
var express = require('express');
var app = express();
var request = require('request-promise');
var http = require('http').Server(app);


var fred_key = 'fc43e5bbce799f48cd0a89b85e5fa11e';
app.use(express.static(__dirname));

app.get('/',function(req,res){
	res.sendfile('./index.html');
})
	
app.get('/fred', function(req, res) {
	
	var query = req.param('query');
	var request_str ="https://api.stlouisfed.org/fred/series" +
					"/search?search_text=" + query + "&api_key=" + 
					fred_key +"&limit=100&file_type=json";
	var body_obj;
	var arr = new Array();
	console.log("get query " + query);

	request(request_str, function (error, response, body) {
	if (!error && response.statusCode == 200) {
		body_obj= JSON.parse(body).seriess;
		

		for (var key in body_obj) {
			if(arr.indexOf(body_obj[key].title) === -1){
				arr.push(body_obj[key].title);
			}
			
		}
	}
	}).then(function(){ console.log(arr.length); res.send(arr);})

	
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});