import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
const Alert = ({alerts})=>alerts!==null && alerts.map(alert=>(
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>

            {alert.msg}
    </div>
));

Alert.PropTypes={

}
//If your mapStateToProps function is declared as taking one parameter, it will be called whenever the store state changes,
// and given the store state as the only parameter.
const mapStateToProps= state =>({
    alerts: state.alert
});
//The connect() function connects a React component to a Redux store.

//It provides its connected component 
//with the pieces of the data it needs from the store, 
//and the functions it can use to dispatch actions to the store.

//It does not modify the component class passed to it;
// instead, it returns a new, connected component class that wraps the component you passed in.
export default connect(mapStateToProps)(Alert);