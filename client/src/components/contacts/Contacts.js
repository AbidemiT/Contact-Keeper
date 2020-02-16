import React, {
    Fragment,
    useContext,
    useEffect
} from 'react';
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "../contacts/ContactItem";
import LOADING from "../layout/Loading";
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';


const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const {getContacts, loading} = contactContext;

    useEffect(() => {
        getContacts();
        // eslint-disable-next-line
    }, []);

    const {
        contacts,
        filtered
    } = contactContext;
    if (contacts !== null && contacts.length === 0 && !loading) {
        return <h4 > Please Add contact </h4>
    }
    return ( 
        <Fragment>
            {contacts !== null && !loading ? <div> 
                <TransitionGroup>
                    {filtered ? filtered.map(contact => <CSSTransition key={contact._id} timeout={500}
              classNames="item">
                        <ContactItem contact={contact}/>
                        </CSSTransition>) : contacts.map(contact => <CSSTransition key={contact._id} timeout={500}
              classNames="item">
                        <ContactItem contact={contact}/>
                        </CSSTransition> )
                    } 
                </TransitionGroup>
            </div> : <LOADING/>}
        </Fragment>
    )
}

export default Contacts;