package brotasco.modul254project_server.Entities;

/**
 * An Object used to return a message and an object depending on what you need
 * @author t522048
 *
 */
public class Status {
	private boolean status;
	private String message;
	private Object returnObject;
	
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Object getReturnObject() {
		return returnObject;
	}
	public void setReturnObject(Object returnObject) {
		this.returnObject = returnObject;
	}
}
