"use client"

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { RootState, useAppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DeleteModal from "@/components/Modals/DeleteModal";
import { deleteMultipleServices } from "@/redux/actions/serviceAction";
import { useRouter } from "next/navigation";
import Image from "next/image";


const ServicesPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { services, error } = useSelector((state: RootState) => state.service);
    const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
    const [statusFilter, setStatusFilter] = useState<boolean | 'all'>('all'); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleFilterByStatus = (status: boolean | 'all') => {
        setStatusFilter(status);
    };

    const filteredServices = services.filter((service) => {
        if (statusFilter === 'all') return true;
        return service.visible === statusFilter;
    });

    const handleNewServiceClick = () => {
        router.push('/admin/services/add-service');
    };

    const handleCheckboxChange = (id: string) => {
        setSelectedServiceIds((prevSelected) =>
          prevSelected.includes(id)
            ? prevSelected.filter((serviceId) => serviceId !== id)
            : [...prevSelected, id]
        );
      };
    
      const handleSelectAllChange = () => {
        if (selectedServiceIds.length === filteredServices.length) {
          setSelectedServiceIds([]);
        } else {
          setSelectedServiceIds(filteredServices.map((service) => service.id));
        }
      };

      const handleDelete = () => {
        setIsModalOpen(true);
      };
    
      const confirmDelete = () => {
        dispatch(deleteMultipleServices(selectedServiceIds));
        setSelectedServiceIds([]);
        setIsModalOpen(false);
      };
    
      const cancelDelete = () => {
        setIsModalOpen(false);
      };

    const handleServiceClick = (id: string) => {
        router.push(`/admin/services/edit/${id}`);
    };  
    

    return (
        <DefaultLayout>
            <Breadcrumb pageName="All services" />
            {error && (
                <div className="text-red-500 mb-3">
                    {error}
                </div>
            )}
            <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="max-w-full overflow-x-auto">
                    <div className="flex justify-between items-center mb-4">
                        <div className=" flex space-x-2">
                            <button
                                onClick={() => handleFilterByStatus('all')}
                                className={`lg:px-4 lg:py-2 px-2 py-1 text-xs dark:text-black lg:text-sm font-sans font-semibold rounded ${statusFilter === 'all' ? 'bg-gray-300' : 'bg-gray-100 hover:bg-gray-200'}`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => handleFilterByStatus(true)}
                                className={`lg:px-4 lg:py-2 px-2 py-1 text-xs dark:text-black lg:text-sm font-sans font-semibold rounded ${statusFilter === true ? 'bg-green-300' : 'bg-gray-100 hover:bg-gray-200'}`}
                            >
                                Visible
                            </button>
                            <button
                                onClick={() => handleFilterByStatus(false)}
                                className={`lg:px-4 lg:py-2 px-2 py-1 text-xs dark:text-black lg:text-sm font-sans font-semibold rounded ${statusFilter === false ? 'bg-yellow-300' : 'bg-gray-100 hover:bg-gray-200'}`}
                            >
                                Not visible
                            </button>
                            {selectedServiceIds.length > 0 && (
                                <div className="flex items-center space-x-2">
                                    <button
                                        className="border text-xs lg:text-sm font-sans text-white px-4 py-2 font-semibold rounded-sm bg-red-500 hover:bg-red-600"
                                        onClick={handleDelete}>Delete
                                    </button>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={handleNewServiceClick}
                            className="inline-flex items-center justify-center rounded-md border border-primary text-xs xl:text-base lg:text-base px-2 py-2 text-center font-semibold text-primary hover:bg-opacity-90 lg:px-4 xl:px-4"
                            >
                            Add Service
                        </button>
                    </div>

                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="py-2 px-4 text-left text-xs lg:text-sm font-semibold text-gray-600">
                                    <input
                                        className="w-3 h-3 w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        type="checkbox"
                                        onChange={handleSelectAllChange}
                                        checked={selectedServiceIds.length === filteredServices.length}
                                    />
                                </th>
                                <th className=" lg:px-4 py-4 px:2 text-md lg:text-base xl:text-base lg:font-medium xl:font-medium font-normal text-black dark:text-white xl:pl-11">
                                    Service
                                </th>
                                <th className="lg:px-4 py-4 px:2 text-md lg:text-base xl:text-base  lg:font-medium xl:font-medium font-normal text-black dark:text-white">
                                    Category
                                </th>
                                <th className="lg:px-4 py-4 px:2 text-md lg:text-base xl:text-base lg:font-medium xl:font-medium font-normal text-black dark:text-white">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredServices.map((service, id) => (
                                <tr key={id}>
                                    <td className="py-2 px-4 border-b border-[#eee] py-2 dark:border-strokedark">
                                        <input
                                            className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            type="checkbox"
                                            checked={selectedServiceIds.includes(service.id)}
                                            onChange={() => handleCheckboxChange(service.id)}
                                        />
                                    </td>
                                    <td
                                        onClick={() => handleServiceClick(service.id)}
                                        className="border-b border-[#eee] px-2 py-5 pl-0 lg:pl-9 dark:border-strokedark xl:pl-11 lg:flex gap-2 ">
                                        <Image
                                            src={service.images[0]}
                                            alt={service.name}
                                            width={36}
                                            height={36}
                                            className="lg:h-9 lg:w-9 object-cover cursor-pointer"
                                        />
                                        <h5 className="lg:font-medium xl:font-medium font-normal text-black text-xs lg:text-sm dark:text-white cursor-pointer hover:underline">
                                            {service.name}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] px-2 py-5 dark:border-strokedark">
                                        <h5 className="lg:font-medium xl:font-medium font-normal text-xs lg:text-sm text-black dark:text-white">
                                            {service.categories.map((category: Category) => category.name).join(', ')}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] px-2 py-5 dark:border-strokedark">
                                        <p
                                            className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-xs lg:text-sm lg:font-medium xl:font-medium font-normal ${service.visible
                                                ? "bg-success text-success"
                                                : "bg-warning text-warning"
                                                }`}
                                        >
                                            {service.visible ? "Visible" : "Not visible"}
                                        </p>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <DeleteModal
                        show={isModalOpen}
                        onConfirm={confirmDelete}
                        onCancel={cancelDelete}
                        message="Are you sure you want to delete the selected services ?"
                    />
                </div>
            </div>
        </DefaultLayout>
    );
};

export default ServicesPage;
