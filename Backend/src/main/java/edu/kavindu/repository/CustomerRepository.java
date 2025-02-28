package edu.kavindu.repository;

import edu.kavindu.entity.CustomerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<CustomerEntity,Integer> {
    CustomerEntity findByMobile(String mobile);
}
