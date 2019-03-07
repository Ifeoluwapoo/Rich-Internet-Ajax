var rootUrl ="http://localhost:8080/BookEJB/rest/books";


var currentBook;

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
                "<td>" +"€" + "" + book.price + "</td>" +
                "<td>" + book.format + "</td>" +
                "<td> <a href='#' name='details'>Details</a></td>" +
                "<td> <a href='#' name='edit'>Edit</a></td>" +
            "</tr>");
    });
    var table = $('#myTable').DataTable();
    
    $('#myTable tbody').on('click', 'td', function () {
    	if ($(this).index() == 5) { 
    		$('#myDetailModal').modal("show");
  	      console.log(name);
            return;
        }
	      
	    });
    
    $('#myTable tbody').on('click', 'td', function () {
    	if ($(this).index() == 6) { 
    	//$('#myEditModal').modal("show");
    	display:	$('#myEditModal').modal({
    		header: function ( row ) {
                var data = row.data();
                return data[0];
                console.log(data);
    		}
    	});
    		//$('#myEditModal').on('show.bs.modal', function(event) {
                //var getId = $(event.relatedTarget).data('id');
                //$("#siteDetails").html('Selected: ' + getId);   

            //});
            return;
        }
	      
	    });
}


//DOM has loaded



$(document).ready(function () {
	//Get all books
	findAll();
	
	//Get book by Id
	$(document).on("click", "#bookList td", function(){
		   findById(this.id);
		   console.log(this.id);
	});
});

//Get Product by Id
var findById=function(id){
    $.ajax({type:'GET',
            url:rootUrl +"/"+id,
            dataType:"json",
            success: function(data){
    			$('#btnDelete').show();
    			console.log('findById success: ' + data.title);
    			currentBook = data;
            	renderDetail(currentBook);
               }
           });
}

var renderDetail=function(book){
	$('#bookId').val(book.id);
	$('#title').val(book.title);
	$('#author').val(book.author);
	$('#publisher').val(book.publisher);
	$('#published_date').val(book.published_date);
	$('#isbn').val(book.isbn);
	$('#price').val(book.price);
	$('#format').val(book.format);
	$('#description').val(book.description);
	//$('#pic').attr('src', 'images/Books/' +book.image);

}





















