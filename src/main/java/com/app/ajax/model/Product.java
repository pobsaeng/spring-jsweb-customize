package com.app.ajax.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "Product")
public class Product {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "product_id", nullable = false)
    private Integer productId;
    private String productName;
    private float lastCost;
    private float costAvg;
    private float salePrice;
    private String productStatus;
    private Integer supplierId;
    private Integer productTypeId;
}
