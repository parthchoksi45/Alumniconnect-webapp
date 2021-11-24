import React,{useEffect,Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';
const Profiles = ({getProfiles,profile}) => {
    
    useEffect(()=>{getProfiles();},[]);
    return (
       <Fragment>
           {profile.loading?<Spinner />:(<Fragment>
               <h1 className="large text-primary">Alumni</h1>
               <div className="profiles">
                   {
                       profile.profiles.length>0?(profile.profiles.map(profile=>(<ProfileItem key={profile._id} profile={profile}/>))):<h4>No profiles found</h4>
                   }
               </div>
           </Fragment>) }
       </Fragment>
    )
}

Profiles.propTypes = {
getProfiles:PropTypes.func.isRequired,
profiles:PropTypes.object.isRequired,
}
const mapStateToProps=state=>({
    profile:state.profile
})

export default connect(mapStateToProps,{getProfiles})(Profiles);
