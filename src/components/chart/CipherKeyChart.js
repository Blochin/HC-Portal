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
        yKey: "D",
        yName: "D",
      },
      {
        type: "bar",
        xKey: "title",
        yKey: "G",
        yName: "G",
      },
      {
        type: "bar",
        xKey: "title",
        yKey: "L",
        yName: "L",
      },
      {
        type: "bar",
        xKey: "title",
        yKey: "M",
        yName: "M",
      },
      {
        type: "bar",
        xKey: "title",
        yKey: "N",
        yName: "N",
      },
      {
        type: "bar",
        xKey: "title",
        yKey: "s",
        yName: "S",
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
    L: data[century]["L"],
    S: data[century]["S"],
    N: data[century]["N"],
    D: data[century]["D"],
    M: data[century]["M"],
    G: data[century]["G"],
  }));
};
