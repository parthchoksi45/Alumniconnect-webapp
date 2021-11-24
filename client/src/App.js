import React, { Fragment,useEffect } from 'react';
import {BrowserRouter as Router,Routes, Route, Switch} from 'react-router-dom';
import Navbar from '../src/components/layout/Navbar';
import Landing from '../src/components/layout/Landing';
import Login from '../src/components/auth/Login';
import Register from '../src/components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import Privateroute from './components/routing/Privateroute';
import CreateProfile from './components/profile-form/CreateProfile';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile'
import './App.css';

//Redux
import {Provider} from 'react-redux';
import store from './store';

//token
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
if(localStorage.token){
  setAuthToken(localStorage.token);
}
function App() {
  useEffect(()=>{
    store.dispatch(loadUser());
  },[]);
  return (
      <Provider store={store}>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
          <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:id" component={Profile} />
              <Privateroute exact path="/dashboard" component={Dashboard} />
              <Privateroute exact path="/create-profile" component={CreateProfile} />
          </Switch>
          </section>
        </Fragment> 
       </Provider> 
  );
}

export default App;
