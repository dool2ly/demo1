import React from 'react'
import { Link } from 'react-router-dom'

function TestPage() {
    return (
        <div className='testpage'>
            TEST PAGE!!!!!!!!!!!!!!!!!
            <Link to='/'>to home</Link>
        </div>
    )
}

export default TestPage