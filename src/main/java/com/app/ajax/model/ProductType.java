package com.app.ajax.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "product_type")
public class ProductType {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "product_type_id")
    private Integer productTypeId;
    @Column(name = "product_type_name")
    private String productTypeName;
    @Column(name = "description")
    private String description;
}
