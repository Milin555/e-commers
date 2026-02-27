package com.backend.e_com.Service;

import com.backend.e_com.Dto.ProductDto;
import com.backend.e_com.Dto.ProductResourceDto;
import com.backend.e_com.Entity.*;
import com.backend.e_com.Repository.ProductRepository;
import com.backend.e_com.Specification.ProductSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProductServicesImpl  implements  ProductService{

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryService categoryService;


    @Override
    public Product addProduct(ProductDto productDto) {
     Product product=mapToProductEntity(productDto);
        return productRepository.save(product);
    }

    @Override

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> getAllProducts(UUID categoryId, UUID typeId) {

        Specification<Product> productSpecification= Specification.where(null);

        if(null != categoryId){
            productSpecification = productSpecification.and(ProductSpecification.hasCategoryId(categoryId));
        }
        if(null != typeId){
            productSpecification = productSpecification.and(ProductSpecification.hasCategoryTypeId(typeId));
        }
        List<Product> products = productRepository.findAll(productSpecification);
        return products;
    }
    private Product mapToProductEntity(ProductDto productDto) {
        Product  product = new Product();
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setBrand(productDto.getBrand());
        product.setNewArrival(productDto.isNewArrival());
        product.setPrice(productDto.getPrice());
        product.setRating(productDto.getRating());

        Category category = categoryService.getCategory(productDto.getCategoryId());
        if(null != category){
            product.setCategory(category);
            UUID categoryTypeId = productDto.getCategoryTypeId();

            CategoryType categoryType = category.getCategoryTypes().stream().filter(categoryTypeDto -> categoryTypeDto.getId().equals(categoryTypeId)).findFirst().orElse(null);
            product.setCategoryType(categoryType);
        }

        if (productDto.getVariants() != null) {
            List<ProductVariant> variants =
                    mapToProductVariant(productDto.getVariants(), product);
            product.setProductVariantLists(variants);
        }

        if (null!=productDto.getProductResources()){
           product.setResources(mapToProductResources(productDto.getProductResources(),product));

        }

        return productRepository.save(product);
    }
    private List<Resources> mapToProductResources(List<ProductResourceDto> productResources, Product product) {

        return productResources.stream().map(productResourceDto -> {
            Resources resources= new Resources();
            if(productResourceDto.getId() != null){
                resources.setId(productResourceDto.getId());
            }
            resources.setName(productResourceDto.getName());
            resources.setType(productResourceDto.getType());
            resources.setUrl(productResourceDto.getUrl());
            resources.setPrimary(productResourceDto.isPrimary());
            resources.setProduct(product);
            return resources;
        }).collect(Collectors.toList());
    }

    private List<ProductVariant> mapToProductVariant(List<ProductVariant> productVariantDtos,Product product) {
        return productVariantDtos.stream().map(productVariantDto->{
            ProductVariant productVariant = new ProductVariant();
            productVariant.setColor(productVariantDto.getColor());
            productVariant.setSize(productVariantDto.getSize());
            productVariant.setStockQuantity(productVariantDto.getStockQuantity());
            productVariant.setProduct(product);
            return productVariant;
        }).collect(Collectors.toList());
    }
}
