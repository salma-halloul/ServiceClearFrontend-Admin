"use client";

import { ApexOptions } from "apexcharts";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { RootState, useAppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import { countCategoriesInQuotes } from "@/redux/actions/categoryAction";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ChartTwo: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useSelector((state: RootState) => state.category.categoriesInQuotes);


  useEffect(() => {
    dispatch(countCategoriesInQuotes());
  }, [dispatch]);

  const categoryNames = categories.map((category) => category.name);
  const categoryCounts = categories.map((category) => category.count);


  const options: ApexOptions = {
    chart: {
      type: 'bar',
    },
    xaxis: {
      categories: categoryNames,
    },
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',
    },
  };

  const series = [
    {
      name: 'Categories in Quotes',
      data: categoryCounts,
    },
  ];

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Categories in Quotes
          </h4>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-mb-9 -ml-5">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;