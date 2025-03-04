"use client"

import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MultiSelect from "@/components/Elements/Multiselect";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { FaCamera } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchAllCategories } from "@/redux/actions/categoryAction";
import { toast } from "react-toastify";
import { createService } from "@/redux/actions/serviceAction";
import Image from "next/image";

const AddServicePage = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { error } = useSelector((state: RootState) => state.service);
    const { categories, loading: categoriesLoading } = useSelector((state: RootState) => state.category);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [imagesBase64, setImagesBase64] = useState<string[]>([]);
    const [visible, setVisible] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    useEffect(() => {
        dispatch(fetchAllCategories());
    }, [dispatch]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const fileArray = Array.from(files);
            const promises = fileArray.map((file) => {
                return new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        resolve(reader.result as string);
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            });

            Promise.all(promises).then((results) => {
                setImagesBase64(results);
            });
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!name){
            toast.error('Please fill the name field');
            return
        }
        if(!description){
            toast.error('Please fill the description field');
            return
        }
        if(!shortDescription){
            toast.error('Please fill the short description field');
            return
        }
        if(selectedCategories.length === 0){
            toast.error('Please select at least one category');
            return
        }
        if (imagesBase64.length === 0){
            toast.error('Please add at least one image');
            return
        }

        const serviceData = {
            name,
            description,
            shortDescription,
            images: imagesBase64,
            visible,
            categoryIds: selectedCategories,
        };

        try {
            await dispatch(createService(serviceData)).unwrap();
            // Si la soumission réussit, afficher un toast de succès
            toast.success('Service submitted successfully !');
            // Réinitialiser les champs de formulaire
            setName('');
            setDescription('');
            setShortDescription('');
            setImagesBase64([]);
            setVisible(false);
            setSelectedCategories([]);
        } catch (error) {
            // Si une erreur survient, afficher un toast d'erreur
            toast.error('Error while creating the service:');
            console.error('Error while creating the service:', error);
        }
    };

    

    return (
        <DefaultLayout>
            <div>
                <Breadcrumb pageName="Add Service" />
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                        <div className="flex flex-col gap-9">
                            {/* <!-- Input Fields --> */}
                            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                                    <h3 className="font-medium text-black dark:text-white">
                                        General
                                    </h3>
                                </div>
                                <div className="flex flex-col gap-5.5 p-6.5">
                                    <div>
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Title
                                        </label>
                                        <input
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            type="text"
                                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Short description
                                        </label>
                                        <input
                                            required
                                            value={shortDescription}
                                            onChange={(e) => setShortDescription(e.target.value)}
                                            type="text"
                                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Description
                                        </label>
                                        <textarea
                                        required
                                            value={description} onChange={(e) => setDescription(e.target.value)}
                                            rows={6}
                                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        ></textarea>
                                    </div>

                                </div>
                            </div>

                        </div>

                        <div className="flex flex-col gap-9 ">
                            {/* <!-- Status Fields --> */}
                            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                                    <h3 className="font-medium text-black dark:text-white">
                                        Service Status
                                    </h3>
                                </div>

                                <div className="flex flex-col gap-2 p-6.5">
                                    <label className="flex items-center text-gray-700 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="visibility"
                                            value="true"
                                            checked={visible === true}
                                            onChange={() => setVisible(true)}
                                            className="hidden"
                                        />
                                        <div
                                            className={`box mr-4 flex h-5 w-5 items-center justify-center rounded-full border border-primary ${visible && "!border-4"
                                                }`}
                                        >
                                            <span className="h-2.5 w-2.5 rounded-full bg-white dark:bg-transparent"></span>
                                        </div>
                                        Visible
                                    </label>

                                    <label className="flex items-center text-gray-700 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="visibility"
                                            value="false"
                                            checked={visible === false}
                                            onChange={() => setVisible(false)}
                                            className="hidden"
                                        />
                                        <div
                                            className={`box mr-4 flex h-5 w-5 items-center justify-center rounded-full border border-primary ${!visible && "!border-4"
                                                }`}
                                        >
                                            <span className="h-2.5 w-2.5 rounded-full bg-white dark:bg-transparent"></span>
                                        </div>
                                        Not Visible
                                    </label>
                                </div>



                            </div>
                            {/* <!-- Select input --> */}
                            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                                    <h3 className="font-medium text-black dark:text-white">
                                        Categories
                                    </h3>
                                </div>
                                <div className="flex flex-col gap-5.5 p-6.5">
                                    <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                                        Select one or more categories
                                    </label>
                                    <MultiSelect
                                        options={categories.map((cat) => ({
                                            value: cat.id,
                                            text: cat.name,
                                            selected: selectedCategories.includes(cat.id),

                                        }))}
                                        selectedOptions={selectedCategories}
                                        onChange={setSelectedCategories}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- File upload --> */}
                    <div className="rounded-sm mt-6 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full">
                        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Media
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Add images to show service details
                                </label>
                                <div className="mb-4">
                                    <div className="w-full p-2 border border-dashed border-gray-300 rounded flex items-center justify-center" style={{ height: '100px', position: 'relative' }}>
                                        <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                                            <FaCamera size={48} className="text-gray-300" />
                                            <span className="text-gray-500">Add files</span>
                                            <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
                                        </label>
                                    </div>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {imagesBase64.map((image, index) => (
                                            <Image
                                                key={index}
                                                src={image}
                                                alt={`Service ${index + 1}`}
                                                width={80}
                                                height={80}
                                                className="object-cover rounded-md"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}

                    <div className="flex justify-center">
  <button 
    type="submit"      
    className="mt-5 rounded-md inline-flex items-center justify-center bg-green-500 px-10 py-2 text-center text-lg font-medium text-white hover:bg-opacity-90 lg:px-3 xl:px-5"
  >
    Save
  </button>
</div>


                </form>
            </div>
        </DefaultLayout>
    );
};

export default AddServicePage;
