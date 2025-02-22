"use client"

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { RootState, useAppDispatch } from "@/redux/store";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import DeleteModal from "@/components/Modals/DeleteModal";
import { addReview, deleteMultipleReviews, fetchReviews, updateReview } from "@/redux/actions/reviewAction";
import ReactStars from 'react-stars';


const ReviewsPage = () => {
    const dispatch = useAppDispatch();
    const { reviews, error } = useSelector((state: RootState) => state.review);
    const [selectedReviewIds, setSelectedReviewIds] = useState<string[]>([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [editingStatusId, setEditingStatusId] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [sortMessage, setSortMessage] = useState('desc');
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [name, setName] = useState('');
    const hasFetchedReviews = useRef(false);

    useEffect(() => {
        if (!hasFetchedReviews.current) {
            dispatch(fetchReviews());
            hasFetchedReviews.current = true;
        }
    }, [dispatch]);

    const handleAddNoteClick = () => {
        setIsModalOpen2(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen2(false);
    };

    const handleSaveNote = async (e: any) => {
        e.preventDefault();
        const review = {
            rating: Number(rating),
            comment,
            name,
        };
        try {
            await dispatch(addReview(review)).unwrap();
            toast.success('Review submitted successfully!');
            setIsModalOpen2(false);
        } catch (error) {
            toast.error('Failed to submit review. Please try again !');
        }
    };


    const handleStatusClick = (reviewId: string, currentStatus: string) => {
        setEditingStatusId(reviewId);
        setSelectedStatus(currentStatus);
    };

    const handleStatusChange = (reviewId: string, newStatus: string) => {
        try {
            dispatch(updateReview({ reviewId: reviewId, status: newStatus }));
            toast.success('Review status updated successfully!');
        } catch (error) {
            toast.error('Failed to update review status. Please try again !');
        }
        setEditingStatusId(null);
    };
    
    const handleFilterByStatus = (status: string) => {
        setStatusFilter(status);
    };


    const handleCheckboxChange = (id: string) => {
        setSelectedReviewIds((prevSelected) =>
          prevSelected.includes(id)
            ? prevSelected.filter((reviewId) => reviewId !== id)
            : [...prevSelected, id]
        );
    };
    
    const handleSelectAllChange = () => {
        if (selectedReviewIds.length === filteredReviews.length) {
          setSelectedReviewIds([]);
        } else {
          setSelectedReviewIds(filteredReviews.map((review) => review.id));
        }
    };

    const handleDelete = () => {
        setIsModalOpen(true);
    };
    
    const confirmDelete = () => {
        dispatch(deleteMultipleReviews(selectedReviewIds));
        setSelectedReviewIds([]);
        setIsModalOpen(false);
    };
    
    const cancelDelete = () => {
        setIsModalOpen(false);
    };

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
          if (i <= rating) {
            stars.push(<FaStar key={i} className="text-yellow-500 star-small" />);
          } else if (i - 0.5 === rating) {
            stars.push(<FaStarHalfAlt key={i} className="text-yellow-500 star-small " />);
          } else {
            stars.push(<FaRegStar key={i} className="text-yellow-500 star-small" />);
          }
        }
        return stars;
    };
    const sortedReviews = [...reviews].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const filteredReviews = sortedReviews
    .filter((review) => {
        const matchesStatusFilter = statusFilter === 'all' || review.status === statusFilter;
        return  matchesStatusFilter;
    })  
    .sort((a, b) => {
        if (sortMessage === 'desc') {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        } else {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }});

    const ratingChanged = (newRating:number) => {
        setRating(newRating);
    };

   
    return (
        <DefaultLayout>
            <Breadcrumb pageName="All reviews" />
            {error && error !== "Reviews already up-to-date" && (
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
                                onClick={() => handleFilterByStatus("Rejected")}
                                className={`lg:px-4 lg:py-2 px-2 py-1 text-xs dark:text-black lg:text-sm font-sans font-semibold rounded ${statusFilter === "Rejected" ? 'bg-red-300' : 'bg-gray-100 hover:bg-gray-200'}`}
                            >
                                Rejected
                            </button>
                            {selectedReviewIds.length > 0 && (
                                <div className="flex items-center space-x-2">
                                    <button
                                        className="border text-xs lg:text-sm font-sans text-white px-4 py-2 font-semibold rounded-sm bg-red-500 hover:bg-red-600"
                                        onClick={handleDelete}>Delete
                                    </button>
                                </div>
                            )}
                            <select
                              value={sortMessage}
                              onChange={(e) => setSortMessage(e.target.value)} 
                                className="rounded-full bg-opacity-10 px-3 py-1 text-xs lg:text-sm lg:font-medium xl:font-medium font-normal"
                            >
                                <option value="desc">Recent</option>
                                <option value="asc">Oldest</option>
                            </select>
                        </div>
                        <button
                            onClick={handleAddNoteClick}
                            className="inline-flex items-center justify-center rounded-md border border-primary text-xs xl:text-base lg:text-base px-1 py-1 lg:px-2 lg:py-2 text-center font-semibold text-primary hover:bg-opacity-90 lg:px-4 xl:px-4"
                            >
                            Add Review
                        </button>
                    </div>
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="py-2 px-4">
                                    <input
                                        className="w-3 h-3 w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        type="checkbox"
                                        onChange={handleSelectAllChange}
                                        checked={selectedReviewIds.length === filteredReviews.length}
                                    />
                                </th>
                                <th className="py-4 text-md lg:text-base xl:text-base lg:font-medium xl:font-medium font-normal text-black dark:text-white">
                                    Name
                                </th>
                                <th className="py-4 px-2  text-md lg:text-base xl:text-base  lg:font-medium xl:font-medium font-normal text-black dark:text-white">
                                    Rating
                                </th>
                                <th className="py-4 px-2  text-md lg:text-base xl:text-base lg:font-medium xl:font-medium font-normal text-black dark:text-white">
                                    Review
                                </th>
                                <th className="py-4  text-md lg:text-base xl:text-base lg:font-medium xl:font-medium font-normal text-black dark:text-white">
                                    Date
                                </th>
                                <th className="py-4  text-md lg:text-base xl:text-base lg:font-medium xl:font-medium font-normal text-black dark:text-white">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReviews.map((review, id) => (
                                <tr key={id}>
                                    <td className="py-2 px-4 border-b border-[#eee] py-2 dark:border-strokedark">
                                        <input
                                            className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            type="checkbox"
                                            checked={selectedReviewIds.includes(review.id)}
                                            onChange={() => handleCheckboxChange(review.id)}
                                        />
                                    </td>
                                    <td className="border-b border-[#eee] py-2 dark:border-strokedark ">
                                        <h5 className="lg:font-medium xl:font-medium font-normal text-black text-xs lg:text-sm dark:text-white">
                                            {review.name}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] px-2 dark:border-strokedark">
                                      <div className="flex ">{renderStars(review.rating)}</div>
                                    </td>
                                    <td className="border-b border-[#eee] px-2 py-2 dark:border-strokedark ">
                                        <h5 className="lg:font-medium xl:font-medium font-normal text-black text-xs lg:text-sm dark:text-white ">
                                            {review.comment}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] dark:border-strokedark ">
                                        <h5 className="lg:font-medium xl:font-medium font-normal text-gray-500 text-xs lg:text-sm dark:text-white ">
                                            {new Date(review.createdAt).toLocaleString('fr-FR', {
                                                    year: 'numeric',
                                                    month: '2-digit',
                                                    day: '2-digit',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}  
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] dark:border-strokedark">
                                        {editingStatusId === review.id ? (
                                            <select
                                                value={selectedStatus}
                                                onChange={(e) => handleStatusChange(review.id, e.target.value)}
                                                className="rounded-full bg-opacity-10 px-3 py-1 text-xs lg:text-sm lg:font-medium xl:font-medium font-normal"
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Approved">Approved</option>
                                                <option value="Rejected">Rejected</option>
                                            </select>
                                        ) : (
                                            <p
                                                className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-xs lg:text-sm lg:font-medium xl:font-medium font-normal cursor-pointer ${review.status === 'Pending'
                                                        ? 'bg-warning text-warning'
                                                        : review.status === 'Approved'
                                                            ? 'bg-success text-success'
                                                            : 'bg-danger text-danger'
                                                    }`}
                                                onClick={() => handleStatusClick(review.id, review.status)}
                                            >
                                                {review.status}
                                            </p>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <DeleteModal
                        show={isModalOpen}
                        onConfirm={confirmDelete}
                        onCancel={cancelDelete}
                        message="Are you sure you want to delete the selected reviews ?"
                    />
                </div> 
            </div>

            {isModalOpen2 && (
        <div id="crud-modal" tabIndex={-1} aria-hidden="true" className="fixed top-0 right-0 left-0 z-999 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 max-h-[98vh] overflow-y-auto">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Add review
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={handleCloseModal}
                >
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form className="p-4 md:p-5" onSubmit={handleSaveNote}>
                <div className="grid gap-4 mb-4 grid-cols-2 z-10">
                  <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rating</label>
                    <div className="flex justify-center">
                    <ReactStars
                      count={5}
                      onChange={ratingChanged}
                      size={30}
                      activeColor="#ffd700"
                    />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Review</label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      rows={4}
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Save
                </button>
                <button type="button" onClick={handleCloseModal} className="ml-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

        </DefaultLayout>
    );
};

export default ReviewsPage;
