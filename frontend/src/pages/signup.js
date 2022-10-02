import React, {useState} from 'react';
import { connect } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { tryCreateUser } from '../middleware/auth';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState("");

    let history = useNavigate();

    const signup = async () => {
        if (email !== "" && password !== "" && name !== "" && password === password2) {
            const createSuccess = await tryCreateUser(name, email, password)
            if (createSuccess) {
                history("/")
            } else {
                setError("Something went wrong. Try again")
            }
        } else if (password !== password2 && password && password2) {
            setError("Passwords must match")
        } else {
            setError("Enter valid information to create an account");
        }
    }

    return (
        <div>
            <h1>GARDENSHARE</h1>
            <input onChange={(e) => setName(e.target.value)} placeholder="Your Name" />
            <input onChange={(e) => setEmail(e.target.value)} placeholder="example@email.com" />
            <input onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
            <input onChange={(e) => setPassword2(e.target.value)} placeholder="Password" type="password" />
            <div>{error}</div>
            <button onClick={signup}>Sign Up</button>
        </div>
    )
}
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);