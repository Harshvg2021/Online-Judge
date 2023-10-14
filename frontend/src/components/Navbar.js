import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
    const navLinkStyles = ({isActive})=>{
        return {
            fontWeight : isActive ? "bold" : "normal",
            textDecoration : isActive  ? "none" : "underline"
        }
    }
  return (
    <div style={{display: "flex", flexDirection: "row",marginRight: "10px"}} >
        <div>
            <NavLink style={navLinkStyles} to='/'>Login </NavLink>
        </div>
        <div>
            <NavLink style={navLinkStyles} to='/problems'>Problem-List</NavLink>
        </div>
    </div>
  )
}

export default Navbar