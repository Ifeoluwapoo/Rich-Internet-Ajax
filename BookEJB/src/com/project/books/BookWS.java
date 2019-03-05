package com.project.books;

import java.util.List;
import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/books")
@Stateless
@LocalBean
public class BookWS {

    @EJB
    private BookDAO bookDao;

    //Get book by Id
    @GET
    @Produces({ MediaType.APPLICATION_JSON})
    @Path("/{id}")
    public Response getbookById(@PathParam("id") int id) {
    	Book book = bookDao.getBookById(id);
        return Response.status(200).entity(book).build();
    }
    
    @GET
    @Produces({ MediaType.APPLICATION_JSON})
    @Path("search/{query}")
    public Response getbookByFormat(@PathParam("query") String query) {
    	List<Book> books = bookDao.getBookByFormat(query);
        return Response.status(200).entity(books).build();
    }
  
    @GET
    @Produces({ MediaType.APPLICATION_JSON})
    @Path("searchAuthor/{query}")
    public Response getbookByAuthor(@PathParam("query") String query) {
    	List<Book> books = bookDao.getBookByAuthor(query);
        return Response.status(200).entity(books).build();
    }
    
    //Get all book 
    @GET
    @Produces({ MediaType.APPLICATION_JSON})
    public Response getAllBooks() {
    	System.out.println("Display All Books");
    	List<Book> books = bookDao.getAllBooks();
        return Response.status(200).entity(books).build();
    }
    
    // Add Book
    @POST
    @Produces({ MediaType.APPLICATION_JSON})
    public Response addNewBook(Book book) {
        bookDao.addBook(book);
        return Response.status(201).entity(book).build();
    }
    
    //Update Book
    @PUT
    @Path("/{id}")
    @Consumes("application/json")
    @Produces({ MediaType.APPLICATION_JSON})
    public Response updateBook(Book book) {
    	bookDao.updateBook(book);
    	return Response.status(200).entity(book).build();
    }
    
    //Delete Book by ID
    @DELETE
    @Path("/{id}")
    public Response deleteBook(@PathParam("id") int id) {
    	bookDao.deleteBook(id);
    	return Response.status(204).build();
    	
    }
    
}
