import React  from "react"

export default function Die(props) {

    return (
        <div 
            className={`dices--die ${props.held && "selected"}`} 
            onClick={() => props.handaleHeld(props.id)}
        >
            <h1 className="die--num ">{props.value}</h1>
        </div>
    )
}
