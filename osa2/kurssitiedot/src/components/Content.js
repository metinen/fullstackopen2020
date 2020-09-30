import React from 'react';
import Part from './Part'

const Content = (props) => {
    return (
        <>
            {props.parts.map(e => {
                return <Part part={e.name} exercises={e.exercises}
                ></Part>
            })
            }
        </>
    );
};

export default Content;