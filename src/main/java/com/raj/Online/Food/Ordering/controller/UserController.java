package com.raj.Online.Food.Ordering.controller;

import com.raj.Online.Food.Ordering.model.User;
import com.raj.Online.Food.Ordering.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<User> finUserByJwtToken(@RequestHeader("Authorization")String jwt) throws Exception {
        User user = userService.FindUserByJwtToken(jwt);
        return new ResponseEntity<>(user, HttpStatus.OK);

    }
}
