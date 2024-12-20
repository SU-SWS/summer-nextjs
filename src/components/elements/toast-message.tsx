"use client"

import {toast, ToastContainer} from "react-toastify"

export function ToastMessage() {
  return (
    <>
      <p>hi</p>
      <ToastContainer
        progressClassName="bg-spirited-light"
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}
