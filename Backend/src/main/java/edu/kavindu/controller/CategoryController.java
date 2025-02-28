package edu.kavindu.controller;

import edu.kavindu.dto.Category;
import edu.kavindu.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {
    final CategoryService service;

    @GetMapping("/get-all")
    public List<Category> getAll(){
        return service.getAll();
    }


}
