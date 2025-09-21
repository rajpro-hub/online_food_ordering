package com.raj.Online.Food.Ordering.controller;

import com.raj.Online.Food.Ordering.model.Food;
import com.raj.Online.Food.Ordering.model.Restaurant;
import com.raj.Online.Food.Ordering.model.User;
import com.raj.Online.Food.Ordering.request.CreateFoodRequest;
import com.raj.Online.Food.Ordering.response.MessageResponse;
import com.raj.Online.Food.Ordering.service.FoodService;
import com.raj.Online.Food.Ordering.service.RestaurantService;
import com.raj.Online.Food.Ordering.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/food")
public class AdminFoodController {

    @Autowired
    private FoodService foodService;

    @Autowired
    private UserService userService;

    @Autowired
    private RestaurantService restaurantService;

    @PostMapping
    public ResponseEntity<Food> createFood(@RequestBody CreateFoodRequest req,
                                           @RequestHeader("Authorization")String jwt) throws Exception {
        User user = userService.FindUserByJwtToken(jwt);
        Restaurant restaurant = restaurantService.findRestaurantById(req.getRestaurantId());
        Food food = foodService.createFood(req,req.getCategory(),restaurant);
        return new ResponseEntity<>(food, HttpStatus.CREATED);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteFood(@PathVariable Long id,
                                                      @RequestHeader("Authorization")String jwt) throws Exception {
        User user = userService.FindUserByJwtToken(jwt);

        foodService.deleteFood(id);

        MessageResponse res = new MessageResponse();
        res.setMessage("Food has been deleted successfully");

        return new ResponseEntity<>(res, HttpStatus.CREATED);

    }

    @PutMapping("/{id}")
    public ResponseEntity<Food> updateFoodAvaibilityStatus(@PathVariable Long id,
                                                      @RequestHeader("Authorization")String jwt) throws Exception {
        User user = userService.FindUserByJwtToken(jwt);

        Food food = foodService.updateAvailablityStatus(id);


        return new ResponseEntity<>(food, HttpStatus.CREATED);

    }



}
