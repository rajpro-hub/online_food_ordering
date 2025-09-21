package com.raj.Online.Food.Ordering.controller;

import com.raj.Online.Food.Ordering.dto.RestaurantDto;
import com.raj.Online.Food.Ordering.model.Restaurant;
import com.raj.Online.Food.Ordering.model.User;
import com.raj.Online.Food.Ordering.request.CreateRestaurantRequest;
import com.raj.Online.Food.Ordering.service.RestaurantService;
import com.raj.Online.Food.Ordering.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private UserService userService;

    @GetMapping("/search")
    public ResponseEntity<List<Restaurant>> searchRestaurant(

            @RequestHeader("Authorization")String jwt,
            @RequestParam String keyword
    ) throws Exception {
        User user = userService.FindUserByJwtToken(jwt);
        List<Restaurant> restaurant = restaurantService.searchRestaurant(keyword);
        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<Restaurant>> getAllRestaurant(

            @RequestHeader("Authorization")String jwt

    ) throws Exception {
        User user = userService.FindUserByJwtToken(jwt);
        List<Restaurant> restaurant = restaurantService.getAllRestaurants();
        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> findRestaurantById(
            @PathVariable Long id,

            @RequestHeader("Authorization")String jwt

    ) throws Exception {
        User user = userService.FindUserByJwtToken(jwt);
        Restaurant restaurant = restaurantService.findRestaurantById(id);
        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    @PutMapping("/{id}/add.favorites")
    public ResponseEntity<RestaurantDto> addToFavorites(
            @PathVariable Long id,

            @RequestHeader("Authorization")String jwt

    ) throws Exception {
        User user = userService.FindUserByJwtToken(jwt);
        RestaurantDto restaurant = restaurantService.addToFavorites(id , user);
        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }
}
