package com.raj.Online.Food.Ordering.service;

import com.raj.Online.Food.Ordering.model.Order;
import com.raj.Online.Food.Ordering.model.User;
import com.raj.Online.Food.Ordering.request.OrderRequest;

import java.util.List;

public interface OrderService {

    public Order createOrder(OrderRequest order , User user) throws Exception;

    public Order updateOrder(Long orderId , String orderStatus) throws Exception;

    public void cancelOrder(Long orderId) throws Exception;

    public List<Order> getUserOrders(Long userId) throws Exception;

    public List<Order> getRestaurantOrders(Long restaurantId , String orderStatus) throws Exception;

    public Order findOrderById(Long orderId) throws Exception;

}
