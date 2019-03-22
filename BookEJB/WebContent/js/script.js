var rootUrl ="http://localhost:8080/BookEJB/rest/books";
var rootUrlUser ="http://localhost:8080/BookEJB/rest/users";


var currentBook;
var currentUser;

//Product Jquery code

//Display Total Cost of all books
var findCost=function(){
    $.ajax({type:'GET',
            url:rootUrl,
          dataType:"json",
           success:costList});

}
var costList=function(books){
var bookPrice = 0;
$.each(books, function(index, book){
    //To DO
	bookPrice += book.price;	
	
});
var totalBookPrice = bookPrice.toFixed(4);
console.log(totalBookPrice);
document.getElementById("totalValue").innerHTML = "€" + totalBookPrice;
}

//Display Counted Value

var findCount=function(){
    $.ajax({type:'GET',
            url:rootUrl,
          dataType:"json",
           success:countList});

}
var countList=function(books){
$.each(books, function(index, book){
    //To DO
});

document.getElementById("totalBook").innerHTML = books.length;
}

//Refresh the Product Content
var refreshProductSection = function(){
	$('#totalBook').empty();
	findCount();
	$('#totalValue').empty();
	findCost();	
	var table =  $('#myTable').DataTable();
		table.clear();
		table.draw();
		table.destroy();
    };


//Display All Product in DataTable
var findAll=function(){
    $.ajax({type:'GET',
            url:rootUrl,
            dataType:"json",
            success:renderList});

}

var renderList=function(books){
    $.each(books, function( index, book){
      //To DO
    	$('#bookList').append("<tr>" +
    			"<td>" + (index+1) + "</td>" +
    			//"<td>" + book.id + "</td>" +
                "<td>" + book.title + "</td>" +
                "<td>" + book.author + "</td>" +
                "<td>" +"€" + "" + book.price + "</td>" +
               // "<td>" + book.format + "</td>" +
                '<td> <a href = "#" id="'+book.id+'" class="edit">Edit</a></td>'+
              
            "</tr>");
    });
   
    $('#myTable').DataTable();
}

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

// Clear text boxes to enter New Product Information
var newBook = function(){
	
	
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
		$('#btnDelete').hide();
}

var formToJSON = function() {
	
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


// Add new Product to the db
var addBook = function () {
	console.log('addBook');
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: rootUrl,
		dataType: "json",
		data: formToJSON(),
		success: function (data, textStatus, jqXHR){
			refreshProductSection();
			findAll();
				alert('Book was created successfully');
			
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
			refreshProductSection();
			findAll();
			alert('Book was successfully deleted');	
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('deleteBook error');
		}
	});
}


//Update Product

var updateBook = function() {
  $.ajax({
      type: 'PUT',
      contentType: 'application/json',
      url: rootUrl + '/' + $('#bookId').val(),
      dataType: "json",
      data: formToJSON(),
      success: function(data, textStatus, jqXHR){
    	  refreshProductSection();
			findAll();
          alert('Book was successfully updated');
          $('#bookId').val(data.id);
      },
      error: function(jqXHR, textStatus, errorThrown){
          alert('updateBook error: ' + textStatus);
      }
  });
}


//DOM has loaded


$(document).ready(function () {
	//Get all Products
	findAll();
	
	//Get Product by Id
	
	$('#bookList').on("click", "a", function(data){
		var id = data.currentTarget.id;
		findById(id);
		$('#myEditModal').modal("show");
	
	})
   
	
	//Add New Product
	 $(document).on("click", '#btnSave', function(){
		   
		   if ($('#bookId').val() == '')
				addBook();		  
			else
				updateBook();
	   });
	 
	 // Delete Product
	   $(document).on("click", '#btnDelete', function(){
		   deleteBook();
	   });
	   
	   // Total number of Product
	   findCount();
	   
	   //Total Cost of Products
	   findCost();
	   
	   //Total number of Users
	   findUserCount();
	   
	// Get All users
		findAllUser();
		
		
	//Get User by Id
		
		$('#userList').on("click", "a", function(data){
			var id = data.currentTarget.id;
			findUserById(id);
			$('#myEditUserModal').modal("show");
		
		})
	   
		
		//Add New User
		 $(document).on("click", '#btnAddUser', function(){
			   
			   if ($('#userId').val() == '')
					addUser();		  
				else
					updateUser();
		   });
		 
		 // Delete User
		   $(document).on("click", '#btnDeleteUser', function(){
			   deleteUser();
		   });
		   
		   //New User From the Dashboard Not from Datatable
		   
		   		//$(document).on("click", '#userNew', function(){
		   		//	$('#myGenericUserModal').modal("show"); 			
		   //});
		   
		   //Login a
		   
		//   $("#login").click(function(){
	        //    $.ajax({
	          //      url: 'http://www.mywebsite.com/checklogin?user='+encodeURIComponent($("#loginusername").val())+'&pass='+encodeURIComponent($("#loginpassword").val()),
	            //    success:function(data){
	             //       if(data == "OK")
	              //      {
	                //        $("#first").hide();
	                //        $("#second").append("<p>Hello, admin</p> <br/><input type='button' id='logout' value='Log Out' />");
	                 //   }
	                  //  else
	                   // {
	                    //    alert("Please try again");
	                    //}
	               // }
	           // });
	        //});

	      //  $("#logout").click(function() {
	         //   $("form")[0].reset();
	         //   $("#first").show();
	        //    $("#second").hide();
	        //});
		   
});


