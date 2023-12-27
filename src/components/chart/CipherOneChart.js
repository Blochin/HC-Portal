import React from "react";
import PropTypes from "prop-types";
import { AgChartsReact } from "ag-charts-react";

const CipherOneChart = ({ data, title }) => {
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
        yName: "",
      },
    ],
  };

  return <AgChartsReact options={options} />;
};

CipherOneChart.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default CipherOneChart;
