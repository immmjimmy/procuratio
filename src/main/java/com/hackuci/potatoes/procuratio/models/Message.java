package com.hackuci.potatoes.procuratio.models;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name="message")
public class Message {

	@Id
	private Long id;
	
	@OneToOne
	private User from;
	
	@OneToOne
	private User to;
	
	private String body;
	
	private Date timestamp;
}
