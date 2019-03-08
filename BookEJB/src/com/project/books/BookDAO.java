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
public class BookDAO {

    @PersistenceContext
    private EntityManager em;
    
    //Get Book by Id DAO
    public Book getBookById(int id) {
        return em.find(Book.class, id);
    }
    
    //Get Book by Format DAO
    public List<Book> getBookByFormat(String format) {

    	Query query = em.createQuery("select b from Book b where format = '"+format+"'");
    	return query.getResultList();	
    	
    }
    
    //Get Book by Author DAO
    public List<Book> getBookByAuthor(String author) {

    	Query query = em.createQuery("select b from Book b where author = '"+author+"'");
    	return query.getResultList();	
        
    }
    
    //Get all the available Books DAO
    public List<Book> getAllBooks(){
    	
    	Query query = em.createQuery("SELECT b FROM Book b");
    	return query.getResultList();	
    }
    
   public List<Book> getBookCount(){
    	
    	Query query = em.createQuery("SELECT Count(*) FROM Book b");
    	return query.getResultList();	
    }
    
    // Add a book DAO
   // @TransactionAttribute(TransactionAttributeType.REQUIRED)
    public void addBook(Book book) {     
            em.persist(book);
    }
    
    //Update A book DAO
    public void updateBook(Book book) {
    	em.merge(book);
    }
    
    //Delete a book by Id DAO
    public void deleteBook(int id) {
    	em.remove(getBookById(id));
    }
    
}