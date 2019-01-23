package brotasco.modul254project_server.Business;

import org.hibernate.Hibernate;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.hibernate.exception.ConstraintViolationException;

import brotasco.modul254project_server.Entities.User;

public class BusinessServiceUser {

	private static SessionFactory factory;

	/**
	 * Register a new User
	 * @param user
	 * @return
	 */
	public static User register(User user) {
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
			session.save(user);
			tx.commit();
		} catch(ConstraintViolationException ex){
			if (tx != null)
				tx.rollback();
			System.out.println("Duplicate");
			return null;
		}catch (HibernateException e) {
			if (tx != null)
				tx.rollback();
			return null;
		} finally {
			session.close();
		}
		return user;
	}

	/**
	 * Logging in an existing user
	 * @param user
	 * @return
	 */
	public static User login(User user) {
		User returnedUser = null;
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
			Query query = session.createQuery("FROM user as u where u.username = :username AND u.password = :password");
			query.setParameter("username", user.getUsername());
			query.setParameter("password", user.getPassword());
			returnedUser = (User) query.list().get(0);
			System.out.println("user");
			tx.commit();
		}catch(IndexOutOfBoundsException eoob){
			return null;
		}catch (HibernateException e) {
			if (tx != null)
				e.printStackTrace();
				tx.rollback();
			return null;
		} finally {
			session.close();
		}
		return returnedUser;
	}

	/**
	 * Updating an existing user
	 * @param user
	 * @return
	 */
	public static User update(User user) {
		System.out.println(user.getUserid());
		System.out.println(user.getUsername());
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
			session.update(user);
			tx.commit();
		} catch(ConstraintViolationException ex){
			if (tx != null)
				tx.rollback();
			return null;
		}catch (HibernateException e) {
			if (tx != null)
				tx.rollback();
			return null;
		} finally {
			session.close();
		}
		return user;
	}

}
