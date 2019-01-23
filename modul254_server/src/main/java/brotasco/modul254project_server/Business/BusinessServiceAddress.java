package brotasco.modul254project_server.Business;

import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

import brotasco.modul254project_server.Entities.Address;
import brotasco.modul254project_server.Entities.User;

public class BusinessServiceAddress {

	private static SessionFactory factory;
	
	/**
	 * Adding Address to an existing user
	 * @param address
	 * @param user
	 * @return
	 */
	public static Address addAddress(Address address){
		try {
			factory = new Configuration().configure().buildSessionFactory();
		} catch (Throwable ex) {
			System.err.println("Failed to create sessionFactory object." + ex);
			throw new ExceptionInInitializerError(ex);
		}
		Session session = factory.openSession();
		Transaction tx = null;

		try {
			tx = session.beginTransaction();
			session.save(address);
			tx.commit();
		} catch (HibernateException e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
			return null;
		} finally {
			session.close();
		}
		return address;
	}
	
	
}
