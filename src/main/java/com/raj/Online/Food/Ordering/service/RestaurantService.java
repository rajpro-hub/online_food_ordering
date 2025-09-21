package com.raj.Online.Food.Ordering.service;

import com.raj.Online.Food.Ordering.dto.RestaurantDto;
import com.raj.Online.Food.Ordering.model.Restaurant;
import com.raj.Online.Food.Ordering.model.User;
import com.raj.Online.Food.Ordering.request.CreateRestaurantRequest;

import java.util.List;

public interface RestaurantService {
    public Restaurant createRestaurant(CreateRestaurantRequest req, User user);

    public Restaurant updateRestaurant(Long restaurantId, CreateRestaurantRequest updatedRestaurant)throws Exception;

    public void deleteRestaurant(Long restaurantId)throws Exception;

    public List<Restaurant> getAllRestaurants()throws Exception;

    public List<Restaurant> searchRestaurant(String keyword)throws Exception;

    public Restaurant findRestaurantById(Long Id)throws Exception;

    public Restaurant getRestaurantByUserId(Long userId)throws Exception;

    public RestaurantDto addToFavorites(Long restaurantId, User user)throws Exception;

    public Restaurant updateRestaurantStatus(Long id) throws Exception;
}
