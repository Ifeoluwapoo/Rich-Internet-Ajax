var rootUrl ="http://localhost:8080/BookEJB/rest/books";


var currentBook;


var findAll=function(){
    $.ajax({type:'GET',
            url:rootUrl,
            dataType:"json",
            success:renderList});

}

var findCount=function(){
    $.ajax({type:'GET',
            url:rootUrl,
            dataType:"json",
            success:countList});

}
var countList=function(books){
	var count;
	for(var i=0; i=books.length; i++)
		{
			//count = i;
			console.log(i);
		}
	
//$.each(wines,function(index,book){
    //To DO
  	//$('#wineList').append('<li> <a href = "#" id="'+wine.id+'">' +wine.name+ '</a></li>');
  //});
};

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
                '<td> <a href = "#" id="'+book.id+'" class="edit">Edit</a></td>'+
              
            "</tr>");
    });
   
    var table = $('#myTable').DataTable();
}


//DOM has loaded



$(document).ready(function () {
	//Get all books
	findAll();
	
	//Get book by Id
	
	$('#bookList').on("click", "a", function(data){
		var id = data.currentTarget.id;
		findById(id);
		$('#myEditModal').modal("show");
	
	})

	 //Clear Input box
   $(document).on("click", '#btnAdd', function(){
	   newBook();
   });
   
	
	//Add New Book
	 $(document).on("click", '#btnSave', function(){
		   
		   if ($('#bookId').val() == '')
				addBook();
			else
				updateBook();
	   });
	 
	 // Delete Book
	   $(document).on("click", '#btnDelete', function(){
		   deleteBook();
	   });
	   
	   findCount();
});

	//
var myPage = (function () {
	var table = $('#example').DataTable();
	 var coun = table.rows.count();
	 console.log(coun)
})


//Get Product by Id
var findById=function(id){
    $.ajax({type:'GET',
            url:rootUrl +"/"+id,
            dataType:"json",
            success: function(data){
    			$('#btnDelete').show();
    			console.log('findById success: ' + data.title);
    			console.log(data);
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
	$('#published_date').val(book.publishedDate);
	$('#isbn').val(book.isbn);
	$('#price').val(book.price);
	$('#format').val(book.format);
	$('#description').val(book.description);
	$('#pic').attr('src', 'images/Books/' +book.image);
	
}
//Performing Create

//New Book
var newBook = function(){
	
	$('#btnDelete').hide();
	//To clear the text boxes
	
		$('#bookId').val('');
		$('#title').val('');
		$('#author').val('');
		$('#publisher').val('');
		$('#published_date').val('');
		$('#isbn').val('');
		$('#price').val('');
		$('#format').val('');
		$('#description').val('');
		$('#pic').attr('src', '');
}

var formToJSON = function() {
	
	// var wineId = $('#wineId').val();
	
	
	return JSON.stringify ({
		"id": $('#bookId').val(),
		"title": $('#title').val(),
		"author": $('#author').val(),
		"publisher": $('#publisher').val(),
		"publishedDate": $('#published_date').val(),
		"isbn": $('#isbn').val(),
		"price": $('#price').val(),
		"format": $('#format').val(),
		"description": $('#description').val(),
		"image": "generic.jpg",
		
	});
}


//Posting the new book to the db
var addBook = function () {
	console.log('addBook');
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: rootUrl,
		dataType: "json",
		data: formToJSON(),
		success: function (data, textStatus, jqXHR){
				alert('Book was created successfully');
				$('#bookId').val(data.id);
				findAll();
		},
		error: function(jqXHR, textStatus, errorThrow){
			alert('addBook error: ' + textStatus);
		}
	});
}



//Delete Book function

var deleteBook = function() {
	console.log('deleteBook');
	$.ajax({
		type: 'DELETE',
		url: rootUrl + '/' + $('#bookId').val(),
		success: function(data, textStatus, jqXHR){
			alert('Book was successfully deleted');
			
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('deleteBook error');
		}
	});
}


//Update Wine

var updateBook = function() {
  $.ajax({
      type: 'PUT',
      contentType: 'application/json',
      url: rootUrl + '/' + $('#bookId').val(),
      dataType: "json",
      data: formToJSON(),
      success: function(data, textStatus, jqXHR){
          alert('Book was successfully updated');
          $('#bookId').val(data.id);
      },
      error: function(jqXHR, textStatus, errorThrown){
          alert('updateBook error: ' + textStatus);
      }
  });
}



















