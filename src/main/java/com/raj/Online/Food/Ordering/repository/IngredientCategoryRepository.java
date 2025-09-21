package com.raj.Online.Food.Ordering.repository;

import com.raj.Online.Food.Ordering.model.IngredientCategory;
import com.raj.Online.Food.Ordering.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IngredientCategoryRepository extends JpaRepository<IngredientCategory,Long> {

    List<IngredientCategory> findByRestaurantId(Long id);
}
