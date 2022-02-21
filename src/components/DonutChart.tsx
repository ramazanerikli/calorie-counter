import { FC, useEffect, useState } from "react";
import { Food, FoodEaten } from "../types/Food";

export const DonutChart: FC<{
  selectedFood: Food;
  quantity: number;
}> = ({ selectedFood, quantity }) => {
  var total = selectedFood.carbs + selectedFood.protein + selectedFood.fat;

  const [dataTotal, setDataTotal] = useState(0);
  const [data1, setData1] = useState(0);
  const [data2, setData2] = useState(0);
  const [data3, setData3] = useState(0);

  var carbs = (selectedFood.carbs / total) * 100;
  var protein = (selectedFood.protein / total) * 100;
  var fat = (selectedFood.fat / total) * 100;

  const [offset, setOffset] = useState(25);

  useEffect(() => {
    setDataTotal(total);
    setData1(carbs);
    setData2(protein);
    setData3(fat);
  }, [total, carbs, protein, fat]);

  return (
    <div>
      <svg className="donut" width="200" height="100%" viewBox="0 0 42 42">
        <circle
          className="donut-hole"
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill="#fff"
        ></circle>

        <circle
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill="transparent"
          stroke={"#eb5350"}
          strokeWidth="3"
          strokeDasharray="0 100"
          strokeDashoffset="25"
          style={{
            strokeDasharray: data1 + " " + (100 - data1),
            strokeDashoffset: offset,
          }}
        ></circle>

        <circle
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill="transparent"
          stroke="#3b77b1"
          strokeWidth="3"
          strokeDasharray="0 100"
          strokeDashoffset="25"
          style={{
            strokeDasharray: data2 + " " + (100 - data2),
            strokeDashoffset: 100 - data1 + offset,
          }}
        ></circle>

        <circle
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill="transparent"
          stroke="#ec9e31"
          strokeWidth="3"
          strokeDasharray="0 100"
          strokeDashoffset="25"
          style={{
            strokeDasharray: data3 + " " + (100 - data3),
            strokeDashoffset: 100 - (data1 + data2) + offset,
          }}
        ></circle>

        <g className="chart-text">
          <text
            x="50%"
            y="47%"
            className="chart-number"
            id="totalValue"
            fontSize={".6em"}
            dominantBaseline="middle"
            textAnchor="middle"
          >
            {selectedFood.calories * quantity}
          </text>
          <text
            x="51%"
            y="68%"
            className="chart-label"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize={".2em"}
          >
            Kcal
          </text>
        </g>
      </svg>
    </div>
  );
};

export default DonutChart;
