package com.raj.Online.Food.Ordering.service;

import com.raj.Online.Food.Ordering.model.User;

public interface UserService {

    public User FindUserByJwtToken(String jwt) throws Exception;

    public User FindUserByEmail(String email) throws Exception;

}
