import React, {useContext} from 'react';
import AlertContext from "../../context/alert/alertContext";

const Alert = () => {
    const alertContext = useContext(AlertContext);
    const {alerts} = alertContext;
    return (
        alerts.length > 0 && alerts.map(alert => (
            <div key={alert.id}>
                <p className={`alert alert-${alert.type}`}><i className="fa fa-info-circle" aria-hidden="true"></i> {alert.msg}</p>
            </div>
        ))
    )
}

export default Alert
