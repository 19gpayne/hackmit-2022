import React, {useState} from 'react';
import { connect } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { tryCreateUser } from '../middleware/auth';
import Navbar from '../components/navbar';
import {Button, Button2, TextInput} from '../components/inputs';
import { Subheader20 } from '../components/fonts';
import {GoogleLogin} from 'react-google-login';
import {GOOGLE_LOGIN_API_KEY} from '../var';

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
            <Navbar></Navbar>
            <hr></hr>
            <br />
            <div style={{width: '50%', margin: '0 auto'}}>
                <TextInput title="Name" onChange={(e) => setName(e.target.value)} placeholder="Your Name" value={name}/>
                <br />
                <TextInput title="Email" type="email" onChange={(e) => setEmail(e.target.value)} placeholder="example@email.com" value={email}/>
                <br />
                <TextInput title="Password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" value={password} />
                <br />
                <TextInput title="Confirm Password" onChange={(e) => setPassword2(e.target.value)} placeholder="Confirm password" type="password" value={password2} />
                <br />
                <div>{error}</div>
                <br />
                <Button onClick={signup} title="Continue" />
                <br />
                <div style={{textAlign: 'center'}}><Subheader20>or</Subheader20></div>
                <br />
                <GoogleLogin
                    clientId={GOOGLE_LOGIN_API_KEY}
                    render={renderProps => (
                        <Button2 onClick={renderProps.onClick} title="Continue with Google" />
                    )}
                    onSuccess={() => {}}
                    onFailure={() => {}}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        </div>


    )
}
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);