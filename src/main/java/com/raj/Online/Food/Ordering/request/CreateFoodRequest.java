package com.raj.Online.Food.Ordering.request;


import com.raj.Online.Food.Ordering.model.Category;
import com.raj.Online.Food.Ordering.model.IngredientsItem;
import lombok.Data;

import java.util.List;

@Data
public class CreateFoodRequest {

    private String name;
    private String description;
    private Category category;
    private Double price;
    private List<String> images;
    private Long restaurantId;
    private Boolean vegetarian;
    private Boolean seasonal;
    private List<IngredientsItem> ingredients;
}
