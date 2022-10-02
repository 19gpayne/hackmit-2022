import React, {useState} from 'react';
import { connect } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {tryLoginUser} from '../middleware/auth';

const Login = ({tryLoginUser}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    let history = useNavigate();

    const login = async () => {
        if (email !== "" && password !== "") {
            const loginSuccess = await tryLoginUser(email, password)
            if (loginSuccess) {
                history("/")
            } else {
                setError("Invalid email or password")
            }
        } else {
            setError("Enter valid email and password")
        }
    }

    return (
        <div>
            <h1>GARDENSHARE</h1>
            <input onChange={(e) => setEmail(e.target.value)} placeholder="example@email.com" />
            <input onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password" />
            <div>{error}</div>
            <button onClick={login}>Login</button>
        </div>
    )
}
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({
    tryLoginUser: (email, password) => dispatch(tryLoginUser(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);