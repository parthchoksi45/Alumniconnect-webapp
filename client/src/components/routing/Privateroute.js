import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
const Privateroute = ({component:Component,auth:{isAuthenticated,loading},...rest}) => {
    return (
        <div>
            <Route {...rest} render ={props=> !isAuthenticated && !loading?(<Redirect to='/login' />):(<Component {...props}/>)} />
        </div>
    )
}

Privateroute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps=state=>({
    auth: state.auth
})
export default connect(mapStateToProps)(Privateroute)
