import React from 'react';

const Number = (props) => {
    const {number, clickHandler} = props;
    const handleClick = () => {
        clickHandler(number);
    };
    return (
        <button className="number" onClick={handleClick}>{number}</button>
    )
};

export default Number;