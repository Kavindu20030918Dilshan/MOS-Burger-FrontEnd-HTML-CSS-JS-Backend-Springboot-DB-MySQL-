package edu.kavindu.repository;

import edu.kavindu.entity.OrdersEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrdersRepository extends JpaRepository<OrdersEntity,Integer> {
    List<OrdersEntity> findByCustomerMobile(String mobile);

}
