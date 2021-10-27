import React, { Component } from 'react'

export default class Navbar extends Component {
    render() {
        return (
            <div style={{display:'flex',background:'white',padding:'0.5'}}>
                <h1>Movie App</h1>
                <h2 style={{marginLeft:"2rem",marginTop:"2rem"}}>Favourite</h2>
            </div>
        )
    }
}
