import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Home() {
  const [dummy, setDummy] = useState()

  useEffect(() => {
    axios.get('/data/data1.json')
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <div className='home'>
      HOME!!!!!!!!!!!!!!!!!
      <Link to='/test'>to test</Link>
      <br/>
      hi
    </div>
  )
}

export default Home