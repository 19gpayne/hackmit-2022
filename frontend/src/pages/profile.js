import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../components/navbar';
import {Button} from '../components/inputs';
import { useNavigate } from 'react-router-dom';
import { setStoreReset } from '../store/reducer';

const Profile = ({setStoreReset}) => {
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
                    <Button title="Logout" onClick={() => {setStoreReset(); history("/login")}}/>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
    setStoreReset: () => dispatch(setStoreReset())
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);