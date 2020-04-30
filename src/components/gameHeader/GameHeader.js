import React from "react";

const GameHeader = ()=>{
    return(
        <header>
            <h1 className="text-center">FIKA BUBBLES FUN</h1>
            <p>
                According to legend, bubbles appear from the depths of the ocean every 15 seconds.
                Try to guess how many bubbles will appear this time (from 0 to 9).
                You can choose from one to 5 numbers but the more you choose the less points you get.
                Earn 100 points to see the <span className="magic">MAGIC!</span>
            </p>
        </header>
    )
};

export default GameHeader;