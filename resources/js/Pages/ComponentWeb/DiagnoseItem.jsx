import React from "react";

const DiagnoseItem = ({ text, onClick }) => {
    return (
        <span>
            <div className="badge rounded-xl badge-lg badge-primary mt-2 mx-1">
                {text}
                <button onClick={onClick} className="ml-2 font-bold">
                    &times;
                </button>
            </div>
        </span>
    );
};

export default DiagnoseItem;
