import React from 'react';
import { Bounce, ToastContainer } from 'react-toastify';

export const CustomToastContainer = () => (
  <ToastContainer
    position="top-center"
    transition={Bounce}
    autoClose={2000}
    hideProgressBar
    closeOnClick
    pauseOnHover
  />
);
