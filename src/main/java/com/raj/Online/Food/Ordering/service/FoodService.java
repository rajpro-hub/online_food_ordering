package com.raj.Online.Food.Ordering.service;

import com.raj.Online.Food.Ordering.model.Category;
import com.raj.Online.Food.Ordering.model.Food;
import com.raj.Online.Food.Ordering.model.Restaurant;
import com.raj.Online.Food.Ordering.request.CreateFoodRequest;

import java.util.List;

public interface FoodService {
    public Food createFood(CreateFoodRequest req, Category category, Restaurant restaurant);

    void deleteFood(Long foodId) throws Exception;

    public List<Food> getRestaurantFoods(Long restaurantId , boolean isVegetarian ,
                                         boolean isNonveg,
                                         boolean isSeasonal, String foodCategory);
    public List<Food> searchFood(String keyword);

    public Food findFoodById(Long foodId) throws Exception;

    public Food updateAvailablityStatus(Long foodId) throws Exception;



}
