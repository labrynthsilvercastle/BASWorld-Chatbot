import React from 'react';

const ToggleButton = ({ onClick }) => {
    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg"
            onClick={onClick}
        >
            <i className="fas fa-comments"></i>
        </button>
    );
};

export default ToggleButton;
