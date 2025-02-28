package edu.kavindu.service.impl;

import edu.kavindu.entity.UserEntity;
import edu.kavindu.repository.UserRepository;
import edu.kavindu.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    final UserRepository repository;
    final ModelMapper mapper;


    @Override
    public boolean findByUsernameAndPassword(String username,String password) {
        UserEntity user = repository.findByUsernameAndPassword(username,password);
        return user.getUsername().equals(username)&&user.getPassword().equals(password);


    }
}
