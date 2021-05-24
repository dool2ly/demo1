import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className='home'>
            HOME!!!!!!!!!!!!!!!!!
            <Link to='/test'>to test</Link>
        </div>
    )
}

export default Home