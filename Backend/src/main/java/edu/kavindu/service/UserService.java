package edu.kavindu.service;

import edu.kavindu.dto.User;

public interface UserService {
    boolean findByUsernameAndPassword(String username,String password);
}
