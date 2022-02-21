import { FC, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Food, FoodEaten } from "../types/Food";
import FoodItem from "./FoodItem";

export const MealCard: FC<{
  meal: string;
  selectedMeal: string;
  foodList: Food[];
  foodsEaten: FoodEaten[];

  onDelete: (id: string) => void;

  onSelect: (food: Food|null) => void;
}> = ({ meal, foodsEaten, selectedMeal, foodList, onSelect, onDelete }) => {

  return (
    <div className="card border-0 meal-card shadow-sm mb-3">
      <div className="meal-card-header d-flex justify-content-between align-items-center">
        <h5 className="text-capitalize mb-0">{meal}</h5>
        <button
          type="button"
          className="btn add-btn d-flex align-items-center justify-content-center"
          aria-label="Add food"
          title="Add food"
          data-bs-toggle="modal"
          data-bs-target="#searchModal"
          onClick={() => onSelect(null)}
        >
          <FaPlus></FaPlus>
        </button>
      </div>
      <div className="meal-card-content">
        {foodsEaten
          .filter((food) => food.meal === meal)
          .map((food, id) => (
            <FoodItem
              key={id}
              id={food.id}
              name={food.name}
              image={food.image}
              carbs={Math.round(food.carbs)}
              protein={Math.round(food.protein)}
              fat={Math.round(food.fat)}
              calories={food.calories}
              selectedMeal={selectedMeal}
              foodList={foodList}
              onSelect={() => {
                onSelect(food);
              }}
              foodsEaten={foodsEaten}
              isEditable={true}
              onDelete={() => onDelete(food.id)}
            />
          ))}

        {foodsEaten.filter((food) => food.meal === meal).length <= 0 && (
          <p className="p-3 mb-0 text-muted">No foods logged.</p>
        )}
      </div>
    </div>
  );
};

export default MealCard;
