import React from "react";

export default function ErrorMessage({children} : {children: React.ReactNode}) {
  return (
    <div className="text-center my-1 bg-red-100 text-red-500 font-bold p-3 uppercase text-sm">
        {children}
    </div>
  )
}
