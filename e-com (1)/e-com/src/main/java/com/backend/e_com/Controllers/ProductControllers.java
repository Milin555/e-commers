package com.backend.e_com.Controllers;
import com.backend.e_com.Dto.ProductDto;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductControllers {

    @GetMapping
    public List<ProductDto> getAllProducts() {
        return Collections.EMPTY_LIST;
    }

    @PostMapping
    public ProductDto createProduct(@RequestBody ProductDto productDto) {
        return null;
    }


}