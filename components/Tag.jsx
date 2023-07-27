import React from 'react'

const Tag = ({ text, handleTagClick }) => {
    return (
        <button
            type='button'
            className="rounded-full mx-2 px-5 py-1 text-xs 
            bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white 
            hover:bg-pink-600 hover:scale-105 transition duration-300 ease-in-out"
            onClick={() => handleTagClick && handleTagClick(text)}
        >
            {text}
            
        </button>

    )
}

export default Tag