import React, { useEffect } from "react";


function Supportme() {
  // useEffect(() => {
  //   // Prevent duplicate script injection
  //   if (!document.querySelector("#razorpay-script")) {
  //     const script = document.createElement("script");
  //     script.id = "razorpay-script"; // unique ID
  //     script.src = "https://checkout.razorpay.com/v1/payment-button.js";
  //     script.setAttribute("data-payment_button_id", "pl_SBMeNCzZdg2WDq");
  //     script.async = true;

  //     document.getElementById("razorpay-form").appendChild(script);
  //   }
  // }, []);

  return (
    < div className="bg-neutral-900 text-white min-h-screen flex items-center justify-center">
   
    <div className="max-w-md w-full bg-neutral-800 rounded-xl p-6 shadow-lg flex justify-center items-center flex-col">
      <h1 className="text-3xl font-bold text-center">Support Me ❤️</h1>
     

     

      {/* Razorpay form
      <div className="mt-6 flex justify-center">
        <form id="razorpay-form"></form>
      </div> */}

          <img src="./images/nikupi.png" className="w-80 h-80 p-4 "/>
           
           <p className="font-bold">Upi Id: 9667446393@upi</p>
      <div className="border-t border-gray-600 my-6"></div>
      <p className="text-center mt-6 underline"><a href="https://nikhim.me" >Visit My Portfolio</a>
</p>
      <p className="text-xs text-gray-500 text-center mt-6">
        Thank you for your support 🙏
      </p>
    </div>

     </div>
  );
}

export default Supportme;