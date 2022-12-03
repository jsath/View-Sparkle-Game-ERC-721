import React, { useEffect, useState } from 'react'
import Each from './Each'
import '../styles.css'


const Passes = (props) => {
    return (
    <>
    <div className='main'>
    {props.tokens.map((pass)=> {
    return(<Each pass={pass} key={pass.tokenId}/>)})}
    </div>
    </>
    )
}

export default Passes