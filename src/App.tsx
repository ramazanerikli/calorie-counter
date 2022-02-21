import React, { useEffect, useState } from "react";
import foods from "./foods";
import meals from "./meals";
import { Food, FoodEaten } from "./types/Food";
import ChartCard from "./components/ChartCard";
import MealCard from "./components/MealCard";
import Modal from "./components/Modal";
import CalorieBudget from "./components/CalorieBudget";

import DateSwitcher from "./components/DateSwitcher";

import { v4 as generateUniqueId } from "uuid";
import { CalendarDay } from "./types/Date";

function App() {
  let localFoods;
  if (localStorage.getItem("eatenFoods")) {
    localFoods = JSON.parse(localStorage.getItem("eatenFoods") || "[]");
  } else {
    localFoods = [];
  }

  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  const saveToLocalStorage = (foodsEaten: any) => {
    localStorage.setItem("eatenFoods", JSON.stringify(foodsEaten));
  };

  const [foodList, setFoodList] = useState<Food[]>(foods);
  const [selectedMeal, setSelectedMeal] = useState<string>("");
  const [foodsEaten, setFoodsEaten] = useState<FoodEaten[]>(localFoods);

  const [calorieBudget, setCalorieBudget] = useState<number>(
    Number(localStorage.getItem("calorieBudget") || 2084)
  );

  const today = new Date();
  const [selectedDay, setSelectedDay] = useState<CalendarDay>([
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  ]);

  const filteredFoodsEaten = foodsEaten.filter((food) => {
    const foodDate = new Date();
    foodDate.setFullYear(food.date[0]);
    foodDate.setMonth(food.date[1]);
    foodDate.setDate(food.date[2]);

    const today = new Date();
    today.setMonth(selectedDay[1]);
    today.setFullYear(selectedDay[0]);
    today.setDate(selectedDay[2]);

    const yesterday = new Date();
    yesterday.setMonth(selectedDay[1]);
    yesterday.setFullYear(selectedDay[0]);
    yesterday.setDate(selectedDay[2]);
    yesterday.setDate(yesterday.getDate() - 1);

    return foodDate <= today && foodDate > yesterday;
  });
  return (
    <div className="app">
      <div className="container">
          <div className="app-header shadow-sm bg-white mt-4">
            <div className="row">
              <div className="col-lg-5">
                <DateSwitcher
                  selectedDay={selectedDay}
                  goToNextDay={() => {
                    const today = new Date();
                    today.setMonth(selectedDay[1]);
                    today.setFullYear(selectedDay[0]);
                    today.setDate(selectedDay[2]);
                    today.setDate(today.getDate() + 1);
                    const tomorrow: CalendarDay = [
                      today.getFullYear(),
                      today.getMonth(),
                      today.getDate(),
                    ];
                    setSelectedDay(tomorrow);
                  }}
                  goToPreviousDay={() => {
                    const today = new Date();
                    today.setMonth(selectedDay[1]);
                    today.setFullYear(selectedDay[0]);
                    today.setDate(selectedDay[2]);
                    today.setDate(today.getDate() - 1);
                    const yesterday: CalendarDay = [
                      today.getFullYear(),
                      today.getMonth(),
                      today.getDate(),
                    ];
                    setSelectedDay(yesterday);
                  }}
                />
              </div>
              <div className="col-lg-7">
                <CalorieBudget
                  calorieBudget={calorieBudget}
                  onChange={(event) => {
                    const value = event.target.value;
                    setCalorieBudget(Number(value));
                    localStorage.setItem("calorieBudget", value);
                  }}
                />
              </div>
            </div>
          </div>

        <div className="row">
          <div className="col-lg-5">
            <ChartCard
              foodList={foodList}
              foodsEaten={filteredFoodsEaten}
              calorieBudget={calorieBudget}
            />
          </div>
          <div className="col-lg-7">
            {meals.map((meal, id) => (
              <MealCard
                key={id}
                meal={meal.name}
                foodList={foodList}
                foodsEaten={filteredFoodsEaten}
                selectedMeal={selectedMeal}
                onSelect={(food) => {
                  setSelectedMeal(meal.name);
                  setSelectedFood(food);
                }}
                onDelete={(id) => {
                  const foodsEatenUpdated = foodsEaten.filter(
                    (food) => food.id !== id
                  );
                  setFoodsEaten(foodsEatenUpdated);
                  saveToLocalStorage(foodsEatenUpdated);
                }}
              />
            ))}
            <Modal
              onSelectFood={setSelectedFood}
              selectedFood={selectedFood}
              selectedDay={selectedDay}
              onProcess={(foodEaten) => {
                const foodsEatenNew = [
                  ...foodsEaten,
                  {
                    ...foodEaten,
                    id: generateUniqueId(),
                    calories: foodEaten.calories * foodEaten.quantity,
                    carbs: foodEaten.carbs * foodEaten.quantity,
                    protein: foodEaten.protein * foodEaten.quantity,
                    fat: foodEaten.fat * foodEaten.quantity,
                  },
                ];
                setFoodsEaten(foodsEatenNew);
                saveToLocalStorage(foodsEatenNew);
              }}
              foodList={foodList}
              selectedMeal={selectedMeal}
              foodsEaten={filteredFoodsEaten}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
