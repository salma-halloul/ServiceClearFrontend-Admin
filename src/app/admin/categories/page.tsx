"use client"

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { createCategory, deleteCategory, fetchAllCategories, updateCategory } from "@/redux/actions/categoryAction";
import { RootState, useAppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CiEdit } from 'react-icons/ci';
import DeleteModal from "@/components/Modals/DeleteModal";


const CategoriesPage = () => {
    const dispatch = useAppDispatch();
    const { categories, error } = useSelector((state: RootState) => state.category);
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryIcon, setNewCategoryIcon] = useState<string | null>(null); 
    const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
    const [editingCategoryName, setEditingCategoryName] = useState<string>('');
    const [editingCategoryIcon, setEditingCategoryIcon] = useState<string>(''); 
    const [editingIcon, setEditingIcon] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

    const handleDeleteCategory = (categoryId: string) => {
        setCategoryToDelete(categoryId);
        setShowModal(true);
    };

    const confirmDeleteCategory = async () => {
      if (categoryToDelete) {
          try {
              await dispatch(deleteCategory(categoryToDelete)).unwrap();
              toast.success("Category successfully deleted!");
              setShowModal(false);
              setCategoryToDelete(null);
          } catch (error) {
              toast.error("Failed to delete category. Please try again.");
          }
      }
    };

    const cancelDeleteCategory = () => {
        setShowModal(false);
        setCategoryToDelete(null);
    };

    useEffect(() => {
        dispatch(fetchAllCategories());
    }, [dispatch]);

    const handleAddCategory = () => {
        setIsAddingCategory(true);
    };

    const handleSaveCategory = async () => {
      try {
        if (!newCategoryName || !newCategoryIcon) {
          toast.error('Please fill out all fields.');
          return;
        }
        await dispatch(createCategory({ name: newCategoryName, icon: newCategoryIcon })).unwrap();
        toast.success('Category submitted successfully!');
          setNewCategoryName('');
          setIsAddingCategory(false);
          setNewCategoryIcon(null);
      } catch (error) {
          toast.error('Failed to submit category. Please try again.');
      }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setNewCategoryIcon(reader.result as string);
        };
        reader.readAsDataURL(file);
    }
};

const handleEditIconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  console.log('Selected file for editing:', file);
  if (file) {
      const reader = new FileReader();
      reader.onload = () => {
          console.log('Edited icon as base64:', reader.result);
          setEditingCategoryIcon(reader.result as string);
      };
      reader.readAsDataURL(file);
  }
  setEditingIcon(false);
};



    const handleCancelCategory = () => {
        setNewCategoryName('');
        setNewCategoryIcon('');
        setIsAddingCategory(false);
    };

  const handleEditCategory = (categoryId: string, categoryName: string, categoryIcon: string ) => {
    setEditingCategoryId(categoryId);
    setEditingCategoryName(categoryName);
    setEditingCategoryIcon(categoryIcon);
  };

