import { FC, useEffect, useState } from "react";
import { Food, FoodEaten } from "../types/Food";
import { FaGripLinesVertical } from "react-icons/fa";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import foods from "../foods";

export const FoodItem: FC<{
  foodList: Food[];
  id: string;
  name: string;
  image: string;
  carbs: number;
  protein: number;
  fat: number;
  calories: number;
  selectedMeal: string;
  foodsEaten: FoodEaten[];
  isEditable: boolean;
  onDelete: () => void;

  onSelect: () => void;
}> = ({
  name,
  image,
  id,
  protein,
  fat,
  calories,
  carbs,
  onSelect,
  foodsEaten,
  isEditable,
  onDelete,
}) => {
  const [swiped, setSwiped] = useState(false);

  const swipe = () => {
    setSwiped(!swiped);
  };

  const removeFood = (id: string) => {
    onDelete();
  };

  return (
    <>
      <div className="food-item d-flex align-items-center justify-content-between">
        <div
          className="food-item-clickable d-flex align-items-center justify-content-between w-100"
          data-bs-target="#foodModal"
          data-bs-toggle="modal"
          onClick={() => onSelect()}
        >
          <div
            className="d-flex align-items-center gap-3 food-item-left"
            style={{ marginRight: "auto" }}
          >
            <img src={image} alt={name + " icon"} width={35} height={35} />
            <span className="text-capitalize">{name}</span>
          </div>
          <div className="d-flex align-items-center">
            <span className="food-nutrition carbs">{carbs}g</span>
            <span className="food-nutrition protein">{protein}g</span>
            <span className="food-nutrition fat">{fat}g</span>
            <span className="food-nutrition calories">{calories}</span>
          </div>
        </div>

        {isEditable && (
          <div className="d-flex" style={{ height: 55 }}>
            <button
              className="btn btn-white btn-swipe shadow-none"
              onClick={() => swipe()}
            >
              <FaGripLinesVertical color="#ccc" size="0.8rem" />
            </button>
            <button
              className={
                swiped
                  ? "btn btn-danger remove-btn shadow-none swiped"
                  : "btn btn-danger remove-btn shadow-none"
              }
              onClick={() => removeFood(id)}
            >
              <IoIosRemoveCircleOutline />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default FoodItem;
