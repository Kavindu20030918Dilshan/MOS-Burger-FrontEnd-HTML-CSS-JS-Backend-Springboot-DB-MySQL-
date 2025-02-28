package edu.kavindu.service.impl;

import edu.kavindu.dto.Category;
import edu.kavindu.entity.CategoryEntity;
import edu.kavindu.repository.CategoryRepository;
import edu.kavindu.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CategoryServiceImpl implements CategoryService {
    final CategoryRepository repository;
    final ModelMapper mapper;
    @Override
    public List<Category> getAll() {
        List<Category> categoryList = new ArrayList<>();
        List<CategoryEntity> categoryEntities = repository.findAll();

        categoryEntities.forEach(categoryEntity -> {
            categoryList.add(mapper.map(categoryEntity,Category.class));
        });

        return categoryList;

    }


}
