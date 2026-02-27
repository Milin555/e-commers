package com.backend.e_com.Specification;

import com.backend.e_com.Entity.Product;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.UUID;

public class ProductSpecification {
    public static Specification<Product> hasCategoryId( UUID categoryId) {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("category").get("id"),categoryId);

    }

    public static Specification<Product> hasCategoryTypeId(UUID typeId) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(
                        root.get("categoryType").get("id"),
                        typeId
                );
    }
}
