package edu.kavindu.service;

import edu.kavindu.dto.Food;

import java.util.List;

public interface FoodService {
    List<Food> getAll();

    void addFood(Food food);

    void updateFood(Food food);

    void deleteFood(Integer id);

    List<Food> searchFoodByName(String name);
}
