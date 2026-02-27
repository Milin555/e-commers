package com.backend.e_com.Dto;

import lombok.Data;
import java.util.List;

@Data
public class SeedDataDto {
    private List<SeedCategory> categories;
    private List<SeedProduct> products;

    @Data
    public static class SeedCategory {
        private Integer id;
        private String name;
        private String code;
        private String path;
        private String description;
        private List<SeedType> types;
    }

    @Data
    public static class SeedType {
        private Integer id;
        private Integer type_id; // For women category, it's called type_id instead of id in the JSON
        private String name;
        private String code;
        private String description;
    }

    @Data
    public static class SeedProduct {
        private Integer id;
        private String title;
        private String description;
        private Integer category_id;
        private Integer type_id;
        private String brand;
        private Double price;
        private List<String> size;
        private List<String> color;
        private Integer discount;
        private String thumbnail;
        private List<String> images;
        private Float rating;
    }
}
