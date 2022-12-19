import React from 'react'
import Passes from './Passes';

const openSea = require('../opensea.png');


const View = (props) => {
return (
    <>
    {
    props.tokens[0] ? 
    <>
    <h4> { props.tokens[0].description }</h4>
    </>
    : ''
    }
    {
        props.tokens.length>1?
        <>
        <h1>Founders Passes</h1>
        <Passes tokens={props.tokens}/>
        </>
        :
        <>
        <h3>No Founders Passes found</h3>  
        <a href='https://opensea.io/collection/sparkle-game-founders-pass' target="_blank" rel="noopener noreferrer"><button className='button'><img src={openSea} width='60vw' alt='opensea'/></button></a>        
        </>
    }
    </>
)
}

export default View