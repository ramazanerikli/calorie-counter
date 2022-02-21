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

function App() {
  let localFoods;
  if (localStorage.getItem("eatenFoods")) {
    localFoods = JSON.parse(localStorage.getItem("eatenFoods") || "[]");
  } else {
    localFoods = [];
  }

  const [selectedFood, setSelectedFood] = useState<Food|null>(null);

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
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);

  const [selectedDay, setSelectedDay] = useState(Number(today));

  const nextDay = new Date(selectedDay);
  nextDay.setDate(nextDay.getDate() + 1);

  const filteredFoodsEaten = foodsEaten.filter(
    (foodEaten) =>
      foodEaten.date > selectedDay && foodEaten.date < Number(nextDay)
  );

  return (
    <div className="app pt-4">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <DateSwitcher
              selectedDay={selectedDay}
              getNextDate={() => {
                const date = new Date(selectedDay);
                date.setDate(date.getDate() + 1);
                setSelectedDay(Number(date));
              }}
              getPrevDate={() => {
                const date = new Date(selectedDay);
                date.setDate(date.getDate() - 1);
                setSelectedDay(Number(date));
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
                  setSelectedMeal(meal.name)
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
                console.log(new Date(selectedDay))
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
