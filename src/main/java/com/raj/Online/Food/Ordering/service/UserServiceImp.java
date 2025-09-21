package com.raj.Online.Food.Ordering.service;

import com.raj.Online.Food.Ordering.config.JwtProvider;
import com.raj.Online.Food.Ordering.model.User;
import com.raj.Online.Food.Ordering.repository.UserRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    private UserRespository userRespository;

    @Autowired
    private JwtProvider jwtProvider;

    @Override
    public User FindUserByJwtToken(String jwt) throws Exception {
        String email=jwtProvider.getEmailFromJwtToken(jwt);
        User user = FindUserByEmail(email);
        return user;
    }

    @Override
    public User FindUserByEmail(String email) throws Exception {
        User user = userRespository.findByEmail(email);

        if(user==null){
            throw new Exception("User not found");
        }

        return user;
    }
}
