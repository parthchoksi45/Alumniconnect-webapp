import React, { Fragment,useState } from 'react';
import {Link,Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';
//To validate the data types of props
import PropTypes from 'prop-types';
const Register = (props) =>{

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password:'',
        password2: ''
    });

    const {name, email, password, password2}=formData;

    const onChangehandler = e=> setFormData({...formData, [e.target.name]:e.target.value});

    const formSubmithandler=e=>{
        e.preventDefault();
        console.log(name);
        if(password!=password2)
        props.setAlert("Passwords do not match",'danger');
        else
        props.register({name,email,password});
    }
    //Redirect if logged in
    if(props.isAuthenticated)
    {
      return <Redirect to ='/dashboard' />;

    }
    return <Fragment>
        <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e=>formSubmithandler(e)}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={name} onChange={e=>onChangehandler(e)} required />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={e=>onChangehandler(e)} required />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password} onChange={e=>onChangehandler(e)} required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2} onChange={e=>onChangehandler(e)} required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="./Login">Sign In</Link>
      </p>
    </Fragment>
};
Register.propTypes={
  setAlert:PropTypes.func.isRequired,
  register:PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool
  //This means that prop must be a function
}
const mapStateToProps= state=>({

isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps,{setAlert,register})(Register);