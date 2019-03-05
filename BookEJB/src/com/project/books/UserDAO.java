package com.project.books;

import java.util.List;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.ws.rs.PathParam;

@Stateless
@LocalBean
public class UserDAO {

    @PersistenceContext
    private EntityManager em;
    
    //Get User by Id DAO
    public User getUserById(int id) {
        return em.find(User.class, id);
    }
    
    //Get User by Address DAO
    public List<User> getUserByAddress(String address) {

    	Query query = em.createQuery("select b from User b where address = '"+address+"'");
    	return query.getResultList();	
        
    }
    
  //Get User by Gender DAO
    public List<User> getUserByGender(String gender) {
    	Query query = em.createQuery("select b from User b where gender = '"+gender+"'");
    	return query.getResultList();	
        
    }
    
    //Get User by Role DAO
    public List<User> getUserByRole(String role) {
    	Query query = em.createQuery("select b from User b where Role = '"+role+"'");
    	return query.getResultList();	
        
    }
    
    //Get all the available User DAO
    public List<User> getAllUsers(){
    	
    	Query query = em.createQuery("SELECT b FROM User b");
    	return query.getResultList();	
    }
    
    // Add a User DAO
    public void addUser(User user) {     
            em.persist(user);
    }
    
    //Update A User DAO
    public void updateUser(User user) {
    	em.merge(user);
    }
    
    //Delete a User by Id DAO
    public void deleteUser(int id) {
    	em.remove(getUserById(id));
    }
    
}