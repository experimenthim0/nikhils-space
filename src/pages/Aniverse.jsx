import React from 'react'
import '../App.css'

import Player from '../components/Player'

function Aniverse() {
    const images=[
        "https://i.ibb.co/21ZVtnNv/b8.webp",
        "https://i.ibb.co/j9qFpRQ3/b7.webp",
        "https://i.ibb.co/VWrcbxRK/b6.webp",
        "https://i.ibb.co/XfmVFWqM/b3.webp",
        "https://i.ibb.co/93dwVz0p/b5.webp",
        "https://i.ibb.co/p6wKJZfP/bestiedp.jpg",
"https://i.ibb.co/JFm9kxDr/b4.webp",
"https://i.ibb.co/HDQtCH3f/b2.webp",
"https://i.ibb.co/Yx3McSs/b1.webp",
"https://i.ibb.co/1t4ymYH4/anisha5.webp",
"https://i.ibb.co/kVQpkJhf/anisha3.webp",
"https://i.ibb.co/fzXXnLbc/anisha2.webp",
"https://i.ibb.co/xncQCnw/anisha1.webp",
"https://i.ibb.co/84bZqrw4/anigreen.webp",
"https://i.ibb.co/bjftZPR9/ani1.webp",
"https://i.ibb.co/qFnFzhWw/591164083-17855305800575075-6597202049148888910-n.webp",
"https://i.ibb.co/23Vk2DWY/587866096-17854678767575075-7333830926515837571-n.webp",
"https://i.ibb.co/4w0vGwZB/579616438-17852932146575075-70263404449563450-n.jpg",
"https://i.ibb.co/spzBpFQn/560427234-17848023159575075-1663614015424503520-n.jpg",

        
    ]

    const informations=[
        {
        name:"Anisha Yadav",
        fathersname:"Mr. Prahlad Yadav",
        dob:"2006",
            
            location:"Near Rakesh dabads home",
            college:"Ganpati PG Girls College Khejroli",
            Gotr:"Jadim",
            insta:"@anianisha2006",
            phone:"+91 70236 12345",
            contact:"+91*******345"

            
        }
    ]

  return (
    <div className='bg-black min-h-screen flex flex-col justify-center items-center text-white'>

        {/* <CustomIGProfile username="anianisha2006" bio="Nothing" followers="31" posts="5" /> */}
        <h1 className='text-4xl font-semibold myfont my-10 text-center'>Bestie <span className='text-red-400'>Ani</span></h1>

        <p className='calmfont text-3xl px-10 text-center'>This page exists because some feelings don’t fit in words.</p>





     <div className='grid grid-cols-1 md:grid-cols-3 gap-6 p-6 mt-6'>
        {images.map((imgSrc, index) => (
            <div key={index} className="mb-4">
                <img src={imgSrc} alt={`Image ${index + 1}`} className={ index%2==0 ? "w-100 h-100 rounded-lg shadow-lg hover:rotate-6 transition-transform duration-300 ease-in-out" : "w-100 h-100 rounded-lg shadow-lg hover:-rotate-6 transition-transform duration-300 ease-in-out" }/>
            </div>
        ))}
     </div>


       <div className="fixed left-0 right-0 bottom-0 flex justify-center z-[100] mb-5">
        <div >
          <Player />
        </div>
      </div>


<h1 className='calmfont text-3xl px-10'>This page will stay here quietly, just like these feelings.</h1>


  <div>
    {informations.map((info, index) => (
      <div key={index} className="bg-gray-800 bg-opacity-50 rounded-lg p-6 m-4 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Information that I have </h2>
        <p className="mb-2"><span className='font-semibold'>Name : </span>{info.name}</p>
        <p className="mb-2"><span className='font-semibold'>Father's Name : </span>{info.fathersname}</p>
        <p className="mb-2"><span className='font-semibold'>Gothra : </span>{info.Gotr}</p>
        <p className="mb-2"><span className='font-semibold'>Date of Birth : </span>{info.dob}</p>
        <p className="mb-2"><span className='font-semibold'>Location : </span>{info.location}</p>
        <p className="mb-2"><span className='font-semibold'>College : </span>{info.college}</p>
        <p className="mb-2"><span className='font-semibold'>Instagram : </span>{info.insta}</p>
        <p className="mb-2"><span className='font-semibold'>Phone Number : </span>{info.contact}</p>
      </div>
    ))}

   </div>
<img src="https://i.ibb.co/yFMvrx9S/image.png" alt="image" border="0" className='w-screen h-100 px-10'></img>


  <div className=' relative w-full h-70 hidden sm:block'>
    <div className='flex'>
    <img src="/images/—Pngtree—vector rope_933532.png" alt=""  className='w-155 h-20 -mx-10'/>
    <img src="/images/—Pngtree—vector rope_933532.png" alt=""  className='w-155 h-20 -mx-10'/>
    <img src="/images/—Pngtree—vector rope_933532.png" alt=""  className='w-155 h-20 -mx-10'/>
    <img src="/images/—Pngtree—vector rope_933532.png" alt=""  className='w-155 h-20 -mx-10'/>
    </div>

    <div className='absolute bottom-0 left-0 right-0 flex justify-center items-center gap-45'>
        <div className='flex flex-col justify-center items-center'>
          <div className='w-1 h-10 bg-yellow-400'></div>
        <img src="https://i.ibb.co/21ZVtnNv/b8.webp" alt="" className='w-50 h-50 rotate-6 string'/>
        </div>
         <div className='flex flex-col justify-center items-center'>
          <div className='w-1 h-10 bg-yellow-400'></div>
        <img src="https://i.ibb.co/XfmVFWqM/b3.webp" alt="" className='w-50 h-50 rotate-6 string'/>
        </div>
         <div className='flex flex-col justify-center items-center'>
          <div className='w-1 h-10 bg-yellow-400'></div>
        <img src="https://i.ibb.co/spzBpFQn/560427234-17848023159575075-1663614015424503520-n.jpg" alt="" className='w-50 h-50 rotate-6 string'/>
        </div>

    </div>
  </div>
    </div>
  )
}

export default Aniverse


