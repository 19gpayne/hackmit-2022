import React, {useState} from 'react';
import { connect } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {tryLoginUser} from '../middleware/auth';
import Navbar from '../components/navbar';
import {Button, Button2, TextInput} from '../components/inputs';
import { Subheader20 } from '../components/fonts';

const Login = ({tryLoginUser}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    let history = useNavigate();

    const login = async () => {
        if (email !== "" && password !== "") {
            const loginSuccess = await tryLoginUser(email, password)
            if (loginSuccess) {
                history("/my-yard")
            } else {
                setError("Invalid email or password")
            }
        } else {
            setError("Enter valid email and password")
        }
    }

    return (
        <div>
            <Navbar></Navbar>
            <hr></hr>
            <br />
            <div style={{width: '50%', margin: '0 auto'}}>
                <TextInput title="Email" onChange={(e) => setEmail(e.target.value)} placeholder="example@email.com" value={email}/>
                <br />
                <TextInput title="Password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" value={password} />
                <br />
                <div>{error}</div>
                <br />
                <Button onClick={login} title="Continue" />
                <br />
                <div style={{textAlign: 'center'}}><Subheader20>or</Subheader20></div>
                <br />
                <Button2 title="Continue with Google" />
            </div>
        </div>
    )
}
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({
    tryLoginUser: (email, password) => dispatch(tryLoginUser(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);