//Clear Product Input box
$(document).on("click", '#btnAdd', function(){
	   newBook();
});

//Clear User Input box
$(document).on("click", '#btnClearUser', function(){
	   newUser();
});



// Users

//Display Count User
var findUserCount=function(){
    $.ajax({type:'GET',
            url:rootUrlUser,
          dataType:"json",
           success:countUser});

}
var countUser=function(users){
$.each(users, function(index, user){
    //To DO
});
document.getElementById("totalUser").innerHTML = users.length;
}


//Display All User in DataTable
var findAllUser=function(){
    $.ajax({type:'GET',
            url:rootUrlUser,
            dataType:"json",
            success:renderListUser});

}

var renderListUser=function(users){
    $.each(users, function( index, user){
      //To DO
    	$('#userList').append("<tr>" +
    			"<td>" + (index+1) + "</td>" +
                "<td>" + user.fullName + "</td>" +
                "<td>" + user.username + "</td>" +
                "<td>" + user.address + "</td>" +
                '<td> <a href = "#" id="'+user.id+'" class="edit">Edit</a></td>'+
              
            "</tr>");
    });   
    $('#example').DataTable();
}

//Refresh the User Content
var refreshUserSection = function(){
	$('#totalUser').empty();
	findUserCount();
	
	var table = $('#example').DataTable();
		table.clear();
		table.draw();
		table.destroy();
    };

//Get User by Id
var findUserById=function(id){
    $.ajax({type:'GET',
            url:rootUrlUser +"/"+id,
            dataType:"json",
            success: function(data){
    			$('#btnDeleteUser').show();
    			console.log('findById success: ' + data.fullName);
    			currentUser = data;
    			renderDetailUser(currentUser);
               }
           });
    
}

var renderDetailUser=function(user){
	$('#userId').val(user.id);
	$('#fullName').val(user.fullName);
	$('#userName').val(user.username);
	$('#password').val(user.password);
	$('#gender').val(user.gender);
	$('#address').val(user.address);
	$('#picUser').attr('src', 'images/Users/' +user.image);
	
	console.log(user);
	
}

// Clear text boxes to enter New Product Information
var newUser = function(){
	
	
	//To clear the text boxes
	
	    $('#userId').val('');
	    $('#fullName').val('');
	    $('#userName').val('');
	    $('#password').val('');
	    $('#gender').val('');
	    $('#address').val('');
		$('#picUser').attr('src', '');
		$('#btnDeleteUser').hide();
}

var formToJSONUser = function() {
	
	return JSON.stringify ({
		"id": $('#userId').val(),
		"fullName": $('#fullName').val(),
		"username": $('#userName').val(),
		"password": $('#password').val(),
		"gender": $('#gender').val(),
		"address": $('#address').val(),
		"image": "user-Gen.jpg",
		
	});
}


// Add new Product to the db
var addUser = function () {
	console.log('addUser');
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: rootUrlUser,
		dataType: "json",
		data: formToJSONUser(),
		success: function (data, textStatus, jqXHR){
			refreshUserSection();
			findAllUser();		
			alert('User was created successfully');
						
		},
		error: function(jqXHR, textStatus, errorThrow){
			alert('addUser error: ' + textStatus);
		}
	});
}


//Delete Book function

var deleteUser = function() {
	console.log('deleteUser');
	$.ajax({
		type: 'DELETE',
		url: rootUrlUser + '/' + $('#userId').val(),
		success: function(data, textStatus, jqXHR){
			refreshUserSection();
			findAllUser();
			alert('User was successfully deleted');
			
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('deleteUser error');
		}
	});
}


//Update Product

var updateUser = function() {
  $.ajax({
      type: 'PUT',
      contentType: 'application/json',
      url: rootUrlUser + '/' + $('#userId').val(),
      dataType: "json",
      data: formToJSONUser(),
      success: function(data, textStatus, jqXHR){
    	 refreshUserSection();
	    findAllUser();		
          alert('User was successfully updated');
          $('#userId').val(data.id);
          	
      },
      error: function(jqXHR, textStatus, errorThrown){
          alert('updateUser error: ' + textStatus);
      }
  });
}











