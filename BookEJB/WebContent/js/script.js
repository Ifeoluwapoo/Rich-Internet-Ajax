var rootUrl ="http://localhost:8080/BookEJB/rest/books";

var findAll=function(){
    $.ajax({type:'GET',
            url:rootUrl,
            dataType:"json",
            success:renderList});

}
var edit;

var renderList=function(books){
    $.each(books, function( index, book){
      //To DO
    	//$('#bookList').append('<li> <a href = "#" id="'+book.id+'">' +book.title+ '</a></li>');
    	$('#bookList').append("<tr>" +
    			"<td>" + book.id + "</td>" +
                "<td>" + book.title + "</td>" +
                "<td>" + book.author + "</td>" +
                "<td>" +"€" + "" + book.price + "</td>" +
                "<td>" + book.format + "</td>" +
                "<td> <a href='#' name='edit'>edit</a></td>" +
            "</tr>");
    });
    var table = $('#myTable').DataTable();
    $('#myTable tbody').on('click', 'td', function () {
    	if ($(this).index() == 5) { 
    		$('#myModal').modal("show");
  	      console.log(name);
            return;
        }
	      
	    });
}


//DOM has loaded



$(document).ready(function () {
	
	findAll();
});



//OnClick element


//To populate



















