import React from "react";
import HighchartsReact from "highcharts-react-official";
import theme from "../../theme";
import Highcharts from "highcharts";
import { Typography, Box, Skeleton } from "@mui/material";
import { StockValueInterface, StockMetaInterface } from "../../types";

interface ChartProps {
  isLoading: boolean;
  stock: StockMetaInterface | undefined;
  values: StockValueInterface[] | undefined;
}

const Chart: React.FC<ChartProps> = ({ isLoading, stock, values }) => {
  if (isLoading) {
    return (
      <Box mt={5} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <Skeleton variant="rectangular" height={350} width="100%" />
      </Box>
    );
  }

  if (!values || values.length === 0 || !stock) {
    return (
      <Box
        mt={5}
        sx={{ display: "flex", justifyContent: "center", height: 350 }}
      >
        <Typography variant="body1" color="textSecondary">
          No data available
        </Typography>
      </Box>
    );
  }

  const { currency, symbol } = stock;

  const formattedData = values
    .map((value) => [
      new Date(value.datetime).getTime(),
      parseFloat(value.close),
    ])
    .sort((a, b) => a[0] - b[0]);

  const options: Highcharts.Options = {
    title: {
      text: `Stock Price`,
      style: {
        fontSize: "18px",
      },
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    chart: {
      type: "line",
      backgroundColor: "#ffffff",
      borderRadius: 10,
      borderColor: "#a6b4f4",
      borderWidth: 1,
    },
    rangeSelector: {
      selected: 1,
    },
    xAxis: {
      type: "datetime",
    },
    yAxis: {
      title: {
        text: `Price (${currency})`,
        margin: 20,
      },
      gridLineColor: "#ddd",
    },
    series: [
      {
        type: "line",
        name: symbol,
        data: formattedData,
        color: theme.palette.primary.main,
        lineWidth: 2,
        marker: {
          enabled: true,
          radius: 4,
          fillColor: "#fff",
          lineColor: "#007bff",
          lineWidth: 2,
        },
        tooltip: {
          valueDecimals: 2,
        },
      },
    ],
  };

  return (
    <Box mt={5}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Box>
  );
};

export default Chart;
