"use client"

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { RootState, useAppDispatch } from "@/redux/store";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {  fetchQuotes, updateQuote, updateQuoteReadStatus } from "@/redux/actions/quoteAction";
import { Service } from "@/types/service";
import { Quote } from "@/types/quote";
import { Modal } from "flowbite-react";

const QuotesPage = () => {
    const dispatch = useAppDispatch();
    const { quotes, error } = useSelector((state: RootState) => state.quote);
    const [statusFilter, setStatusFilter] = useState('all');
    const [editingStatusId, setEditingStatusId] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [sortMessage, setSortMessage] = useState('desc');
    const [searchTerm, setSearchTerm] = useState('');
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState<Quote | null>(null);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (!hasFetched.current) {
            dispatch(fetchQuotes());
            hasFetched.current = true;
        }
    }, [dispatch]);

    const handleStatusClick = (quoteId: string, currentStatus: string) => {
        setEditingStatusId(quoteId);
        setSelectedStatus(currentStatus);
    };

    const handleStatusChange = (quoteId: string, newStatus: string) => {
        try {
            dispatch(updateQuote({ quoteId: quoteId, status: newStatus }));
            toast.success('Quote status updated successfully!');
        }catch (error) {
            toast.error('Failed to update quote status. Please try again !');
        }
        setEditingStatusId(null);
    };

    
  const handleMessageClick = (quote: Quote) => {
    if (!quote.read) {
        dispatch(updateQuoteReadStatus({ id: quote.id, read: true })); 
    }
    setModalMessage(quote);
    setIsMessageModalOpen(true);
  };
    
    const handleFilterByStatus = (status: string) => {
        setStatusFilter(status);
    };



    const sortedQuotes = [...quotes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const filteredQuotes = sortedQuotes
    .filter((quote) => {
        const matchesSearchTerm = quote.name.toLowerCase().includes(searchTerm.toLowerCase()) || String(quote.id).toLowerCase().includes(searchTerm.toLowerCase()); 
        const matchesStatusFilter = statusFilter === 'all' || quote.status === statusFilter;
        return matchesSearchTerm && matchesStatusFilter;
    })  
    .sort((a, b) => {
        if (sortMessage === 'desc') {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        } else {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }});

   
    return (
        <DefaultLayout>
            <Breadcrumb pageName="All quotes" />
            {error && error !== "Quotes already up-to-date" && (
                <div className="text-red-500 mb-3">
                    {error}
                    {/* {typeof error === 'string' ? error : JSON.stringify(error)} */}
                </div>
            )}
            <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="max-w-full overflow-x-auto">
                    <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
                        <div className="w-full lg:w-1/3 mb-4 lg:mb-0">
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="px-4 py-2 border rounded-md w-full"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2 items-center">
                            <button
                                onClick={() => handleFilterByStatus('all')}
                                className={`lg:px-4 lg:py-2 px-2 py-1 text-xs dark:text-black lg:text-sm font-sans font-semibold rounded ${statusFilter === 'all' ? 'bg-gray-300' : 'bg-gray-100 hover:bg-gray-200'}`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => handleFilterByStatus('Pending')}
                                className={`lg:px-4 lg:py-2 px-2 py-1 text-xs dark:text-black lg:text-sm font-sans font-semibold rounded ${statusFilter === "Pending" ? 'bg-yellow-300' : 'bg-gray-100 hover:bg-gray-200'}`}
                            >
                                Pending
                            </button>
                            <button
                                onClick={() => handleFilterByStatus("Approved")}
                                className={`lg:px-4 lg:py-2 px-2 py-1 text-xs dark:text-black lg:text-sm font-sans font-semibold rounded ${statusFilter === "Approved" ? 'bg-green-300' : 'bg-gray-100 hover:bg-gray-200'}`}
                            >
                                Approved
                            </button>
                            <button
                                onClick={() => handleFilterByStatus("Completed")}
                                className={`lg:px-4 lg:py-2 px-2 py-1 text-xs dark:text-black lg:text-sm font-sans font-semibold rounded ${statusFilter === "Completed" ? 'bg-blue-300' : 'bg-gray-100 hover:bg-gray-200'}`}
                            >
                                Completed
                            </button>
                            <button
                                onClick={() => handleFilterByStatus("Rejected")}
                                className={`lg:px-4 lg:py-2 px-2 py-1 text-xs dark:text-black lg:text-sm font-sans font-semibold rounded ${statusFilter === "Rejected" ? 'bg-red-300' : 'bg-gray-100 hover:bg-gray-200'}`}
                            >
                                Rejected
                            </button>
                            <select
                                value={sortMessage}
                                onChange={(e) => setSortMessage(e.target.value)}
                                className="rounded-full bg-opacity-10 px-3 py-1 text-xs lg:text-sm lg:font-medium xl:font-medium font-normal border"
                            >
                                <option value="desc">Recent</option>
                                <option value="asc">Oldest</option>
                            </select>
                        </div>
                    </div>
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="py-4 px-2 text-sm lg:text-base xl:text-base lg:font-medium xl:font-medium font-normal text-black dark:text-white">
                                    ID
                                </th>
                                <th className="py-4 px-2  text-sm lg:text-base xl:text-base  lg:font-medium xl:font-medium font-normal text-black dark:text-white">
                                    Customer Name
                                </th>
                                <th className="py-4 px-2  text-sm lg:text-base xl:text-base  lg:font-medium xl:font-medium font-normal text-black dark:text-white">
                                    Customer Email
                                </th>
                                <th className="py-4 px-2 text-sm lg:text-base xl:text-base  lg:font-medium xl:font-medium font-normal text-black dark:text-white">
                                    Created at
                                </th>
                                <th className="py-4 px-2   text-sm lg:text-base xl:text-base lg:font-medium xl:font-medium font-normal text-black dark:text-white">
                                    Services
                                </th>
                                <th className="py-4 px-2  text-sm lg:text-base xl:text-base lg:font-medium xl:font-medium font-normal text-black dark:text-white">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredQuotes.map((quote, id) => (
                                <tr
                                   key={quote.id}
                                   className={quote.read ? "" : "bg-gray-100 dark:bg-boxdark-2"}
                                   >
                                    <td 
                                      onClick={() => handleMessageClick(quote)}
                                      className="border-b border-[#eee] py-2 px-2 dark:border-strokedark "
                                    >
                                        <h5  className={` text-primary hover:underline cursor-pointer text-xs lg:text-sm dark:text-white ${!quote.read ? "font-bold" : "lg:font-medium xl:font-medium font-normal" }`}>
                                            {quote.id}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-2 dark:border-strokedark ">
                                        <h5 className={`text-black text-xs lg:text-sm dark:text-white ${!quote.read ? "font-bold" : "lg:font-medium xl:font-medium font-normal" }`}>
                                            {quote.name}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] px-2 py-2 dark:border-strokedark ">
                                    <h5 className={`text-black text-xs lg:text-sm dark:text-white ${!quote.read ? "font-bold" : "lg:font-medium xl:font-medium font-normal" }`}>
                                    {quote.email}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-2 dark:border-strokedark ">
                                    <h5 className={`text-black text-xs lg:text-sm dark:text-white ${!quote.read ? "font-bold" : "lg:font-medium xl:font-medium font-normal" }`}>
                                    {new Date(quote.createdAt).toLocaleString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: '2-digit',
                                                })}  
                                        </h5>
                                    </td>

                                    <td className="border-b border-[#eee] px-2 py-2 dark:border-strokedark">
                                    <h5 className={`text-black text-xs lg:text-sm dark:text-white ${!quote.read ? "font-bold" : "lg:font-medium xl:font-medium font-normal" }`}>
                                    {quote.services?.map((service: Service) => (
                                                <div key={service.id}>{service.name}</div>
                                            ))}      
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-2 dark:border-strokedark">
                                        {editingStatusId === quote.id ? (
                                            <select
                                                value={selectedStatus}
                                                onChange={(e) => handleStatusChange(quote.id, e.target.value)}
                                                className={`rounded-full bg-opacity-10 px-3 py-1 text-xs lg:text-sm ${!quote.read ? "font-bold" : "lg:font-medium xl:font-medium font-normal" }`}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Approved">Approved</option>
                                                <option value="Completed">Completed</option>
                                                <option value="Rejected">Rejected</option>
                                            </select>
                                        ) : (
                                            <p
                                                className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-xs lg:text-sm ${!quote.read ? "font-bold" : "lg:font-medium xl:font-medium font-normal" } cursor-pointer 
                                                   ${quote.status === 'Pending'? 'bg-warning text-warning'
                                                    : quote.status === 'Approved'? 'bg-success text-success'
                                                    : quote.status === 'Completed'? 'bg-blue-400 text-blue-600'
                                                    : 'bg-danger text-danger'
                                                    }`}
                                                onClick={() => handleStatusClick(quote.id, quote.status)}
                                            >
                                                {quote.status}
                                            </p>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> 
            </div>
            {modalMessage && (
                <Modal
                    show={isMessageModalOpen}
                    onClose={() => setIsMessageModalOpen(false)}
                    className="z-999 flex items-center justify-center"
                >
                    <Modal.Header>
                        <p className="text-lg font-semibold text-gray-800 p-4">Quote&apos;s details</p>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="p-4 space-y-4">
                            <div className="flex items-center gap-4">
                                <p className="text-sm font-semibold text-gray-600">Status :</p>
                                <p
                                className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-xs lg:text-sm lg:font-medium xl:font-medium font-normal cursor-pointer ${modalMessage.status === 'Pending'
                                    ? 'bg-warning text-warning'
                                    : modalMessage.status === 'Approved'
                                        ? 'bg-success text-success'
                                        : 'bg-danger text-danger'
                                    }`}
                            >
                                {modalMessage.status}
                            </p>                      
                           </div>
                           <div className="flex items-center gap-4">
                                <p className="text-sm font-semibold text-gray-600">Quote ID :</p>
                                <p className="text-sm text-gray-800">{modalMessage.id}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className="text-sm font-semibold text-gray-600">Customer Name :</p>
                                <p className="text-sm text-gray-800">{modalMessage.name}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className="text-sm font-semibold text-gray-600">Customer Email :</p>
                                <p className="text-sm text-gray-800">{modalMessage.email}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className="text-sm font-semibold text-gray-600">Customer Phonenumber :</p>
                                <p className="text-sm text-gray-800">{modalMessage.phonenumber}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className="text-sm font-semibold text-gray-600">Zip Code :</p>
                                <p className="text-sm text-gray-800">{modalMessage.zip}</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-600">Services :</p>
                                <ul className="text-sm text-gray-800 flex flex-col list-disc pl-5">
                                    {modalMessage.services?.map((service: Service) => (
                                        <li key={service.id}>{service.name}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-600">Message :</p>
                                <p className="text-sm text-gray-800">{modalMessage.message}</p>
                            </div>

                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            onClick={() => setIsMessageModalOpen(false)}
                            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                        >
                            Close
                        </button>
                    </Modal.Footer>
                </Modal>
            )}
        </DefaultLayout>
    );
};

export default QuotesPage;
