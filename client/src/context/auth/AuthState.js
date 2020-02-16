import React, {useReducer} from "react";
import axios from "axios";
import authReducer from "../auth/authReducer";
import AuthContext from "../auth/authContext";
import setAuthToken from "../../utils/setAuthToken";

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from "../types";

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem("token"),
        isAuthenticated: null,
        user: null,
        error: null,
        loading: true
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Actions

    // Load User
    const loadUser = async () => {
        // Todo Load token into default headers
        const url = "/api/auth";
        const token = localStorage.getItem("token");

        if(token) {
            setAuthToken(token);
        }

        try {
            const res = await axios.get(url);
            dispatch({type: USER_LOADED, payload: res.data.user});
        } catch (error) {
            dispatch({type: AUTH_ERROR});
        }
    }

    // Register User
    const register = async formData => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        
        const url = "/api/users";
        
        try {
            const res = await axios.post(url, formData, config);
            
            dispatch({type: REGISTER_SUCCESS, payload: res.data});

            loadUser();
        } catch (err) {
            dispatch({type: REGISTER_FAIL, payload: err.response.data.msg})
        }
    }

    // Login User
    const login = async formData => {

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        
        const url = "/api/auth";
        
        try {
            const res = await axios.post(url, formData, config);
            
            dispatch({type: LOGIN_SUCCESS, payload: res.data});

            loadUser();
        } catch (err) {
            dispatch({type: LOGIN_FAIL, payload: err.response.data.msg})
        }
    }

    // Logout
    const logout = () => {
        dispatch({type: LOGOUT});
    }

    // Clear Errors
    const clearError = () => {
        dispatch({type: CLEAR_ERRORS})
    }

    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            user: state.user,
            loading: state.loading,
            error: state.error,
            register,
            login,
            clearError,
            loadUser,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}


export default AuthState;