package edu.kavindu.repository;

import edu.kavindu.entity.FoodEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoodRepository extends JpaRepository<FoodEntity,Integer> {
    List<FoodEntity> findByName(String name);
}
