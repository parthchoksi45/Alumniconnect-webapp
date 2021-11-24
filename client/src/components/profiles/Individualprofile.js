import React from 'react'
import PropTypes from 'prop-types'

const Individualprofile = ({profile:{
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
        <div className="profile bg-primary" >
            <div>
                <h2>{Name}</h2>
                <p><b>Year of graduation:</b> {year}</p>
                <span><b>School:</b><span> {school}</span></span>
                <p><b>Current location:</b> {location}</p>
                {company&&<span><b> Current company:</b>{company}</span>}
                {website&&<p><b> Website: </b>{website}</p>}
                {instagram&&<p> <b>Instagram:</b> {instagram}</p>}
                {linkedin&&<p> <b>Linkedin:</b> {linkedin}</p>}
                <p><b>About:</b><br/> {bio}</p>
            </div>
        </div>
    )
}

Individualprofile.propTypes = {

}

export default Individualprofile
