import React from 'react';

const Total = (props) => {
    const total = props.parts.reduce((total, e) => total + e.exercises, 0);
    return (
        <p>{`Total of ${total} exercises`}</p>
    );
};

export default Total;