package com.app.ajax.service;

import com.app.ajax.exception.NotFoundException;
import com.app.ajax.model.Product;
import com.app.ajax.repository.ProductRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Log4j2
@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> getProducts() {
        var products = productRepository.findAll();
        if (products.size() > 0) {
            return products;
        } else {
            throw new NotFoundException("Not found products");
        }
    }


    public Product getProductById(int id) {
        var product = productRepository.findById(id);
        if (product.isPresent()) {
            return product.get();
        } else {
            throw new NotFoundException("Not found product with id " + id);
        }
    }

    @Transactional
    public Product insert(Product product) {
        return productRepository.save(product);
    }

    @Transactional
    public Product update(Product product) {
        var productOpt = productRepository.findById(product.getProductId());
        if (productOpt.isEmpty()) {
            throw new NotFoundException("Not found product by id to update");
        }

        var p = productOpt.get();
        p.setProductName(product.getProductName());
        p.setCostAvg(product.getCostAvg());
        p.setProductStatus(product.getProductStatus());
        p.setProductTypeId(product.getProductTypeId());
        p.setSupplierId(product.getSupplierId());
        p.setLastCost(product.getLastCost());
        p.setSalePrice(product.getSalePrice());
        return productRepository.save(p);
    }

    public void delete(int id) {
        var productOpt = productRepository.findById(id);
        if (productOpt.isEmpty()) {
            throw new NotFoundException("Not found product by id to delete");
        }

        try {
            productRepository.deleteById(id);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }
}
