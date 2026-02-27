package com.backend.e_com.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductResourceDto {
    private UUID id;
    private String name;
    private String url;
    private String type;
    private boolean isPrimary;

}
