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

const CryptogramOneChart = ({ data, title }) => {
  const options = {
    container: document.getElementById("myChart"),
    data,
    title: {
      text: title,
    },
    series: [
      {
        type: "bar",
        xKey: "title",
        tooltip: { renderer: renderer },
        yKey: "cryptograms_count",
        yName: "Cryptogram",
      },
    ],
  };

  return <AgChartsReact options={options} />;
};

CryptogramOneChart.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default CryptogramOneChart;
