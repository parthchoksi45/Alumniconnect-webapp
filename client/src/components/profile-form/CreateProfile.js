import React,{useState,Fragment} from 'react'
import PropTypes from 'prop-types'
import { Link,withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import { createProfile } from '../../actions/profile'

const CreateProfile = (props) => {
    const [formData,setFormData]=useState({
        year:'',
        school:'',
        company:'',
        website:'',
        location:'',
        bio:'',
        instagram:'',
        linkedin:'',
    });
    const{
        company,
        website,
        location,
        bio,
        instagram,
        linkedin,
        year,
        school
    }=formData;
    const onChange = e=> {setFormData({...formData,[e.target.name]:e.target.value})}

    const formSubmithandler=e=>{
        e.preventDefault();
        props.createProfile(formData,props.history);
    }
    return (
        <Fragment>
            <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information for your profile.
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e=>formSubmithandler(e)}>
      <div className="form-group">
          <input type="month" placeholder="year of graduation" name="year" value={year} onChange={e=>onChange(e)}/>
          <small className="form-text"
            >*In which year did you graduate?</small
          >
        </div>
        <div className="form-group">
          <select name="school" value={school} onChange={e=>onChange(e)}>
            <option value="0">Select Your School</option>
            <option value="School of Technology">School of Technology</option>
            <option value="School of Liberal Studies">School of Liberal Studies</option>
            <option value="School of petroleum Technology">School of petroleum Technology</option>
            <option value="School of Management">School of Management</option>

          </select>
          <small className="form-text">
            *In which school did you study during your graduation?
            </small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Company" name="company" value={company} onChange={e=>onChange(e)}/>
          <small className="form-text"
            >Could be your own company or one you work for</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Website" name="website" value={website} onChange={e=>onChange(e)} />
          <small className="form-text"
            >Could be your own or a company website</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={e=>onChange(e)}/>
          <small className="form-text"
            >*City & state suggested (eg. Boston, MA)</small
          >
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={e=>onChange(e)}></textarea>
          <small className="form-text">*Tell us a little about yourself, what have you been upto?</small>
        </div>
        <div className="form-group">
          <textarea placeholder="Instagram Id (if any)" name="instagram" value={instagram} onChange={e=>onChange(e)}></textarea>
          <small className="form-text">Social media links</small>
        </div>
        <div className="form-group">
          <textarea placeholder="Linked Id (if any)" name="linkedin" value={linkedin} onChange={e=>onChange(e)}></textarea>
          <small className="form-text">Social media links</small>
        </div>

        
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
        </Fragment>
    )
}

CreateProfile.propTypes = {
    createProfile:PropTypes.func.isRequired,
}

export default connect(null,{createProfile})(withRouter(CreateProfile));
