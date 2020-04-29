import React, {useState, useEffect} from "react";
import GameHeader from '../gameHeader/GameHeader';
import Number from '../number/Number';
import ReactCountdownClock from 'react-countdown-clock';
import sigmaLogo from "../../images/sigma.png"


const GameWrapper = () => {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [bubblesCount, setBubblesCount] = useState(0);
    let timeout;

    const [game, setGame] = useState({
        started: false,
        gameNumber: null,
        gamesCount: 1,
        duration: null,
        status: ''
    });
    const [player, setPlayer] = useState({
        name: '',
        score: 0,
        selectedNumbers: []
    });

    const showResult = () => {
        console.log("show results")
    };


    const updateGameScore = () => {
        clearTimeout(timeout);
        setBubblesCount(0);
        const duration = game.duration && game.duration < 16 ? game.duration + 1 : 15;
        setPlayer({...player, selectedNumbers: []});
        const randomNumber = Math.floor(Math.random() * 10);
        setGame({
            ...game,
            gamesCount: game.gamesCount + 1,
            gameNumber: randomNumber,
            duration: duration,
            status: ''
        });
    };

    useEffect(() => {
        updateGameScore();
    }, []);


    const updateSelectedNumbers = (array, item) => {
        const exists = array.includes(item);

        if (exists) {
            setPlayer({
                ...player, selectedNumbers: array.filter((c) => {
                    return c !== item
                })
            });
        } else {
            const result = array;
            result.push(item);
            setPlayer({...player, selectedNumbers: result})
        }
    };

    const checkNumbers = () => {
        console.log(game, player);
        setBubblesCount(game.gameNumber);

        if (player.selectedNumbers.includes(game.gameNumber)) {
            setGame({
                ...game,
                status: 'win',
                duration: null,
            });
        } else {
            setGame({
                ...game,
                status: 'lose',
                duration: null,
            });
        }
        timeout = setTimeout(() => {
            updateGameScore();
        }, 10000)

    };


    const selectNumberHandler = (number) => {
        if(player.selectedNumbers.length < 5){
            updateSelectedNumbers(player.selectedNumbers, number);
        }
    };

    const toggleGame = () => {
        setGame({...game, started: !game.started});
        updateGameScore()
    };

    const fillBubbles = (count) => {
        let bubbles = [];
        for (let i = 0; i < count; i++) {
            bubbles.push(
                <g>
                    <g>
                        <circle cx="50" cy="50" r="50"/>
                    </g>
                </g>)
        }
        return bubbles
    };

    const isNumberSelected = (number) => {
        return player.selectedNumbers.includes(number)
    }


    return (
        <>
            <GameHeader/>
            <div className="container">
                {
                    game.duration && <ReactCountdownClock seconds={game.duration} color="#000" alpha={0.5}
                                                          size={150}
                                                          onComplete={checkNumbers}/>
                }
                {game.status === "win" &&
                <div className="results text-center">
                    <h1 className="win">AWESOME!</h1>
                    <h4>This time appear {game.gameNumber} bubbles</h4>
                </div>

                }
                {game.status === "lose" &&
                <div className="results text-center">
                    <h1 className="win">TRY AGAIN!</h1>
                    <h3 className="result-line">This time appear {game.gameNumber} bubbles</h3>
                </div>
                }
                <div className="bubbles-container">
                    <img className="sigma-img" src={sigmaLogo} alt="sigma logo"/>
                    <svg className="bubbles" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 701 1024"
                         style={{overflow: 'visible'}}>
                        <g className="bubbles-large" strokeWidth="7">
                            {
                                fillBubbles(bubblesCount)
                            }
                        </g>
                    </svg>

                    <div className="numbers-list">
                        {numbers.map((value, index) => {
                                return <Number clickHandler={selectNumberHandler} selected={isNumberSelected(value)}
                                               key={index} number={value}/>
                            }
                        )}
                    </div>
                </div>
            </div>

        </>
    );
};

export default GameWrapper