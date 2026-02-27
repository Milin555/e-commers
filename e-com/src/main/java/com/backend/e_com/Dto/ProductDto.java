package com.backend.e_com.Dto;


import com.backend.e_com.Entity.Product;
import com.backend.e_com.Entity.ProductVariant;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
@Data
@Getter
@Setter

public class ProductDto {

    private UUID id;
    private String name;
    private String description;
    private String brand;
    private Float rating;
    private BigDecimal price;
    private boolean isNewArrival;
    private UUID categoryId;
    private UUID categoryTypeId;
    private List<ProductVariant> variants;
    private List<ProductResourceDto> ProductResources;
}
