package brotasco.modul254project_server.Controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import brotasco.modul254project_server.Business.BusinessServiceAddress;
import brotasco.modul254project_server.Business.BusinessServiceUser;
import brotasco.modul254project_server.Entities.Address;
import brotasco.modul254project_server.Entities.Status;
import brotasco.modul254project_server.Entities.User;

@RestController
@RequestMapping("/address")
public class AddressController {
	
	/**
	 * Adding an Address to an existing user
	 * @param userid
	 * @param address
	 * @return
	 */
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(method=RequestMethod.PUT, value="/{userid}")
	public Status addAddress(@PathVariable("userid") int userid, @RequestBody Address address){
		Status status = new Status();
		User addressUser = new User();
		Address returnedAddress = new Address();
		addressUser.setUserid(userid);
		address.setUser(addressUser);
		returnedAddress = BusinessServiceAddress.addAddress(address);
		if(returnedAddress == null){
			status.setStatus(false);
			status.setMessage("Failed to add Address, please try again later.");
		} else {
			status.setReturnObject(returnedAddress);
			status.setStatus(true);
			status.setMessage("Address successfully added!");
		}
		return status;
	}
	
}
