import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const LineChart = ({ data, options }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options,
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data, options]);

  return <canvas ref={chartRef}></canvas>;
};

export default LineChart;
