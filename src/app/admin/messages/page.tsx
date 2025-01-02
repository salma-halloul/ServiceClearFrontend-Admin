"use client"

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { RootState, useAppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {  fetchContacts, updateContactReadStatus } from "@/redux/actions/contactAction";
import { Service } from "@/types/service";
import { Modal } from "flowbite-react";

const ContactsPage = () => {
    const dispatch = useAppDispatch();
    const { contacts, error } = useSelector((state: RootState) => state.contact);
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortMessage, setSortMessage] = useState('desc');
    const [searchTerm, setSearchTerm] = useState('');
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState<Contact | null>(null);
    
  const handleMessageClick = (contact: Contact) => {
    if (!contact.read) {
        dispatch(updateContactReadStatus({ id: contact.id, read: true })); 
    }
    setModalMessage(contact);
    setIsMessageModalOpen(true);
  };
    
    const handleFilterByStatus = (status: string) => {
        setStatusFilter(status);
    };



    const sortedContacts = [...contacts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const filteredContacts = sortedContacts
    .filter((contact) => {
        const matchesSearchTerm = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || String(contact.id).toLowerCase().includes(searchTerm.toLowerCase()); 
        const matchesStatus = statusFilter === 'all' || (statusFilter === 'read' && contact.read) || (statusFilter === 'unread' && !contact.read);
        return matchesSearchTerm && matchesStatus;
    })  
    .sort((a, b) => {
        if (sortMessage === 'desc') {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        } else {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }});

   
    return (
        <DefaultLayout>
            <Breadcrumb pageName="All contacts" />
            {error && (
                <div className="text-red-500 mb-3">
                    {error}
                </div>
            )}
            <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="max-w-full overflow-x-auto">
                    <div className="flex justify-between items-center mb-4">
                        <div className=" flex space-x-2">
                            <input
                                type="text"
                                placeholder="Search by name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="px-4 py-2 border rounded-md"
                            />

                            <select
                                className="rounded-full bg-opacity-10 px-3 py-1 text-xs lg:text-sm lg:font-medium xl:font-medium font-normal"
                                onChange={(e) => handleFilterByStatus(e.target.value)}
                            >
                                <option value="all">All</option>
                                <option value="read">Read</option>
                                <option value="unread">Unread</option>
                            </select>

                            <select
                                value={sortMessage}
                                onChange={(e) => setSortMessage(e.target.value)}
                                className="rounded-full bg-opacity-10 px-3 py-1 text-xs lg:text-sm lg:font-medium xl:font-medium font-normal"
                            >
                                <option value="desc">Recent</option>
                                <option value="asc">Oldest</option>
                            </select>
                        </div>

                    </div>
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="py-4 px-2 text-md lg:text-base xl:text-base lg:font-medium xl:font-medium font-normal text-black dark:text-white">
                                    Name
                                </th>
                                <th className="py-4 px-2  text-md lg:text-base xl:text-base  lg:font-medium xl:font-medium font-normal text-black dark:text-white">
                                    Message
                                </th>
                                <th className="py-4 px-2  text-md lg:text-base xl:text-base  lg:font-medium xl:font-medium font-normal text-black dark:text-white">
                                    Email
                                </th>
                                <th className="py-4  text-md lg:text-base xl:text-base  lg:font-medium xl:font-medium font-normal text-black dark:text-white">
                                   Phone number
                                </th>
                                <th className="py-4 px-2   text-md lg:text-base xl:text-base lg:font-medium xl:font-medium font-normal text-black dark:text-white">
                                   Sent at
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredContacts.map((contact, id) => (
                                <tr
                                    key={contact.id}
                                    className={contact.read ? "" : "bg-gray-100 dark:bg-boxdark-2"}
                                >
                                    <td
                                        onClick={() => handleMessageClick(contact)}
                                        className="border-b border-[#eee] py-2 px-2 dark:border-strokedark "
                                    >
                                        <h5 className={`text-black hover:underline cursor-pointer text-xs lg:text-sm dark:text-white ${!contact.read ? "font-bold" : "lg:font-medium xl:font-medium font-normal"}`}>
                                            {contact.name}
                                        </h5>
                                    </td>
                                    <td
                                        onClick={() => handleMessageClick(contact)}
                                        className={`border-b border-[#eee] py-2 dark:border-strokedark hover:underline cursor-pointer text-black text-xs lg:text-sm dark:text-white  truncate overflow-hidden max-w-xs  ${!contact.read ? "font-bold" : "lg:font-medium xl:font-medium font-normal"} `}>

                                        <span className="block lg:hidden">{contact.message.slice(0, 20)}...</span>
                                        <span className="hidden truncate max-w-xs lg:block">{contact.message}</span>
                                    </td>

                                    <td
                                        onClick={() => handleMessageClick(contact)}

                                        className="border-b border-[#eee] px-2 py-2 dark:border-strokedark ">
                                        <h5 className={`text-black text-xs hover:underline cursor-pointer lg:text-sm dark:text-white ${!contact.read ? "font-bold" : "lg:font-medium xl:font-medium font-normal"}`}>
                                            {contact.email}
                                        </h5>
                                    </td>
                                    <td
                                        onClick={() => handleMessageClick(contact)}

                                        className="border-b border-[#eee] px-2 py-2 dark:border-strokedark ">
                                        <h5 className={`text-black text-xs hover:underline cursor-pointer lg:text-sm dark:text-white ${!contact.read ? "font-bold" : "lg:font-medium xl:font-medium font-normal"}`}>
                                            {contact.phonenumber}
                                        </h5>
                                    </td>
                                    <td
                                        onClick={() => handleMessageClick(contact)}

                                        className="border-b border-[#eee] py-2 dark:border-strokedark ">
                                        <h5 className={`text-black text-xs hover:underline cursor-pointer lg:text-sm dark:text-white ${!contact.read ? "font-bold" : "lg:font-medium xl:font-medium font-normal"}`}>
                                            {new Date(contact.createdAt).toLocaleString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: '2-digit',
                                            })}
                                        </h5>
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
                        <p className="text-lg font-semibold text-gray-800 p-4">Contact's details</p>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="p-4 space-y-4">
                            <div className="flex items-center gap-4">
                                <p className="text-sm font-semibold text-gray-600">Sent at :</p>
                                <p className="text-sm text-gray-800">
                                    {new Date(modalMessage.createdAt).toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className="text-sm font-semibold text-gray-600">Name :</p>
                                <p className="text-sm text-gray-800">{modalMessage.name}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className="text-sm font-semibold text-gray-600">Email :</p>
                                <p className="text-sm text-gray-800">{modalMessage.email}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className="text-sm font-semibold text-gray-600">Phonenumber :</p>
                                <p className="text-sm text-gray-800">{modalMessage.phonenumber}</p>
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

export default ContactsPage;
