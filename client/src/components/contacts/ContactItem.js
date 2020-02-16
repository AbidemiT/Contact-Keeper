import React, {useContext} from 'react';
import ContactContext from "../../context/contact/contactContext";

const ContactItem = ({contact}) => {
    const contactContext = useContext(ContactContext);
    const {deleteContact, setCurrent, clearCurrent} = contactContext;

    

    const {_id, name, email, type, phone} = contact;

    const onDelete = () => {
        deleteContact(_id);
        clearCurrent();
    }

    const getCurrent = () => {
        setCurrent(contact);
    }
    

    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">{name}{" "} <span style={{float: "right"}} className={"badge " + (type === "professional" ? "badge-success": "badge-primary")}>{type.charAt(0).toUpperCase() + type.slice(1)}</span></h3>
            <ul className="list">
                {email && (<li> <i className="fa fa-envelope" aria-hidden="true"></i> {email}</li>)}
                {phone && (<li> <i className="fa fa-phone" aria-hidden="true"></i> {phone}</li>)}
            </ul>
            <div className="my-1">
                <button className="btn btn-primary btn-sm" onClick={getCurrent}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
            </div>
        </div>
    )
}

export default ContactItem;
