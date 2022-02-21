import { FC, useEffect, useState } from "react";
import { Food, FoodEaten } from "../types/Food";
import CircularProgress from "./CircularProgress";
import ProgressBar from "./ProgressBar";

export const Chart: FC<{
  foodList: Food[];
  foodsEaten: FoodEaten[];
  calorieBudget: number;
}> = ({ foodList, foodsEaten, calorieBudget }) => {
  const [percentage, setPercentage] = useState<number>(0);
  const [carbsPercentage, setCarbsPercentage] = useState(0);
  const [fatPercentage, setFatPercentage] = useState(0);
  const [proteinPercentage, setProteinPercentage] = useState(0);

  const [carbsPerIndividual, setCarbsPerIndividual] = useState(0);
  const [fatPerIndividual, setFatPerIndividual] = useState(0);
  const [proteinPerIndividual, setProteinPerIndividual] = useState(0);


  let eatenCalories = foodsEaten.reduce(function (acc, obj) {
    return acc + obj.calories;
  }, 0);

  let eatenCarbs = foodsEaten.reduce(function (acc, obj) {
    return acc + obj.carbs;
  }, 0);

  let eatenProtein = foodsEaten.reduce(function (acc, obj) {
    return acc + obj.protein;
  }, 0);

  let eatenFat = foodsEaten.reduce(function (acc, obj) {
    return acc + obj.fat;
  }, 0);

  let macroTotal = eatenCarbs + eatenFat + eatenProtein;
  let carbsTotal = Math.trunc((calorieBudget / 100) * 15);
  let proteinTotal = Math.trunc((calorieBudget / 100) * 4);
  let fatTotal = Math.trunc((calorieBudget / 100) * 3);

  const calculateMacroPercentage = () => {
    let carbsPer = (eatenCarbs / macroTotal) * 100;
    let fatPer = (eatenFat / macroTotal) * 100;
    let proteinPer = (eatenProtein / macroTotal) * 100;

    let carbsPerIndividual = (eatenCarbs / carbsTotal) * 100;
    let fatPerIndividual = (eatenFat / fatTotal) * 100;
    let proteinPerIndividual = (eatenProtein / proteinTotal) * 100;

    setCarbsPercentage(Math.round(carbsPer));
    setFatPercentage(Math.round(fatPer));
    setProteinPercentage(Math.round(proteinPer));

    setCarbsPerIndividual(carbsPerIndividual);
    setFatPerIndividual(fatPerIndividual);
    setProteinPerIndividual(proteinPerIndividual);
  };

  
  const calculatePercentage = () => {
    let percentageTotal = (100 * eatenCalories) / calorieBudget;
    setPercentage(percentageTotal);
  };

  useEffect(() => {
    calculatePercentage();
    calculateMacroPercentage();
  }, [
    percentage,
    eatenCalories,
    macroTotal,
    carbsPercentage,
    fatPercentage,
    proteinPercentage,
    carbsPerIndividual,
    fatPerIndividual,
    proteinPerIndividual,
    calorieBudget
  ]);


  return (
    <div className="card border-0 chart-card d-flex align-items-center shadow-sm mt-4">
      <h6 className="chart-card-title fw-normal">Calorie Budget</h6>
      <span className="calorie-budget fw-bold fs-4 mb-3">{calorieBudget}</span>
      <CircularProgress
        size={200}
        strokeWidth={15}
        eatenCalories={eatenCalories}
        budget={calorieBudget}
        percentage={percentage}
      />
      <div className="nutrition-steps d-flex flex-row justify-content-between gap-3 w-100 mt-4">
        <ProgressBar
          nutrition={"carbs"}
          percentage={carbsPerIndividual}
          total={carbsTotal}
          eaten={eatenCarbs}
          commonPercentage={carbsPercentage}
        />
        <ProgressBar
          nutrition={"protein"}
          percentage={proteinPerIndividual}
          total={proteinTotal}
          eaten={eatenProtein}
          commonPercentage={proteinPercentage}
        />
        <ProgressBar
          nutrition={"fat"}
          percentage={fatPerIndividual}
          total={fatTotal}
          eaten={eatenFat}
          commonPercentage={fatPercentage}
        />
      </div>
    </div>
  );
};

export default Chart;
