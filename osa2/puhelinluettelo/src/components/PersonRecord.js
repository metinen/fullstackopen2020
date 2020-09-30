import React from 'react';

const PersonRecord = ({ person }) => {
    return (
        <>
            <li>{`${person.name}  ${person.number}`}</li>
        </>
    );
};

export default PersonRecord;