import React from "react";
import PropTypes from "prop-types";
import { AgChartsReact } from "ag-charts-react";

const CryptogramChart = ({ data, title }) => {
  const transformedData = transformData(data);
  const options = {
    container: document.getElementById("myChart"),
    data: transformedData,
    title: {
      text: title,
    },
    series: [
      {
        type: "bar",
        xKey: "title",
        yKey: "Not solved",
        yName: "Not Solved",
      },
      {
        type: "bar",
        xKey: "title",
        yKey: "Solved",
        yName: "Solved",
      },
      {
        type: "bar",
        xKey: "title",
        yKey: "Partially solved",
        yName: "Partially Solved",
      },
    ],
  };

  return <AgChartsReact options={options} />;
};

CryptogramChart.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default CryptogramChart;

const transformData = (data) => {
  return Object.keys(data).map((century) => ({
    title: century,
    "Not solved": data[century]["Not solved"],
    Solved: data[century]["Solved"],
    "Partially solved": data[century]["Partially solved"],
  }));
};
