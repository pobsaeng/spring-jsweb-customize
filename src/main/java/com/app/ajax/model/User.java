package com.app.ajax.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Integer id;
    private String username;
    private String password;
    private String status;
}
