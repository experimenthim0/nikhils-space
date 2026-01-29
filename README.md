Nikhil Yadav 

Portfolio


<form 
  onSubmit={onSubmit} 
  className="max-w-md mx-auto p-6 bg-gray-900 text-gray-100 shadow-lg rounded-lg space-y-4"
>
  <input 
    type="text" 
    name="name" 
    required 
    placeholder="Your Name"
    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
  />
  
  <input 
    type="email" 
    name="email" 
    required 
    placeholder="Your Email"
    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
  />
  
  <textarea 
    name="message" 
    required 
    placeholder="Your Message"
    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 h-32"
  ></textarea>
  
{/* 
   <HCaptcha
         sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
         reCaptchaCompat={false}
         onVerify={onHCaptchaChange} 
      />  */}

  <button 
    type="submit" 
    className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
  >
    Submit Form
  </button>
  
  <span className="block text-sm text-gray-300">{result}</span>

 
</form>