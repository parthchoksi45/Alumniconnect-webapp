import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

const ProfileItem = ({profile:{
    user:{_id,Name,avatar},
    year,
    school,
    company,
    location,
    website,
    instagram,
    linkedin,
    bio
}}) => {
   
    return (
        
        <div className="profile bg-light" style={{backgroundColor:'#fbf396'}}>
            <img src={avatar} alt="" className="round-img"/>
            <div>
                <h2>{Name}</h2>
                <p><b>Year of graduation:</b> {year}</p>
                <p><b>Studied at:</b> {school}</p>
                <p><b>Current location:</b> {location}</p>
                <Link to={`/profile/${_id}`} className="btn btn-primary my-1">View full profile</Link>
            </div>
        </div>
    )
}

ProfileItem.propTypes = {

}

export default ProfileItem
