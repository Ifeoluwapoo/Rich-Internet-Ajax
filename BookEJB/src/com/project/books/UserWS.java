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

@Path("/users")
@Stateless
@LocalBean
public class UserWS {

    @EJB
    private UserDAO userDao;

    //Get user by Id
    @GET
    @Produces({ MediaType.APPLICATION_JSON})
    @Path("/{id}")
    public Response getuserById(@PathParam("id") int id) {
    	User user = userDao.getUserById(id);
        return Response.status(200).entity(user).build();
    }
    
    //Get user by address
    @GET
    @Produces({ MediaType.APPLICATION_JSON})
    @Path("search/{query}")
    public Response getuserByAddress(@PathParam("query") String query) {
    	List<User> users = userDao.getUserByAddress(query);
        return Response.status(200).entity(users).build();
    }
    
    //Get user by gender
    @GET
    @Produces({ MediaType.APPLICATION_JSON})
    @Path("searchGender/{query}")
    public Response getuserByGender(@PathParam("query") String query) {
    	List<User> users = userDao.getUserByGender(query);
        return Response.status(200).entity(users).build();
    }
  
    //Get user by Role
    @GET
    @Produces({ MediaType.APPLICATION_JSON})
    @Path("searchRole/{query}")
    public Response getuserByRole(@PathParam("query") String query) {
    	List<User> users = userDao.getUserByRole(query);
        return Response.status(200).entity(users).build();
    }
    
    //Get all user 
    @GET
    @Produces({ MediaType.APPLICATION_JSON})
    public Response getAllUsers() {
    	System.out.println("Display All Books");
    	List<User> users = userDao.getAllUsers();
        return Response.status(200).entity(users).build();
    }
    
    // Add User
    @POST
    @Produces({ MediaType.APPLICATION_JSON})
    public Response addNewUser(User user) {
        userDao.addUser(user);
        return Response.status(201).entity(user).build();
    }
    
    //Update Book
    @PUT
    @Path("/{id}")
    @Consumes("application/json")
    @Produces({ MediaType.APPLICATION_JSON})
    public Response updateUser(User user) {
    	userDao.updateUser(user);
    	return Response.status(200).entity(user).build();
    }
    
    //Delete Book by ID
    @DELETE
    @Path("/{id}")
    public Response deleteUser(@PathParam("id") int id) {
    	userDao.deleteUser(id);
    	return Response.status(204).build();
    	
    }
    
}
