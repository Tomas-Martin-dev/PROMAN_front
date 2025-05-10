import { Outlet } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";

export default function AuthLayout() {
  return (
    <>
      <div className="bg-gray-800 min-h-screen">
        <div className="py-10 lg:py-20 mx-auto w-[450px]">
          <img src="/log.png" alt="logo" className=" aspect-square object-contain w-full"/>

          <div className="mt-10">
            <Outlet />
          </div>
        </div>
      </div>
      <ToastContainer
        autoClose={5000}
        hideProgressBar
        closeOnClick
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        theme="light"
        transition={Slide}
      />
    </>
  )
}
