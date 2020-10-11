import React from 'react';

const Notification = ({ message, isError }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="notification" id={isError && "error"}>
            {message}
        </div>
    )
}

export default Notification