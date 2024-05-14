import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <>
        <nav>
            <ul>
                <li>
                    <Link to='/'>Page A</Link>
                </li>
                <li>
                    <Link to='/pageB'>Page B</Link>
                </li>
                <li>
                    <Link to='/pageC'>Page C</Link>
                </li>
            </ul>
        </nav>
        <Outlet />
    </>
  )
}
