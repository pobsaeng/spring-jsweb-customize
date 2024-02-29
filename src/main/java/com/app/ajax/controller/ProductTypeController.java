package com.app.ajax.controller;

import com.app.ajax.model.ProductType;
import com.app.ajax.service.ProductTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductTypeController {
    @Autowired
    private ProductTypeService productTypeService;

    @GetMapping("/product-types")
    public List<ProductType> getProductTypes(){
        return productTypeService.getProductTypes();
    }
}
