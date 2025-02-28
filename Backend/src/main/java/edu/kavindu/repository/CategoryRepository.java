package edu.kavindu.repository;

import edu.kavindu.dto.Category;
import edu.kavindu.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<CategoryEntity,Integer> {


}
