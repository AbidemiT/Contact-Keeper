import React, {useState, useContext, useEffect} from 'react';
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import LOADING from "../layout/Loading";

const Register = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const {register, error, clearError, isAuthenticated, loading} = authContext;
    const {setAlert} = alertContext;

    useEffect(() => {
        if (isAuthenticated) {
           props.history.push("/");
        }

        if(error === "User already exist") {
            setAlert(error, "danger");
            clearError();
        }

        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    });

    const {name, email, password, cpassword} = user;

    const onSubmit = (e) => {
        e.preventDefault();
        if (name === "" || email === "" || password === "") {
           setAlert("Fields are required", "danger");
        } else if(password  !== cpassword) {
            setAlert("Passwords do not match", "danger");
        } else {
            register({
                name,
                email,
                password
            });
        }
    }

    const onChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    return (
        <div className="form-container">
            <h1>Account <span className="text-primary">Register</span></h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" placeholder="Enter Your Full Name" value={name} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="Enter Your Email Address" value={email} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" name="cpassword" value={cpassword} onChange={onChange}/>
                </div>

                <input type="submit" value="Submit" className="btn btn-dark btn-block"/>
            </form>

            {/* {loading && <LOADING/>} */}
        </div>
    )
}

export default Register;
