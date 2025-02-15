"use client"
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Loader from '@/components/Loader';

const LoadingOverlay = () => {
   const [loading, setLoading] = useState<boolean>(true);
   
   const userLoading = useSelector((state: RootState) => state.user.loading);
   const categoryLoading = useSelector((state: RootState) => state.category.loading);
   const reviewLoading = useSelector((state: RootState) => state.review.loading);
   const authLoading = useSelector((state: RootState) => state.auth.loading);
   const contactLoading = useSelector((state: RootState) => state.contact.loading);
   const quoteLoading = useSelector((state: RootState) => state.quote.loading);
   const serviceLoading = useSelector((state: RootState) => state.service.loading);
 
   const loadingState = authLoading || serviceLoading || userLoading || quoteLoading || categoryLoading || reviewLoading || contactLoading ;
 
   useEffect(() => {
     setTimeout(() => setLoading(false), 1000);
   }, []);


  return (
    <>
      {(loadingState || loading)  && (
        <div>
          <Loader />
        </div>
      )}
    </>
  );
};

export default LoadingOverlay;
