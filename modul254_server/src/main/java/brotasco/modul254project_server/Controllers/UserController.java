package brotasco.modul254project_server.Controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import brotasco.modul254project_server.Business.BusinessServiceUser;
import brotasco.modul254project_server.Entities.Status;
import brotasco.modul254project_server.Entities.User;

@RestController
@RequestMapping("/user")
public class UserController {
	
	/**
	 * The Rest Service for registering a new user
	 * @param user
	 * @return Status Object
	 */
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value="/register", method=RequestMethod.PUT)
	public Status register(@RequestBody User user){
		Status status = new Status();
		User returnedUser = BusinessServiceUser.register(user);
		if(returnedUser == null){
			status.setStatus(false);
			status.setMessage("Failed to register, please try again later.");
		} else {
			status.setReturnObject(returnedUser);
			status.setStatus(true);
			status.setMessage("Registration successful!");
		}
		return status;
	}
	
	/**
	 * Rest Service for login an existing user
	 * @param user
	 * @return Status Object
	 */
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value="/login", method=RequestMethod.POST)
	public Status login(@RequestBody User user){
		Status status = new Status();
		User returnedUser = BusinessServiceUser.login(user);
		if(returnedUser == null){
			status.setStatus(false);
			status.setMessage("Failed to login, please try again!");
		} else {
			status.setReturnObject(returnedUser);
			status.setStatus(true);
			status.setMessage("Login successful!");
		}
		return status;
	}
	
	/**
	 * Rest Service for updating an existing user
	 * @param user
	 * @return Status Object
	 */
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value="/update", method=RequestMethod.POST)
	public Status update(@RequestBody User user){
		Status status = new Status();
		User returnedUser = BusinessServiceUser.update(user);
		if(returnedUser == null){
			status.setStatus(false);
			status.setMessage("Failed to update, please try again!");
		} else {
			status.setReturnObject(returnedUser);
			status.setStatus(true);
			status.setMessage("Update successful!");
		}
		return status;
	}
	
}
