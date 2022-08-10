import {Timer} from "../../GamePage/Timer"

function joinPhaseFunction(tags, message, joiners){
    if (message.startsWith('!join') && joiners.find(element => element.name===tags['display-name'])===undefined) //CHECK IF MESSAGE STARTS WITH !join AND CHATTER DIDN'T ALREADY JOIN
    {
        const messages = process.env.REACT_APP_PARASOCIAL_MESSAGES.replaceAll('streamername', sessionStorage.display_name).split(', ');
        joiners.push({
            name: tags['display-name'],
            color: tags['color'],
            parasocialMessage: messages[Math.floor(Math.random()*messages.length)] //GENERATE RANDOM PARASOCIAL MESSAGE
        }); //GENERATE JOINER ELEMENT WITH THEIR NAME, COLOR AND RANDOM POSITION FOR POP-UP EFFECT
    }
}

const JoinPhase = (props) => {
    const parasocialIcon = new Image().src=process.env.REACT_APP_PARASOCIAL_ICON; //PRELOAD PARASOCIAL ICON
    
    function timerFinish(){
        const selectedJoiner = props.joiners[Math.floor(Math.random()*props.joiners.length)];
        props.setChatPlayer(selectedJoiner); //SELECT CHAT PLAYER
        props.setCurrentQuestion();
        props.updatePhase('answer');
    }

    const joiners = props.joiners.slice(-12).map((joiner, index) =>  //CREATE ARRAY CONTAINING ELEMENTS THAT REPRESENT THE LAST 10 JOINERS IN THE SIMULATED CHAT VISUALS
        {
            const style={
                color: joiner.color,
                paddingLeft: '0.2em',
                fontWeight: '700'
            }
            return <div key={index} className='joinerName'><img alt='parasocial' src={parasocialIcon}/><span style={style}>{joiner.name}</span><span>: {joiner.parasocialMessage}</span></div>
        }
    )

    return (<>
            <Timer timerFinish={timerFinish} timerStart={1}/>
            <div className="centeredText">Type !join to join</div>
            <div className="centeredText">Players joined so far: {props.joiners.length}</div>
            <div id='joinersContainer'>
                {joiners}
            </div>
        </>
    )
}

export {JoinPhase, joinPhaseFunction};