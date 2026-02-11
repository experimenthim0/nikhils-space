import HCaptcha from '@hcaptcha/react-hcaptcha';
import React,{ useState } from 'react';

export default function ContactForm({isDark}) {
  const [result, setResult] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    

const onHCaptchaChange = (token) => {
    setValue("h-captcha-response", token);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);
    formData.append("access_key", "d6fed9d1-8a56-42f7-9069-f7910afcb11b");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      setResult("Error");
    }
  };

  return (
  


<div class="flex items-center min-h-screen px-6 ">
  <div class="container mx-auto">
    <div class="max-w-md mx-auto my-10 border-dotted border-2 border-gray-400 p-1 rounded-md shadow-sm">
      <div class="text-center">
        <h1 className={`my-3 text-3xl font-semibold ${isDark? 'text-gray-300' :'text-gray-600'}`}>
          Reach Out to Me
        </h1>
        <p class="text-gray-400 dark:text-gray-400">
          Fill up the form below to send me a message.
        </p>
      </div>
      <div class="m-7">
        <form onSubmit={onSubmit} >
         

          <div class="mb-6">
            <label for="name" class="block mb-2 text-sm text-gray-400">Full Name</label>
            <input type="text" name="name" id="name" placeholder="Himanshu Yadav" required class="w-full px-3 py-2 h-12 rounded-sm placeholder-gray-500 text-gray-900 bg-gray-100 text-sm focus:outline-none" />
          </div>
          <div class="mb-6">
            <label for="email" class="block mb-2 text-sm text-gray-400">Email Address</label>
            <input type="email" name="email" id="email" placeholder="him@example.com" required class="w-full px-3 py-2 h-12 rounded-sm placeholder-gray-500 text-gray-900 bg-gray-100 text-sm focus:outline-none" />
          </div>
          <div class="mb-6">
            <label for="phone" class="block mb-2 text-sm text-gray-400">Phone Number</label>
            <input type="text" name="phone" id="phone" placeholder="+91 9876543210" required class="w-full px-3 py-2 h-12 rounded-sm placeholder-gray-500 text-gray-900 bg-gray-100 text-sm focus:outline-none" />
          </div>
          <div class="mb-6">
            <label for="message" class="block mb-2 text-sm text-gray-400">Your Message</label>

            <textarea rows="5" name="message" id="message" placeholder="Express your words here" class="w-full px-3 py-2 rounded-sm placeholder-gray-500 text-gray-900 bg-gray-100 text-sm focus:outline-none" required></textarea>
          </div>
          <div class="mb-6 border-[1px] border-dashed border-gray-400">
            <button type="submit" class="w-full bg-black inline-block text-white no-underline hover:text-indigo-100 py-4 px-4 rounded-sm focus:outline-none ">
              Send Message
            </button>
          </div>
          {/* <p class="text-base text-center text-gray-400" id="result"></p>
           */}
           <span className="block text-sm text-gray-300">{result}</span>
        </form>
      </div>
    </div>
  </div>
</div>


  );
}


