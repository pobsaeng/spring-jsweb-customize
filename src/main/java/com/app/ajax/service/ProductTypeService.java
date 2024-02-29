package com.app.ajax.service;

import com.app.ajax.model.ProductType;
import com.app.ajax.repository.ProductTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductTypeService {

    @Autowired
    private ProductTypeRepository productTypeRepository;

    public List<ProductType> getProductTypes(){
        return productTypeRepository.findAll();
    }
}
