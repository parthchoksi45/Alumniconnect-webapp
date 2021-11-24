import React, { Fragment,useState } from 'react';
import {Link,Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import {login} from '../../actions/auth';
import PropTypes from 'prop-types';
const Login = (props) =>{

    const [formData, setFormData] = useState({
        email: '',
        password:'',
    });

    const {email, password}=formData;

    const onChangehandler = e=> setFormData({...formData, [e.target.name]:e.target.value});

    const formSubmithandler=e=>{
        e.preventDefault();
        props.login({email,password});
    }
    //Redirect if logged in
    if(props.isAuthenticated)
    {
      return <Redirect to ='/dashboard' />;

    }
    return <Fragment>
        <h1 className="large text-primary">Log In</h1>
   
      <form className="form" onSubmit={e=>formSubmithandler(e)}>
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
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="./Register">Sign Up</Link>
      </p>
    </Fragment>
};
Login.propTypes={
  login:PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool
  //This means that prop must be a function
}
const mapStateToProps= state=>({

  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps,{login})(Login);