import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../components/navbar';
import {Button} from '../components/inputs';
import { useNavigate } from 'react-router-dom';
import { setStoreReset } from '../store/reducer';
import { Header32 } from '../components/fonts';
import ContentEditable from 'react-contenteditable'
import { colors } from '../utils/colors';

const Profile = ({setStoreReset, user}) => {
    let history = useNavigate();
    return (
        <div>
            <Navbar></Navbar>
            <div style={{width: 'calc(50% - 8rem)', margin: '0 auto'}}>
                <div style={{
                    boxShadow: '-0.2em 0px 0.5em gray',
                    borderRadius: '1rem',
                    padding: '1.25rem',
                    backgroundColor: 'white',
                }}>
                    <Header32>Happy gardening, {user.get("name").split(" ")[0]}!</Header32>
                    <ContentEditable
                        html={user.get("email")}
                        onChange={() => {}}
                        style={{outline: '2px solid' + colors.accent, padding: '0.5rem', borderRadius: '1rem', margin: '1rem'}}
                    />
                    <br />
                    <Button title="Logout" onClick={() => {setStoreReset(); history("/login")}}/>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = state => ({
    user: state.data.get("user")
});
const mapDispatchToProps = dispatch => ({
    setStoreReset: () => dispatch(setStoreReset())
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);