import {React,Fragment} from 'react';
import {Link,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import '../../App.css';
const Landing=(props)=> { 
  const landingpage=(<section className="landing">
  <div className="dark-overlay">
    <div className="landing-inner">
      <h1 className="x-large">Alumni Connect</h1>
      <p className="lead">
        Create a profile to connect with other alumnis of your institution.
      </p>
      <div className="buttons">
        <Link to="/register" className="btn btn-primary">Sign Up</Link>
        <Link to="/login" className="btn btn-light">Login</Link>
      </div>
    </div>
  </div>
</section>);
  return (
      <Fragment>
        {!props.isAuthenticated?landingpage:<Redirect to="/dashboard" />}
      </Fragment>
    );
  }
  const mapStateToProps=state=>({
    isAuthenticated: state.auth.isAuthenticated
  })
  export default connect(mapStateToProps,null)(Landing);
