import React from "react";
import PropTypes from "prop-types";
import { AgChartsReact } from "ag-charts-react";

function renderer({ datum, xKey, yKey, yName }) {
  const content = datum[yKey] !== undefined ? datum[yKey].toFixed(0) : "0";
  return {
    title: datum[xKey],
    content: `${yName}: ${content}`,
  };
}

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
        tooltip: { renderer: renderer },
        yKey: "D",
        yName: "Double Letters",
      },
      {
        type: "bar",
        xKey: "title",
        tooltip: { renderer: renderer },
        yKey: "G",
        yName: "String",
      },
      {
        type: "bar",
        xKey: "title",
        tooltip: { renderer: renderer },
        yKey: "L",
        yName: "Letters",
      },
      {
        type: "bar",
        xKey: "title",
        tooltip: { renderer: renderer },
        yKey: "M",
        yName: "Markups",
      },
      {
        type: "bar",
        xKey: "title",
        tooltip: { renderer: renderer },
        yKey: "N",
        yName: "Numbers",
      },
      {
        type: "bar",
        xKey: "title",
        tooltip: { renderer: renderer },
        yKey: "s",
        yName: "Symbol",
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
