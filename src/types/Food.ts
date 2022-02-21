import { CalendarDay } from "./Date";

export type Food = {
    id: string;
    name: string;
    image: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };

  export type FoodEaten = Food & {
    meal: string;
    quantity: number;
    date: CalendarDay;
  };
