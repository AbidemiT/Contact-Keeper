import React, {useContext, useState, useEffect} from 'react';
import ContactContext from "../../context/contact/contactContext";
import AlertContext from "../../context/alert/alertContext";

const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const alertContext = useContext(AlertContext);
    const {current, addContact, clearCurrent, updateContact} = contactContext;
    const {setAlert} = alertContext; 

    useEffect(() => {
        if (current !== null) {
            setContact(current);
        } else {
            setContact({name: "",
                email: "",
        phone: "",
        type: "personal"})
        }
    }, [contactContext, current]);

    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        type: "personal"
    });

    const {name,email,phone,type, _id} = contact;
    

    const onSubmit = (e) => {
        e.preventDefault();

        if (name === "" || email === "" || phone === "") {
            setAlert("Contact fields are required", "danger");
        } else if (current === null) { 
            addContact(contact); 
        } else {
            updateContact(contact);
        }
        
        clearAll();
    }

    const clearAll = () => {
        clearCurrent();
    }

    const onChange = (e) => {
        setContact({...contact, [e.target.name]: e.target.value});
    }
    return (
        <div className="form-container">
            <h2 className="m-leading my-1">{current !== null ? "Edit Contact": "Add Contact" }</h2>
            <form onSubmit={onSubmit}>
               <div className="form-group">
                   <label htmlFor="name">Name</label>
                   <input type="text" name="name" id="name" placeholder="Enter Fullname" value={name} onChange={onChange}/>
                </div> 
               <div className="form-group">
                   <label htmlFor="email">Email</label>
                   <input type="email" name="email" id="email" placeholder="Enter Email Address" value={email} onChange={onChange}/>
                </div> 
               <div className="form-group">
                   <label htmlFor="phone">Phone</label>
                   <input type="text" name="phone" id="phone" placeholder="Enter Phone Number" value={phone} onChange={onChange}/>
                </div> 
               <div className="form-group">
                   <input type="radio" name="type" value="personal" checked={type === "personal"} onChange={onChange}/> Personal{" "}
                   <input type="radio" name="type" value="professional" checked={type === "professional"} onChange={onChange}/> Professional
                </div> 
               <div className="form-group">   
                    <button type="submit" className="btn btn-sm btn-dark btn-block">{current !== null ? "Update Contact": "Add Contact" }</button>
                </div> 
                {current && <button type="submit" className="btn btn-sm btn-light btn-block" onClick={clearAll}>Clear</button>}
            </form>

        </div>
    )
}

export default ContactForm;
