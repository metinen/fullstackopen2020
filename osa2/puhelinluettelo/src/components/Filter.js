import React from 'react';

const Filter = ({handleFilterChange, filterBy}) => {
    return (
        <>
            <div>Filter shown with</div>
            <input value={filterBy} onChange={handleFilterChange} />
        </>
    );
};

export default Filter;