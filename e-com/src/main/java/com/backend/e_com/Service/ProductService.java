package com.backend.e_com.Service;

import com.backend.e_com.Dto.ProductDto;
import com.backend.e_com.Entity.Product;

import java.util.List;
import java.util.UUID;

public interface ProductService {
    public Product addProduct(ProductDto product);
    public List<Product> getAllProducts();

    List<Product> getAllProducts(UUID categoryId, UUID TypeId);
}
