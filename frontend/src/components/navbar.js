import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {colors} from '../utils/colors';

const Navbar = ({authenticated}) => {
    let history = useNavigate();

    return (
        <div>
            <div style={{display: 'inline-flex', justifyContent: "space-between", width: '100%', alignItems: 'center'}}>
                <div style={{marginLeft: '4rem', cursor: 'pointer'}} onClick={() => history('/')}>
                    <img src="https://res.cloudinary.com/dou0q4ekk/image/upload/v1664688990/Component_1_rzndy9.png" alt="Logo"/>
                </div>
                <div style={{
                    display: 'inline-flex', 
                    width: 'calc(100% - 12rem)', 
                    justifyContent: 'flex-end', 
                    fontFamily: 'Playfair Display', 
                    gap: '2rem',
                    fontSize: '24px',
                    padding: '0 6rem',
                    marginBottom: '1rem',
                    color: colors.tertiary
                }}>
                    {authenticated?.get("id") ?
                        <>
                            <p onClick={() => history("/my-yard")} style={{cursor: 'pointer'}}>My Yard</p>
                            <p onClick={() => history("/settings")} style={{cursor: 'pointer'}}>Settings</p>
                        </>
                        :
                        <>
                            <p onClick={() => history("/sponsor")} style={{cursor: 'pointer'}}>Sponsor</p>
                            {/* <p style={{cursor: 'pointer'}}>Share your yard</p> */}
                            <p onClick={() => history("/signup")} style={{cursor: 'pointer'}}>Signup</p>
                            <p onClick={() => history("/login")} style={{cursor: 'pointer'}}>Login</p>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = state => ({
    authenticated: state.data.get("user")
});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);