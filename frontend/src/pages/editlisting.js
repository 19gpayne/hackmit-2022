import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Header32, Header24, Subheader20 } from '../components/fonts';
import { SmallButton, SmallButton2 } from '../components/inputs';
import Navbar from '../components/navbar';
import {tryGetListing} from '../middleware/search';
import { colors } from '../utils/colors';
import { capitalizeFirstLetter } from '../utils/functions';
import {ClockCircleOutlined, RightOutlined, PlusOutlined, CloseOutlined} from '@ant-design/icons';
import ContentEditable from 'react-contenteditable'

const Listing = ({tryGetListing}) => {
    const [listing, setListing] = useState(null);
    const [tags, setTags] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

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

    useEffect(() => {
        const listingId = window.location.pathname.split("/")[2]
        async function get() {
            const l = await tryGetListing(listingId);
            await setListing(l)
            await setTitle(l.title)
            await setDescription(l.description)
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
            <div style={{width: 'calc(100% - 8rem)', marginLeft: '4rem'}}>
                <div style={{backgroundColor: colors.gray, padding: '1rem', borderRadius: '1rem', display: 'flex', justifyContent: 'space-between', cursor: 'pointer'}}>
                    <Header24><ClockCircleOutlined style={{color: colors.accent}}/>&nbsp;&nbsp;View Applicants</Header24>
                    <Header24 style={{color: colors.primary}}><RightOutlined /></Header24>
                </div>
                <br />
                <div style={{justifyContent: 'space-between', display: 'flex'}}>
                    <Header32>
                        <ContentEditable
                            html={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={{outline: '2px solid' + colors.accent, padding: '0.5rem', borderRadius: '1rem'}}
                        />
                    </Header32>
                    <div style={{width: 'fit-content'}}><SmallButton title="Save"/></div>
                </div>
                <br />
                <div style={{display: 'inline-flex', gap: '0.5rem'}}>
                    {tags.map(tag => (
                        <div style={{position: 'relative'}}>
                            <div style={{position: 'absolute', borderRadius: '50%', backgroundColor: colors.accent, top: '-0.375rem', right: '-0.125rem', width: '1.25rem', height: '1.25rem', color: 'white', textAlign: 'center'}}><CloseOutlined /></div>
                            <SmallButton2 key={tag} title={tag}/>
                        </div>
                    ))}
                    <SmallButton2 title={<PlusOutlined />} color={colors.accent}/>
                </div>
                <br />
                <br />
                <div style={{display: 'flex', alignItems: 'center', gap: '2rem'}}>
                    {listing.images.map((photo) => (
                        <img key={photo} src={photo} alt={listing.title} style={{borderRadius: '1rem', maxWidth: "30%"}}/>
                    ))}
                    {listing.images.length < 3 && <SmallButton2 title={<PlusOutlined />} color={colors.accent}/>}
                </div>
                <br />
                <Subheader20><p>
                    <ContentEditable
                        html={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{outline: '2px solid' + colors.accent, padding: '0.5rem', borderRadius: '1rem'}}
                    />
                </p></Subheader20>
            </div>
        </div>
    )
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
    tryGetListing: (id) => dispatch(tryGetListing(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Listing);