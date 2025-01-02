import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { RootState, useAppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import { fetchMonthlyRequestStatistics } from "@/redux/actions/quoteAction";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface QuoteData {
  month: string; 
  count: string; 
}

const ChartOne: React.FC = () => {
  const dispatch = useAppDispatch();
  const quotesByMonth = useSelector((state: RootState) => state.quote.monthlyRequest) as QuoteData[];
  const [series, setSeries] = useState([{ name: "Quotes", data: [] as number[] }]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchMonthlyRequestStatistics());
  }, [dispatch]);

  useEffect(() => {
    if (quotesByMonth?.length > 0) {
      // Map the data directly from quotesByMonth
      const formattedData = quotesByMonth.map((quote) => ({
        x: new Date(quote.month).toLocaleString("en-US", { month: "short", year: "numeric" }),
        y: parseInt(quote.count, 10),
      }));

      setSeries([{ name: "Quotes", data: formattedData.map((d) => d.y) }]);
      setCategories(formattedData.map((d:any) => d.x));
    }
  }, [quotesByMonth]);

  const options: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#3C50E0", "#80CAEE"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 335,
      type: "area",
      dropShadow: {
        enabled: true,
        color: "#623CEA14",
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },
      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: "straight",
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: "#fff",
      strokeColors: ["#3056D3", "#80CAEE"],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: "category",
      categories: categories, // Utilisation des catégories dynamiques
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
      min: 0,
      max: Math.max(...series[0].data, 10), // Ajuste dynamiquement le max
    },
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-7">
      <div className="flex min-w-47.5">
        <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
          <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
        </span>
        <div className="w-full">
          <p className="font-semibold text-primary">Total Quotes</p>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;