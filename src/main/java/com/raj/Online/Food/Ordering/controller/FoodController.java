package com.raj.Online.Food.Ordering.controller;

import com.raj.Online.Food.Ordering.model.Food;
import com.raj.Online.Food.Ordering.model.Restaurant;
import com.raj.Online.Food.Ordering.model.User;
import com.raj.Online.Food.Ordering.request.CreateFoodRequest;
import com.raj.Online.Food.Ordering.service.FoodService;
import com.raj.Online.Food.Ordering.service.RestaurantService;
import com.raj.Online.Food.Ordering.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/food")
public class FoodController {

    @Autowired
    private FoodService foodService;

    @Autowired
    private UserService userService;

    @Autowired
    private RestaurantService restaurantService;

    @GetMapping("/search")
    public ResponseEntity<List<Food>> searchFood(@RequestParam String name,
                                           @RequestHeader("Authorization")String jwt) throws Exception {
        User user = userService.FindUserByJwtToken(jwt);

        List<Food> foods = foodService.searchFood(name);
        return new ResponseEntity<>(foods, HttpStatus.CREATED);

    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Food>> getRestaurantFood(
            @RequestParam boolean vegetarain,
            @RequestParam boolean seasonal,
            @RequestParam boolean nonveg,
            @RequestParam(required = false) String food_category,
            @PathVariable Long restaurantId,
            @RequestHeader("Authorization")String jwt) throws Exception {
        User user = userService.FindUserByJwtToken(jwt);

        List<Food> foods = foodService.getRestaurantFoods(restaurantId,vegetarain,nonveg,seasonal,food_category);
        return new ResponseEntity<>(foods, HttpStatus.OK);

    }
}
