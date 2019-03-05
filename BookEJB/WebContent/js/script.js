var rootUrl ="http://localhost:8080/BookEJB/rest/books";

var findAll=function(){
    $.ajax({type:'GET',
            url:rootUrl,
            dataType:"json",
            success:renderList});

}

var renderList=function(books){
    $.each(books, function( index, book){
      //To DO
    	//$('#bookList').append('<li> <a href = "#" id="'+book.id+'">' +book.title+ '</a></li>');
    	$('#bookList').append("<tr>" +
    			"<td>" + book.id + "</td>" +
                "<td>" + book.title + "</td>" +
                "<td>" + book.author + "</td>" +
                //"<td>" + book.publisher + "</td>" +
                //"<td>" + book.published_date + "</td>" +
                //"<td>" + book.isbn + "</td>" +
                "<td>" +"€" + "" + book.price + "</td>" +
                "<td>" + book.format + "</td>" +
                "<td> <a href = ''>Edit</a></td>" +
            "</tr>");
    });

}


//DOM has loaded
$(document).ready(function(){
   $('[data-toggle="tooltip"]').tooltip();
   
   $('#myTable').DataTable();
});

findAll();

//OnClick element


//To populate



















