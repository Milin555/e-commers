package Backend.Backend.Controllers;


import Backend.Backend.Dto.ProductDto;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
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
