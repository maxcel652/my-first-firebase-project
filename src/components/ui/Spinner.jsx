import React from 'react'

const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-400 border-t-amber-900"></div>
    </div>
    
  )
}

export default Spinner