import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Navbar from '../components/navbar';
import Listing from '../components/listing';
import {tryGetUserListings} from '../middleware/search';

const Portal = ({userId, tryGetUserListings}) => {
    let history = useNavigate();
    const [listings, setListings] = useState([]);

    useEffect(() => {
        async function get() {
            const l = await tryGetUserListings(userId);
            await setListings(l)
        }
        get();
    }, [tryGetUserListings, userId]);

    return (
        <div>
            <Navbar></Navbar>
            <div style={{width: '40%', margin: '0 auto'}}>
                {listings.map(listing => (
                    <div key={listing.id}>
                        <Listing listing={listing} viewListing={() => history('/my-yard/' + listing.id)} fromUser={true}/>
                        <br />
                    </div>
                ))}
            </div>
        </div>
    )
}
const mapStateToProps = state => ({
    userId: state.data.get("user").get("id")
});

const mapDispatchToProps = dispatch => ({
    tryGetUserListings: (userId) => dispatch(tryGetUserListings(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Portal);