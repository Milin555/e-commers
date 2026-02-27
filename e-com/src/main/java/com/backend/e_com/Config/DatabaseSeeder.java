package com.backend.e_com.Config;

import com.backend.e_com.Dto.SeedDataDto;
import com.backend.e_com.Entity.*;
import com.backend.e_com.Repository.CategoryRepository;
import com.backend.e_com.Repository.ProductRepository;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.InputStream;
import java.math.BigDecimal;
import java.util.*;

@Slf4j
@Component
@Profile("dev")
@RequiredArgsConstructor
public class DatabaseSeeder implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    @Override
    @Transactional
    public void run(String... args) {
        log.info("DEV Profile: Checking if database needs to be seeded...");

        if (categoryRepository.count() > 0 && productRepository.count() > 0) {
            log.info("Database is already seeded with Categories and Products. Skipping.");
            return;
        }

        ObjectMapper mapper = new ObjectMapper()
                .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        try (InputStream inputStream = getClass().getResourceAsStream("/data/content.json")) {
            if (inputStream == null) {
                log.warn("Seed data file '/data/content.json' not found in resources!");
                return;
            }

            SeedDataDto seedData = mapper.readValue(inputStream, SeedDataDto.class);

            // 1. First make what not depend - Map Categories and Types
            Map<Integer, Category> categoryMap = new HashMap<>();
            Map<Integer, CategoryType> categoryTypeMap = new HashMap<>();

            log.info("Seeding Categories and Types...");
            if (seedData.getCategories() != null) {
                for (SeedDataDto.SeedCategory seedCat : seedData.getCategories()) {
                    Category category = new Category();
                    category.setName(seedCat.getName());
                    category.setCode(seedCat.getCode());
                    category.setDescription(seedCat.getDescription());

                    List<CategoryType> cTypes = new ArrayList<>();
                    if (seedCat.getTypes() != null) {
                        for (SeedDataDto.SeedType sType : seedCat.getTypes()) {
                            CategoryType ct = new CategoryType();
                            ct.setName(sType.getName());
                            ct.setCode(sType.getCode() != null ? sType.getCode() : sType.getName().toUpperCase());
                            ct.setDescription(
                                    sType.getDescription() != null ? sType.getDescription() : sType.getName());
                            ct.setCategory(category); // link relation
                            cTypes.add(ct);

                            Integer typeKey = sType.getId() != null ? sType.getId() : sType.getType_id();
                            if (typeKey != null) {
                                categoryTypeMap.put(typeKey, ct);
                            }
                        }
                    }
                    category.setCategoryTypes(cTypes);

                    // Save and store for parent reference during products
                    Category savedCategory = categoryRepository.save(category);
                    if (seedCat.getId() != null) {
                        categoryMap.put(seedCat.getId(), savedCategory);
                    }
                }
                log.info("Successfully seeded categories.");
            }

            // 2. Next make what depends - Map Products -> Variants & Resources
            log.info("Seeding Products...");
            if (seedData.getProducts() != null) {
                List<Product> productsToSave = new ArrayList<>();
                for (SeedDataDto.SeedProduct sProd : seedData.getProducts()) {
                    Product product = new Product();
                    product.setName(sProd.getTitle());
                    product.setDescription(sProd.getDescription());
                    product.setPrice(BigDecimal.valueOf(sProd.getPrice()));
                    product.setBrand(sProd.getBrand());
                    product.setRating(sProd.getRating() != null ? sProd.getRating() : 0f);
                    product.setNewArrival(true);

                    // Map parent relations using our temporary int-mapped lookups
                    if (sProd.getCategory_id() != null) {
                        product.setCategory(categoryMap.get(sProd.getCategory_id()));
                    }
                    if (sProd.getType_id() != null) {
                        product.setCategoryType(categoryTypeMap.get(sProd.getType_id()));
                    }

                    // Variants
                    List<ProductVariant> variants = new ArrayList<>();
                    if (sProd.getColor() != null && sProd.getSize() != null) {
                        for (String c : sProd.getColor()) {
                            for (String s : sProd.getSize()) {
                                ProductVariant pv = new ProductVariant();
                                pv.setColor(c);
                                pv.setSize(s);
                                pv.setStockQuantity("50"); // default mock stock
                                pv.setProduct(product); // Linking relation
                                variants.add(pv);
                            }
                        }
                    }
                    product.setProductVariantLists(variants);

                    // Resources
                    List<Resources> resources = new ArrayList<>();
                    if (sProd.getThumbnail() != null) {
                        Resources res = new Resources();
                        res.setName(sProd.getTitle() + " Thumbnail");
                        res.setUrl(sProd.getThumbnail());
                        res.setPrimary(true);
                        res.setType("image");
                        res.setProduct(product); // Linking relation
                        resources.add(res);
                    }
                    if (sProd.getImages() != null) {
                        for (String imgUrl : sProd.getImages()) {
                            Resources res = new Resources();
                            res.setName(sProd.getTitle() + " Gallery");
                            res.setUrl(imgUrl);
                            res.setPrimary(false);
                            res.setType("image");
                            res.setProduct(product); // Linking relation
                            resources.add(res);
                        }
                    }
                    product.setResources(resources);

                    // Since Products are the root of Variants and Resources, CascadeType.ALL
                    // handles children
                    productsToSave.add(product);
                }

                if (!productsToSave.isEmpty()) {
                    productRepository.saveAll(productsToSave);
                    log.info("Successfully seeded {} products.", productsToSave.size());
                }
            }
        } catch (Exception e) {
            log.error("Failed to seed database from JSON content: {}", e.getMessage(), e);
        }
    }
}
