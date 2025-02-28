package edu.kavindu.service.impl;

import edu.kavindu.dto.Food;
import edu.kavindu.entity.FoodEntity;
import edu.kavindu.repository.FoodRepository;
import edu.kavindu.service.FoodService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class FoodServiceImpl implements FoodService {
    final FoodRepository repository;
    final ModelMapper mapper;

    @Override
    public List<Food> getAll() {
        List<Food> foodList = new ArrayList<>();
        List<FoodEntity> foodEntities = repository.findAll();
        foodEntities.forEach(foodEntity -> {
            foodList.add(mapper.map(foodEntity,Food.class));
        });

        return foodList;
    }

    @Override
    public void addFood(Food food) {
        repository.save(mapper.map(food,FoodEntity.class));
    }

    @Override
    public void updateFood(Food food) {
        repository.save(mapper.map(food, FoodEntity.class));
    }

    @Override
    public void deleteFood(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public List<Food> searchFoodByName(String name) {
        List<Food> foodList = new ArrayList<>();
        List<FoodEntity> foodEntities = repository.findByName(name);
        foodEntities.forEach(foodEntity -> {
            foodList.add(mapper.map(foodEntity,Food.class));
        });

        return foodList;
    }


}
