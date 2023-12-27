import React from "react";
import PropTypes from "prop-types";
import { AgChartsReact } from "ag-charts-react";

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
        yKey: "cipher_count",
        yName: "Cipher",
      },
      {
        type: "bar",
        xKey: "title",
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
