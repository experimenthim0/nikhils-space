import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

function Myani() {


  const navigate = useNavigate();

 
  useEffect(() => {
    
    window.location.href = 'https://surpriseforani.vercel.app';
  }, []);

  return (

    <div>
      <p>Redirecting you to the external website...</p>
 
    
    </div>
  )
}

export default Myani