import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Header32, Header24, Subheader20 } from '../components/fonts';
import { Dropdown, SmallButton, SmallButton2, TextInput } from '../components/inputs';
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
    const [showApplicants, setShowApplicants] = useState(false);

    useEffect(() => {
        const listingId = window.location.pathname.split("/")[2]
        async function get() {
            const l = await tryGetListing(listingId);
            await setListing(l)
            await setTitle(l.title)
            await setDescription(l.description)
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
            <div style={{width: 'calc(100% - 8rem)', marginLeft: '4rem'}}>
                <div style={{backgroundColor: colors.gray, padding: '1rem', borderRadius: '1rem', display: 'flex', justifyContent: 'space-between', cursor: 'pointer'}} onClick={() => setShowApplicants(true)}>
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
                <Subheader20>
                    <ContentEditable
                        html={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{outline: '2px solid' + colors.accent, padding: '0.5rem', borderRadius: '1rem'}}
                    />
                </Subheader20>
            </div>
            {(showApplicants && listing.applicants) && 
                <Header24>
                    <div style={{
                        position: 'fixed', 
                        width: '100%', 
                        backgroundColor: 'rgba(0, 0, 0, .5)', 
                        top: 0, 
                        bottom: 0}}
                        onClick={() => setShowApplicants(false)}
                    ></div>
                    <div style={{
                        boxShadow: '-0.2em 0px 0.5em gray',
                        borderRadius: '1rem',
                        padding: '1.25rem',
                        width: 'calc(100% - 27rem)',
                        backgroundColor: 'white',
                        position: 'absolute',
                        top: '4rem',
                        left: '12rem',
                    }}>
                        <div style={{textAlign: 'center'}}>Applicants</div>
                        <hr style={{backgroundColor: colors.primary}}></hr>
                        <br />
                        <div style={{padding: '0 1rem'}}>
                            {listing.applicants.map(app => (
                                <div key={app.id} style={{display: "flex", justifyContent: 'space-between', marginBottom: '1rem'}}>{app.name} <Dropdown options={['Pending', 'Accept', 'Reject']}/></div>
                            ))}
                        </div>
                        <hr></hr>
                        <div style={{display: 'inline-flex', justifyContent: 'flex-end', width: '100%', alignItems: 'center'}}>
                            <div style={{display: 'inline-flex'}}>
                                <SmallButton2 title={"Cancel"} onClick={() => setShowApplicants(false)}/>
                                &nbsp;&nbsp;
                                <SmallButton title={"Save"} onClick={() => setShowApplicants(false)}/>
                            </div>
                            
                        </div>
                    </div>
                </Header24>
            }
        </div>
    )
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
    tryGetListing: (id) => dispatch(tryGetListing(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Listing);