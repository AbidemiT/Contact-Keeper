import React, {
    useReducer
} from "react";
import axios from "axios";
import ContactContext from "../contact/contactContext";
import ContactReducer from "../contact/contactReducer";
import {
    ADD_CONTACT,
    GET_CONTACTS,
    CLEAR_CONTACTS,
    CONTACT_ERROR,
    UPDATE_CONTACT,
    DELETE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_CURRENT,
    SET_CURRENT,
    CLEAR_FILTER
} from "../types";

const ContactState = props => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        errors: null,
        loading: true
    }

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    // Create Action

    // Get Contacts
    const getContacts = async() => {
        const url = "/api/contacts";

        try {
            const res =  await axios.get(url);
            dispatch({type: GET_CONTACTS, payload: res.data});
        } catch (error) {
            dispatch({type: CONTACT_ERROR, payload: error.response.msg});
        }
    }

    // Add new Contact
    const addContact = async contact => {
        // Set header
        const config = {
            headers: {
                "Content-Types": "application/json" 
            }
        }
        const url = "/api/contacts";
        try {
            const res = await axios.post(url, contact, config);
            dispatch({type: ADD_CONTACT, payload: res.data});
        } catch (error) {
            dispatch({type: CONTACT_ERROR, payload: error.response.msg});
        }
    };

    // Delete contact
    const deleteContact = async id => {
        const url = `/api/contacts/${id}`;

        try {
            const res = await axios.delete(url);
            dispatch({type: DELETE_CONTACT, payload: id});
        } catch (error) {
            dispatch({type: CONTACT_ERROR, payload: error.response.msg});
        }
        
    };

    // Update contact
    const updateContact = async contact => {
        const url = `/api/contacts/${contact._id}`;
        const config = {
            headers: {
                "Content-Types": "application/json"
            }
        }

        try {
            const res = await axios.put(url,contact, config);
            dispatch({type: UPDATE_CONTACT, payload: res.data});
        } catch (error) {
            dispatch({type: CONTACT_ERROR, payload: error.response.msg});
        }  
    };
    // Filter Contacts
    const filterContacts = text => {
        dispatch({type: FILTER_CONTACTS, payload: text});
    }

    // Clear filter
    const clearFilter = () => {
        dispatch({type: CLEAR_FILTER})
    }
    // Set Current contact
    const setCurrent = contact => {
        dispatch({type: SET_CURRENT, payload: contact});
    }

    // Clear Current contact
    const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT});
    }

    // Clear Contacts
    const clearContacts = () => {
        dispatch({type: CLEAR_CONTACTS});
    }
    return (
        <ContactContext.Provider value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            loading: state.loading,
            errors: state.errors,
            addContact,
            deleteContact,
            filterContacts,
            clearFilter,
            clearCurrent,
            setCurrent,
            updateContact,
            getContacts,
            clearContacts
        }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;