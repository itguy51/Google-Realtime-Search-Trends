function urlencode (str) {
	str = (str + '').toString();
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
    replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}
		
		
		$(document).keypress(function(e) {
    if(e.keyCode == 13) {
doSubmit();
    }
});
		  var socket = io.connect("%HOSTURI%");
		  var loadone = false;
		  var i = 0;
		  var aspi = "";
		  socket.on('resulted', function(data){
			  $('#bgbox').append('<span style="display:none;" id="' + i + '">' + data.query + '</span><br />');
			  aspi = "#" + i;
			  $(aspi).fadeIn("slow");
			i++;
		  });
		 
	function doSubmit(){
		socket.emit('search', {query: $("#searchbar").val()});
		window.open('http://www.google.com/search?q=' + urlencode($("#searchbar").val()), '_blank');
	}
