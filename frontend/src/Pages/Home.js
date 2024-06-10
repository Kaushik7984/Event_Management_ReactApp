import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <>
    <h1>My home Page</h1>
    <p>go to <Link to='/events'>the list of events</Link> </p>
    </>
  )
}

export default HomePage