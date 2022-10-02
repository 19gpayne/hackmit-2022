import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Header24, Header32, Subheader20 } from '../components/fonts';
import { SmallButton2 } from '../components/inputs';
import Navbar from '../components/navbar';
import {tryGetListing} from '../middleware/search';
import { capitalizeFirstLetter } from '../utils/functions';

const Listing = ({tryGetListing}) => {
    const [listing, setListing] = useState(null);
    const [tags, setTags] = useState([]);

    const parseTags = () => {
        let tagsList = []
        if (listing.info.hasPets) {
            tagsList.push("Pet Friendly")
        }
        if (listing.info.type) {
            tagsList.push(capitalizeFirstLetter(listing.info.type))
        }
        if (listing.info.light) {
            tagsList.push(capitalizeFirstLetter(listing.info.light.split("Light")[0] + " light"))
        }
        if (listing.info.ownerWaters) {
            tagsList.push("Watering provided")
        }
        return tagsList
    }

    useEffect(() => {
        const listingId = window.location.pathname.split("/")[2]
        async function get() {
            const l = await tryGetListing(listingId);
            await setListing(l)
        }
        get();
    }, []);

    useEffect(() => {
        if (listing) {
            setTags(parseTags())
        }
    }, [listing]);

    if (!listing) {
        return <div>Loading!</div>
    }
    return (
        <div>
            <Navbar></Navbar>
            <div style={{width: 'calc(100% - 4rem)', marginLeft: '4rem'}}>
                <Header32>{listing.description}</Header32>
                <br />
                <div style={{display: 'inline-flex'}}>
                    {tags.map(tag => (
                        <SmallButton2 key={tag} title={tag}/>
                    ))}
                </div>
                <br />
                <br />
                <Subheader20>{listing.description}</Subheader20>
            </div>
        </div>
    )
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
    tryGetListing: (id) => dispatch(tryGetListing(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Listing);