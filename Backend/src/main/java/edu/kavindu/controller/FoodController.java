package edu.kavindu.controller;

import edu.kavindu.dto.Food;
import edu.kavindu.service.FoodService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/food")
@CrossOrigin
@RequiredArgsConstructor
public class FoodController {
    final FoodService service;

    @GetMapping("/get-all")
    public List<Food> getAll(){
        return service.getAll();
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public void addFood(@RequestBody Food food){
        service.addFood(food);
    }

    @PutMapping("/update-food")
    public void updateFood(@RequestBody Food food){
        service.updateFood(food);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void deleteFood(@PathVariable Integer id){
        service.deleteFood(id);
    }

    @GetMapping("/search-by-name/{name}")
    public List<Food> getFoodByName(@PathVariable String name){
        return service.searchFoodByName(name);
    }
}
