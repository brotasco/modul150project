package brotasco.modul254project_server.Entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity(name="address")
public class Address {
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id @Column(name="addressid")
	private int adressid;
	
	@Column(name="street")
	private String street;
	
	@Column(name="number")
	private String number;
	
	@Column(name="postcode")
	private String postcode;
	
	@Column(name="city")
	private String city;
	
	@Column(name="country")
	private String country;
	
	@JsonIgnore
	@ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name = "userid")
	private User user;
	
	
	public int getAdressid() {
		return adressid;
	}
	public void setAdressid(int adressid) {
		this.adressid = adressid;
	}
	public String getStreet() {
		return street;
	}
	public void setStreet(String street) {
		this.street = street;
	}
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	public String getPostcode() {
		return postcode;
	}
	public void setPostcode(String postcode) {
		this.postcode = postcode;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}	
}
