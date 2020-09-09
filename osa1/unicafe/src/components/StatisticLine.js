import React from 'react';


const StatisticLine = ({ text, value }) => {
    return (
        <tr>
            <td>{`${text} ${value}`}</td>
        </tr>
    );
};

export default StatisticLine;