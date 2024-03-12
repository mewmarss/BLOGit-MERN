import React from 'react';

const Spinner = () => {
  return (  
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="animate-spin w-16 h-16 rounded-full border-t-4 border-red-500 border-solid"></div>
    </div>
  )
}

export default Spinner;
