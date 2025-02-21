"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useEffect, useRef } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ChartOne from "@/components/Charts/ChartOne";
import ChartTwo from "@/components/Charts/ChartTwo";
import ChartThree from "@/components/Charts/ChartThree";
import CardDataStats from "@/components/Charts/CardDataStats";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/redux/store";
import { fetchContacts } from "@/redux/actions/contactAction";
import { fetchQuotes } from "@/redux/actions/quoteAction";
import { fetchReviews } from "@/redux/actions/reviewAction";
import { fetchServices } from "@/redux/actions/serviceAction";


const BasicChartPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const services = useSelector((state: RootState) => state.service.services);
    const quotes = useSelector((state: RootState) => state.quote.quotes);
    const messages = useSelector((state: RootState) => state.contact.contacts);
    const reviews = useSelector((state: RootState) => state.review.reviews);
    const totalServices = services.length;
    const totalQuotes = useSelector((state: RootState) => state.quote.quotes.length);
    const totalMessages = useSelector((state: RootState) => state.contact.contacts.length);
    const totalReviews = useSelector((state: RootState) => state.review.reviews.length);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (!hasFetched.current) {
            if (services.length === 0) dispatch(fetchServices());
            if (quotes.length === 0) dispatch(fetchQuotes());
            if (messages.length === 0) dispatch(fetchContacts());
            if (reviews.length === 0) dispatch(fetchReviews());

            hasFetched.current = true;
        }
    }, [dispatch, services, quotes, messages, reviews]);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Dashboard" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                <CardDataStats title="Total Services" total={totalServices}>
                    <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        className="fill-primary dark:fill-white"
                        width="25"
                        height="19"
                    >
                        <g id="SVGRepo_iconCarrier">
                            <g>
                                <path
                                    d="M22 3H2v6h1v11c0 1.105.895 2 2 2h14c1.105 0 2-.895 2-2V9h1V3zM4 5h16v2H4V5zm15 15H5V9h14v11zM9 11h6c0 1.105-.895 2-2 2h-2c-1.105 0-2-.895-2-2z">
                                </path>
                            </g>
                        </g>
                    </svg>

                </CardDataStats>
                <CardDataStats title="Total Quotes" total={totalQuotes}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 2048 2048"
                        className="stroke-primary dark:stroke-white fill-primary dark:fill-white"
                        width="20"
                        height="22"
                        strokeWidth="50"
                    >
                        <path
                            transform="translate(520,296)"
                            d="m0 0h983l23 1 4 5 9 16 16 27 8 14 56 96 16 27 12 21 16 27 12 21 16 27 15 26 56 96 10 17 14 24 11 19 10 17 16 27 12 21 16 27 12 21 16 27 12 21 16 27 12 21v620l-2 19-3 16-8 24-10 20-11 16-9 11-15 15-14 11-20 12-16 7-18 6-21 4-9 1h-1477l-22-3-15-4-17-6-16-8-13-8-12-9-12-11-8-8-13-17-9-15-9-19-6-20-3-14-2-19v-621l14-25 10-17 12-21 28-48 12-21 15-26 16-27 13-23 15-26 28-48 16-28 28-48 16-28 15-26 10-17 15-26 12-21 10-17 14-24 16-28 28-48 16-28 14-24 14-25zm50 90-10 17-12 20-6 11-14 24-8 13-6 11-10 17-17 29-15 26-13 22-14 24-10 17-56 96-11 19-13 22-15 25-6 11-14 24-13 22-15 26-13 22-10 17-21 36v1l146 1 20 2 16 3 21 7 19 9 14 9 13 10 15 14 11 14 7 10 9 16 8 20 5 18 3 20 1 22 1 81h937l1-89 2-22 5-23 6-17 9-19 11-17 9-11 3-3v-2h2l6-7 11-9 11-8 15-9 18-8 15-5 18-4 18-2 149-1-6-11-12-21-26-44-17-29-15-25-17-29-16-27-17-29-15-25-15-26-12-20-17-29-13-22-17-29-9-15-17-29-17-28-13-23-9-15-17-29-15-25-12-21-1-1zm-354 638-1 8v538l1 24 4 16 8 16 10 13 11 10 14 8 16 6 11 2h1468l17-3 15-6 10-6 10-8 7-7 9-14 6-14 3-13 1-12v-557l-1-1h-176l-16 2-13 4-14 7-10 8-6 5-9 12-8 16-4 12-1 6-1 22-1 161-1109 1v-177l-2-14-5-15-7-13-8-10-7-7-13-9-16-7-14-3-10-1z"
                        />
                    </svg>
                </CardDataStats>
                <CardDataStats title="Total Messages" total={totalMessages}>
                    <svg
                        fill="none"
                        viewBox="0 0 32 32"
                        className="stroke-primary dark:stroke-white fill-primary dark:fill-white"
                        width="17"
                        height="17"
                        strokeWidth="1.5"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g id="SVGRepo_iconCarrier">
                            <path d="M30 1.25h-28c-0.414 0-0.75 0.336-0.75 0.75v0 22c0 0.414 0.336 0.75 0.75 0.75h11.75l7.801 5.85c0.123 0.094 0.28 0.15 0.449 0.15 0.123 0 0.238-0.030 0.34-0.082l-0.004 0.002c0.247-0.126 0.414-0.378 0.414-0.67v0-5.25h7.25c0.414-0 0.75-0.336 0.75-0.75v0-22c-0-0.414-0.336-0.75-0.75-0.75v0zM29.25 23.25h-7.25c-0.414 0-0.75 0.336-0.75 0.75v0 4.5l-6.8-5.1c-0.124-0.094-0.28-0.15-0.45-0.15h-11.25v-20.5h26.5z"></path>
                        </g>
                    </svg>
                </CardDataStats>
                <CardDataStats title="Total Reviews" total={totalReviews}>
                    <svg
                        className="stroke-primary dark:stroke-white fill-primary dark:fill-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 2048 2048"
                        width="18"
                        height="19"
                        strokeWidth="130"
                    >
                        <path transform="translate(1020,81)" d="m0 0 16 1 13 4 11 6 10 9 7 8 11 21 11 25 20 45 19 42 36 80 13 29 20 45 19 42 18 40 16 36 19 42 17 38 18 40 13 29 5 9 1 3 4 2 8 3 462 56 114 14 18 3 13 5 12 8 8 8 9 14 5 15 1 5v17l-4 15-6 12-8 10-16 16h-2v2l-8 7-9 9-8 7-11 11h-2v2l-8 7-10 10-8 7-12 12-8 7-9 9h-2v2l-8 7-11 11-8 7-14 14-8 7-10 10h-2v2l-8 7-9 9-8 7-11 11h-2v2l-8 7-10 10-8 7-12 12-8 7-9 9h-2v2l-8 7-11 11-8 7-14 14-8 7-10 10h-2v2l-8 7-9 9-8 7-11 11-8 7-12 12-8 7-10 10h-2v2l-8 7-9 9-8 7-7 8-3 8v9l14 73 42 217 14 72 19 99 14 71 12 62v23l-4 13-7 13-12 13-13 8-14 5-5 1h-19l-14-4-19-10-24-14-26-15-28-16-52-30-24-14-56-32-52-30-28-16-24-14-56-32-24-14-56-32-24-14-23-13-8-4-4-1h-8l-16 8-27 16-18 10-24 14-28 16-26 15-28 16-24 14-23 13-24 14-26 15-56 32-19 11-26 15-49 28-26 15-21 12-26 15-35 20-10 4-9 2h-20l-13-4-12-6-13-12-8-11-6-15-2-10v-11l4-24 11-57 14-72 16-82 19-99 16-82 17-88 9-45 7-37 3-18-1-9-3-6-8-9-8-7-13-13-8-7-17-17-8-7-12-12-8-7-17-16-10-10-8-7-15-15-2-1v-2l-4-2-13-13-8-7-9-9-8-7-11-11-8-7-15-15-8-7-13-13-8-7-16-15-10-10-8-7-15-15-2-1v-2l-4-2-13-13-8-7-9-9-8-7-11-11-8-7-15-15-8-7-12-12-8-7-17-16-10-10-8-7-11-11-9-14-5-13-1-5v-20l4-15 9-16 4-5 8-7 10-6 12-5 27-4 379-46 181-22 14-3 8-7 10-21 11-25 36-80 39-87 18-40 13-29 16-36 19-42 9-20 13-29 18-40 13-29 16-36 15-33 9-17 10-11 14-9 15-5zm1 42-7 2-8 7-14 29-14 32-18 40-9 21-7 15-12 26-12 27-13 29-19 42-16 36-9 21-7 15-12 26-18 41-16 35-16 36-18 40-15 33-8 16-8 11-8 7-11 6-7 3-22 4-98 12-132 16-329 40-20 3-6 3-6 7-3 9v9l4 8 9 10 16 15 17 16 9 9h2v2l8 7 10 10h2v2l8 7 8 8 8 7 12 12 8 7 13 13 8 7 9 9h2v2l8 7 10 10 8 7 12 12 8 7 15 15 8 7 9 9h2v2l8 7 8 8 8 7 12 12 8 7 13 13 8 7 9 9h2v2l8 7 10 10 8 7 12 12 8 7 15 15 8 7 9 9h2v2l8 7 9 9 8 7 9 9 8 7 13 13 6 9 6 12 3 12v18l-13 68-10 51-14 72-20 104-10 51-19 98-13 67-16 83v14l4 8 9 7 10 2 11-4 25-14 17-10 26-15 28-16 24-14 28-16 26-15 14-8 24-14 23-13 24-14 77-44 24-14 26-15 28-16 52-30 49-28 14-5 7-1h15l13 3 16 8 28 16 24 14 28 16 26 15 28 16 52 30 28 16 52 30 28 16 104 60 28 16 26 15 24 14 28 16 12 5 7-1 10-5 6-8 1-4v-12l-12-63-16-82-25-129-28-144-25-129-8-41-1-7v-19l5-16 6-11 1-3h2l7-8 15-15 8-7 10-10 2-1v-2l4-2 14-14 8-7 9-9 8-7 13-13 8-7 13-13 8-7 11-11 2-1v-2l4-2 13-13 8-7 13-13 8-7 13-13 8-7 9-9 2-1v-2l4-2 11-11 8-7 13-13 8-7 13-13 8-7 11-11 2-1v-2l4-2 13-13 8-7 13-13 8-7 12-12 8-7 10-10 2-1v-2l4-2 11-11 8-7 13-13 2-1v-2l4-2 15-15 7-6 5-7 2-8-1-10-4-8-6-5-9-3-550-67-39-5-15-5-11-7-7-6-9-12-13-27-18-41-19-42-13-29-18-40-13-29-16-36-16-35-16-36-10-23-7-15-19-42-16-36-19-42-16-36-18-40-6-11-7-6-7-2z" />
                    </svg>
                </CardDataStats>
            </div>
            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                <ChartOne />
                <ChartThree />
                <ChartTwo />

            </div>
        </DefaultLayout>
    );
};

export default BasicChartPage;
