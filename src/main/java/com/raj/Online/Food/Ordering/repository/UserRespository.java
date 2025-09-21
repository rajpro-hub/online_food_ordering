package com.raj.Online.Food.Ordering.repository;

import com.raj.Online.Food.Ordering.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRespository extends JpaRepository<User, Long> {
    public User findByEmail(String username);

}
