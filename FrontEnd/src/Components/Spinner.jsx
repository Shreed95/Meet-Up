import React from 'react';

const Spinner = () => {
    return (
        <div className="flex justify-center items-center mt-24">
            <div className="animate-spin rounded-full border-t-4 border-white border-opacity-75 border-solid h-12 w-12"></div>
        </div>
    );
};

export default Spinner;
