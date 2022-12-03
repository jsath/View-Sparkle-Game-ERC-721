import React, { useState, useEffect} from 'react'
import '../styles.css'



const Each = (props) => {
    const[hover, setHover] = useState(false);
    const[mouseX, setX] = useState();
    const[mouseY, setY] = useState();




    const handleMouseEnter = () => {
        setHover(true);
    };
    
    const handleMouseLeave = () => {
        setHover(false);
    };
    
    const handleMouseMove = (event) => {
        setX(event.clientX)
        setY(event.clientY)
    };

    const style = {
        position: "absolute",
        left: mouseX,
        top: mouseY,
    };


    return (
    <>

    <div className='eachToken' 
        onMouseEnter={(e)=>{handleMouseEnter(e)}}
        onMouseLeave={(e)=>{handleMouseLeave(e)}}
        onMouseMove={(e)=>{handleMouseMove(e)}}
        >
            <h3>{props.pass.tokenId}</h3>
            <img src={props.pass.media[0].raw} className='tokenImg'/>
            <div className={hover ? "hovered" : "hoverOff"}  style={style}>
            <h3>#{props.pass.tokenId}</h3>
            {
                props.pass.rawMetadata.attributes.map((attribute) => {
                    return (
                        <>
                        <h4> {attribute.trait_type}: <span className='red' >{attribute.value}</span> </h4>
                        </>
                    )
                })
            }
            </div>
    </div>
    
    </>
)
}

export default Each