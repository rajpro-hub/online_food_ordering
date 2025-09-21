package com.raj.Online.Food.Ordering.request;

import lombok.Data;

@Data
public class IngredientRequest {

    private String name;
    private Long RestaurantId;
    private Long categoryId;
}
