import React from "react";
import PropTypes from "prop-types";
import { AgChartsReact } from "ag-charts-react";

function renderer({ datum, xKey, yKey, yName }) {
  return {
    title: datum[xKey],
    content: `${yName}: ${datum[yKey].toFixed(0)}`,
  };
}

const CipherOneChart = ({ data, title, type }) => {
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
        yName: type,
      },
    ],
  };

  return <AgChartsReact options={options} />;
};

CipherOneChart.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default CipherOneChart;
