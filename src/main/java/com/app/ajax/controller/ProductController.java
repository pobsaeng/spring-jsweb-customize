package com.app.ajax.controller;

import com.app.ajax.model.Product;
import com.app.ajax.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/")
    public List<Product> getProducts() {
        return productService.getProducts();
    }

    @GetMapping("/{id}")
    public Product getProduct(@PathVariable int id) {
        return productService.getProductById(id);
    }

    @PostMapping("/add")
    public Product add(@RequestBody Product product) {
        return productService.insert(product);
    }

    @PutMapping("/update")
    public Product update(@RequestBody Product product) {
        return productService.update(product);
    }

    @DeleteMapping("/delete/{id}")
    public boolean delete(@PathVariable int id) {
        productService.delete(id);
        return true;
    }
}
