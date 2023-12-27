import React from "react";
import PropTypes from "prop-types";
import { AgChartsReact } from "ag-charts-react";

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
        yKey: "cryptograms_count",
        yName: "",
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
