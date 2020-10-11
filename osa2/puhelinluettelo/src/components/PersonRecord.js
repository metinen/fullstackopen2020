import React from 'react';

const PersonRecord = ({ person, handleRemoving }) => {
    return (
        <>
            <li>{`${person.name}  ${person.number}`} <button onClick={() => handleRemoving(person)}>Delete</button></li>
        </>
    );
};

export default PersonRecord;