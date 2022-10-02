import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Header32, Subheader20 } from '../components/fonts';
import { SmallButton, SmallButton2 } from '../components/inputs';
import Navbar from '../components/navbar';
import {tryGetListing} from '../middleware/search';
import { capitalizeFirstLetter } from '../utils/functions';

const Listing = ({tryGetListing}) => {
    const [listing, setListing] = useState(null);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const listingId = window.location.pathname.split("/")[2]
        async function get() {
            const l = await tryGetListing(listingId);
            await setListing(l)
        }
        get();
    }, [tryGetListing]);

    useEffect(() => {
        const parseTags = () => {
            let tagsList = []
            if (listing.info.hasPets) {
                tagsList.push("Pet friendly")
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
                <div style={{justifyContent: 'space-between', display: 'flex', marginRight: '4rem'}}>
                    <Header32>{listing.title}</Header32>
                    <div style={{width: 'fit-content'}}><SmallButton title="Apply"/></div>
                </div>
                <br />
                <div style={{display: 'inline-flex', gap: '0.5rem'}}>
                    {tags.map(tag => (
                        <SmallButton2 key={tag} title={tag}/>
                    ))}
                </div>
                <br />
                <br />
                <div style={{display: 'flex', alignItems: 'center', gap: '2rem'}}>
                    {listing.images.map((photo) => (
                        <img key={photo} src={photo} alt={listing.title} style={{borderRadius: '1rem', maxWidth: "30%"}}/>
                    ))}
                </div>
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