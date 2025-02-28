package edu.kavindu.repository;

import edu.kavindu.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity,Integer> {
    UserEntity findByUsernameAndPassword(String username,String password);
}