const handleUpdateCategory = async () => {
    if (editingCategoryId) {
        try {
          if (!editingCategoryName || !editingCategoryIcon) {
            console.error('Missing fields:', { editingCategoryName, editingCategoryIcon });
            toast.error('Please fill out all fields.');
            return;
        }
        console.log('Dispatching createCategory with:', { name: editingCategoryName, icon: editingCategoryIcon });

            await dispatch(updateCategory({ id: editingCategoryId, name: editingCategoryName, icon: editingCategoryIcon })).unwrap();
            setEditingCategoryId(null);
            setEditingCategoryName('');
            setEditingCategoryIcon('');
            toast.success('Category updated successfully!');
        } catch (error) {
            toast.error('Failed to update category. Please try again.');
        }
    }
};
  

    const handleCancelEdit = () => {
      setEditingCategoryId(null);
      setEditingCategoryName('');
      setEditingCategoryIcon('');
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Categories" />
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <div>
              {error && (
                <div className="text-red-500 mb-3">
                  {error}
                </div>
              )}
            </div>
            <button
              onClick={handleAddCategory}
              className="inline-flex items-center justify-center rounded-md border border-primary text-xs xl:text-base lg:text-base px-2 py-2 text-center font-semibold text-primary hover:bg-opacity-90 lg:px-4 xl:px-4"
            >
              Add Category
            </button>
          </div>
          {isAddingCategory && (
            <div className="mb-4">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-2 py-1 text-black text-xs lg:text-sm dark:border-strokedark dark:bg-gray-800 dark:text-white"
                placeholder="New Category Name"
              />
              <input
                type="file"
                accept=".svg"
                onChange={handleFileUpload}
                className="mt-2 w-full text-xs lg:text-sm"
              />
              {newCategoryIcon && (
                <div className="mt-2">
                  <img src={newCategoryIcon} alt="Icon Preview" className="w-16 h-16" />
                </div>
              )}
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  onClick={handleSaveCategory}
                  className="inline-flex items-center justify-center rounded-full text-xs lg:text-sm bg-green-500 px-3 py-1 lg:px-7 lg:py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-7"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelCategory}
                  className="inline-flex items-center justify-center rounded-full text-xs lg:text-sm bg-red-500 px-3 py-1 lg:px-7 lg:py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-7"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="px-4 py-4 font-medium text-black text-sm lg:text-base dark:text-white">
                  Icon
                </th>
                <th className="px-4 py-4  font-medium text-black text-sm lg:text-base dark:text-white xl:pl-11">
                  Name
                </th>
                <th className="px-4 py-4   font-medium text-black text-sm lg:text-base dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, id) => (
                <tr key={id}>
                  <td className="border-b border-[#eee] px-2 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    {editingCategoryId === category.id ? (
                      <div>
                        {editingCategoryIcon ? (
                          // Si une nouvelle icône a été sélectionnée, affichez-la
                          <img
                            src={editingCategoryIcon}
                            alt="Icon Preview"
                            className="w-16 h-16 cursor-pointer"
                            onClick={() => {
                              // Permet à l'utilisateur de modifier l'icône
                              setEditingCategoryIcon('');
                            }}
                          />
                        ) : (
                          // Sinon, affichez l'icône existante avec une option de modification
                          <img
                            src={category.icon || '/default-icon.svg'}
                            alt="Category Icon"
                            className="w-16 h-16 cursor-pointer"
                            onClick={() => {
                              setEditingIcon(true); // Active le mode d'édition de l'icône
                            }}
                          />
                        )}

                        {/* Champ de téléchargement pour changer l'icône */}
                        {editingIcon && (
                          <input
                            type="file"
                            accept=".svg"
                            onChange={handleEditIconUpload}
                            className="mt-2 w-full text-xs lg:text-sm"
                          />
                        )}
                      </div>
                    ) : (
                      <div>
                        <img
                          src={category.icon || '/default-icon.svg'}
                          alt="Category Icon"
                          className="w-6 h-6"
                        />
                      </div>
                    )}
                  </td>

                  <td className="border-b border-[#eee] px-2 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    {editingCategoryId === category.id ? (
                      <input
                        type="text"
                        value={editingCategoryName}
                        onChange={(e) => setEditingCategoryName(e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-2 py-1 text-black text-xs lg:text-sm dark:border-strokedark dark:bg-gray-800 dark:text-white"
                      />
                    ) : (
                      <h5 className="font-medium text-black text-xs lg:text-sm dark:text-white">
                        {category.name}
                      </h5>
                    )}
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex items-center space-x-0.1 lg:space-x-3.5 xl:space-x-3.5">
                      {editingCategoryId === category.id ? (
                        <>
                          <button
                            onClick={handleUpdateCategory}
                            className="inline-flex items-center justify-center rounded-full bg-green-500 px-2 py-1 text-center lg:text-base text-[13px] font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-7"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="inline-flex ml-2 items-center justify-center rounded-full bg-red-500 px-2 py-1 text-center font-medium lg:text-base text-[13px] text-white hover:bg-opacity-90 lg:px-5 xl:px-7"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <div className="space-x-3.5">
                          <button
                            onClick={() =>
                              handleEditCategory(category.id, category.name, category.icon)
                            }
                            className="hover:text-primary">
                            <CiEdit style={{ fontSize: '20px', strokeWidth: 0.5 }} />
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(category.id)}
                            className="hover:text-primary"
                          >
                            <svg
                              className="fill-current"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                                fill=""
                              />
                              <path
                                d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                                fill=""
                              />
                              <path
                                d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                                fill=""
                              />
                              <path
                                d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                                fill=""
                              />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <DeleteModal
            show={showModal}
            onConfirm={confirmDeleteCategory}
            onCancel={cancelDeleteCategory}
            message="Are you sure you want to delete this category?"
          />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CategoriesPage;
