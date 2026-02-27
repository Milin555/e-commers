package com.backend.e_com.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class ProductVariantDto {

    private UUID id;
    private String name;
    private String description;
    private Integer StockQuantity;


}

