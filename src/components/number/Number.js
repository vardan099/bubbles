import React from 'react';

const Number = (props) => {
    const {number, clickHandler, selected} = props;
    const handleClick = () => {
        clickHandler(number);
    };
    return (
        <button className={selected?"number selected": "number"} onClick={handleClick}>{number}</button>
    )
};

export default Number;