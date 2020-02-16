import {
    ADD_CONTACT,
    CONTACT_ERROR,
    UPDATE_CONTACT,
    SET_CURRENT,
    CLEAR_FILTER,
    FILTER_CONTACTS,
    CLEAR_CURRENT,
    DELETE_CONTACT,
    GET_CONTACTS,
    CLEAR_CONTACTS
} from "../types";

export default (state, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.payload], // State is immutable to change it we have to bring in the current state content
                loading: false
            }
        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload,
                loading: false
            }
        case CONTACT_ERROR:
            return {
                ...state,
                errors: action.payload
            }
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact._id !== action.payload),
                loading: false
            }
        case FILTER_CONTACTS:
            return {
                ...state,
                filtered: state.contacts.filter(contact => {
                    const regex = new RegExp(`${action.payload}`, "gi");
                    return contact.name.match(regex) || contact.email.match(regex);
                })
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }
        case CLEAR_CONTACTS:
            return {
                ...state,
                errors: null,
                contacts:null,
                loading: false,
                current: null,
                filtered: null
            }
        case CLEAR_FILTER:
            return{
                ...state,
                filtered: null
            }
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact => contact._id === action.payload._id ? action.payload : contact),
                loading: false
            }
    
        default:
            return state;
    }
}