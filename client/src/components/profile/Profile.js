import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { getProfileById } from '../../actions/profile'
import Individualprofile from '../profiles/Individualprofile'
import { Redirect } from 'react-router'

const Profile = props => {
    useEffect(()=>{props.getProfileById(props.match.params.id);},[props.getProfileById,props.match.params.id])
    return (
        <div>
            
            {props.profile.profile!=null?<Individualprofile profile={props.profile.profile}/>:<Redirect to="/login"/>}       
        </div>
    )
}

const mapStateToProps=(state)=>({
    profile:state.profile
})

export default connect(mapStateToProps,{getProfileById})(Profile)
