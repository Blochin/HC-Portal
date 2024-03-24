import React from "react";
import PropTypes from "prop-types";
import { AgChartsReact } from "ag-charts-react";

function renderer({ datum, xKey, yKey, yName }) {
  return {
    title: datum[xKey],
    content: `${yName}: ${datum[yKey].toFixed(0)}`,
  };
}
const GlobalChart = ({ data, title }) => {
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
        yKey: "cipher_count",
        yName: "Cipher Key",
      },
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
GlobalChart.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};
export default GlobalChart;
