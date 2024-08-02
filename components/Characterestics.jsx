import React from 'react'
import { CiSquareRemove } from 'react-icons/ci'

const Characterestics = ({ char , deleteChar}) => {
    return (
        <li className="flex items-center px-3 shadow-md rounded border" >
            {char.content}
            <span onClick={()=>deleteChar(char._id)} className="bg-red p-5 text-xl text-red-900  cursor-pointer hover:text-red-600 transition-colors ">
                <CiSquareRemove />
            </span>
        </li>
    )
}

export default Characterestics
