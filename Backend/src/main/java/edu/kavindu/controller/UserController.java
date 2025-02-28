package edu.kavindu.controller;

import edu.kavindu.dto.User;
import edu.kavindu.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin
public class UserController {
    final UserService service;

    @GetMapping("/isUserExists/{username}:{password}")
    public boolean isUserExists(@PathVariable String username,@PathVariable String password){
        return service.findByUsernameAndPassword(username,password);
    }
}
