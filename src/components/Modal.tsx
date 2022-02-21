import React, { FC, useState, useEffect } from "react";
import { Food, FoodEaten } from "../types/Food";
import FoodItem from "./FoodItem";
import DonutChart from "./DonutChart";
import { CalendarDay } from "../types/Date";

export const Modal: FC<{
  foodList: Food[];
  selectedMeal: string;
  foodsEaten: FoodEaten[];
  selectedDay: CalendarDay;
  onProcess: (foodEaten: FoodEaten) => void;
  selectedFood: Food|null;
  onSelectFood: (food: Food) => void;
}> = ({ foodList, selectedMeal, onProcess, foodsEaten, selectedFood, onSelectFood, selectedDay }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [showFilteredFoods, setShowFilteredFoods] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowFilteredFoods(true);
    if (e.target.value === "") {
      setShowFilteredFoods(false);
    }
  };


  const filteredFoods = foodList.filter((entry) =>
    Object.values(entry).some(
      (val) => typeof val === "string" && val.includes(searchQuery)
    )
  );

  return (
    <>
      <div
        className="modal fade"
        id="searchModal"
        aria-hidden="true"
        aria-labelledby="searchModalLabel"
        tabIndex={-1}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0">
            <div className="modal-header">
              <h5 className="modal-title" id="searchModalLabel">
                Search Food
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="search-form">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type and search a food..."
                  value={searchQuery}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="search-content" style={{ minHeight: 200 }}>
                {showFilteredFoods && (
                  <div className="food-list mt-3">
                    {filteredFoods.map((food, id) => (
                      <FoodItem
                        key={id}
                        onSelect={() => {
                          onSelectFood(food);
                        }}
                        id={food.id}
                        name={food.name}
                        image={food.image}
                        carbs={Math.round(food.carbs)}
                        protein={Math.round(food.protein)}
                        fat={Math.round(food.fat)}
                        calories={food.calories}
                        selectedMeal={selectedMeal}
                        foodList={foodList}
                        foodsEaten={foodsEaten}
                        isEditable={false}
                        onDelete={() => {}}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="foodModal"
        aria-hidden="true"
        aria-labelledby="FoodModalLabel"
        tabIndex={-1}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0">
            <div className="modal-header">
              {selectedFood && (
                <img src={selectedFood.image} width="45" height="45" />
              )}
              <h5 className="modal-title text-capitalize ms-2" id="foodModal">
                {selectedFood && selectedFood.name}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {selectedFood && (
                <div className="d-flex align-items-center">
                  <div style={{ flex: 1 }}>
                    <div className="nutrition-detail carbs">
                      Carbs:{" "}
                      <span>{Math.round(selectedFood.carbs * quantity)}g</span>
                    </div>
                    <div className="nutrition-detail protein">
                      Protein:{" "}
                      <span>
                        {Math.round(selectedFood.protein * quantity)}g
                      </span>
                    </div>
                    <div className="nutrition-detail fat">
                      Fat:{" "}
                      <span>{Math.round(selectedFood.fat * quantity)}g</span>
                    </div>
                  </div>
                  <div
                    style={{ flex: 1 }}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <DonutChart
                      selectedFood={selectedFood}
                      quantity={quantity}
                    />
                  </div>
                </div>
              )}

              <div className="d-flex food-detail-options mt-3 gap-4">
                <div className="d-flex flex-column">
                  Quantity:
                  <input
                    className="form-control"
                    type="number"
                    value={quantity}
                    onChange={(event) =>
                      setQuantity(Number(event.target.value))
                    }
                    min={1}
                    max={100}
                  />
                </div>
                <div className="d-flex flex-column">
                  Serving unit
                  <select
                    className="form-select form-select-md mb-1"
                    aria-label=".form-select-md example"
                  >
                    <option>Portion</option>
                    <option value="1">Slice</option>
                    <option value="2">Each</option>
                    <option value="3">Teaspoon</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => {
                  if (selectedFood) {
                    const foodEaten: FoodEaten = {
                      ...selectedFood,
                      meal: selectedMeal || "breakfast",
                      quantity,
                      date: selectedDay,
                    };
                    onProcess(foodEaten);
                    setQuantity(1);
                  }
                }}
                className="btn btn-success w-100"
                data-bs-dismiss="modal"
              >
                Add Food
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
