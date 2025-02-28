package edu.kavindu.repository;

import edu.kavindu.entity.CartEntity;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<CartEntity , Integer> {

}
