import {React, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';
import '../../App.css';
const Navbar=(props)=> {
  const authLinks=(
    <ul>
      <li><Link to="/profiles">Alumni</Link></li>
      <li><Link to="/dashboard">
      <i className="fas fa-user"></i>{' '}<span className="hide-sm"> Dashboard</span></Link></li>
        <li><a onClick={props.logout} href='#!'>
          <i className="fas fa-sign-out-alt"></i>{' '}
         <span className="hide-sm"> Logout</span></a></li>
        
      </ul>
  )

  const guestLinks=(
    <ul>
        <li><Link to="/profiles">Alumni</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>

  )
    return (
      <Fragment>
           <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-graduation-cap"></i> AlumniConnect</Link>
      </h1>
      {console.log(props.auth.loading)}
      {!props.auth.loading &&(<Fragment>{props.auth.isAuthenticated? authLinks:guestLinks}</Fragment>)}
    </nav>
      </Fragment>
    );
  }

  Navbar.propTypes={
    logout:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired
    //This means that prop must be a function
  }
  const mapStateToProps= state=>({
    auth:state.auth
  });

  export default connect(mapStateToProps,{logout})(Navbar);
