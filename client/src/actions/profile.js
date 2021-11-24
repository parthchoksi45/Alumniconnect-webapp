import axios from "axios";

import {
    GET_PROFILE,
    PROFILE_ERROR,
    GET_PROFILES
} from './types';

import { setAlert } from "./alert";

//get current profile
export const getCurrentProfile=()=> async dispatch=>{
    try{
          const res= await axios.get('/api/profile/me');
          dispatch({
                type:GET_PROFILE,
                payload:res.data
          });
    }
    catch(err){
            dispatch({
                type:PROFILE_ERROR,
                payload:{msg: err.response.statusText, status: err.response.status}
            });
    }
}
//Get profile By Id
export const getProfileById=(id)=> async dispatch=>{
    try{
          const res= await axios.get(`/api/profile/user/${id}`);
          dispatch({
                type:GET_PROFILE,
                payload:res.data
          });
    }
    catch(err){
            dispatch({
                type:PROFILE_ERROR,
                payload:{msg: err.response.statusText, status: err.response.status}
            });
    }
}
//Get all profiles
export const getProfiles=()=> async dispatch=>{
    try{
          const res= await axios.get('/api/profile');
          dispatch({
                type:GET_PROFILES,
                payload:res.data
          });
    }
    catch(err){
            dispatch({
                type:PROFILE_ERROR,
                payload:{msg: err.response.statusText, status: err.response.status}
            });
    }
}
//create or update profile

export const createProfile=(formData,history)=>async dispatch =>{
    try {
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res =await axios.post('/api/profile', formData,config);
        dispatch({
            type:GET_PROFILE,
            payload: res.data
        })
        history.push('/dashboard');
    } catch (err) {
        const errors=err.response.data.error;
        if(errors)
        {
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg: err.response.statusText, status: err.response.status}
        });
    }
}