import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { Button, Checkbox, SmallButton, SmallButton2, TextInput } from '../components/inputs';
import Navbar from '../components/navbar';
import {tryGetRelevantListings} from '../middleware/search';
import Listing from '../components/listing';
import { colors } from '../utils/colors';
import { FilterOutlined } from '@ant-design/icons';
import { Header24, Subheader20 } from '../components/fonts';
import { useNavigate } from 'react-router-dom';

const SearchPage = ({searchData, tryGetRelevantListings}) => {
    const [listings, setListings] = useState([]);
    const [filterView, setFilterView] = useState(false);
    let history = useNavigate();

    useEffect(() => {
        async function get() {
            const l = await tryGetRelevantListings(0, 0, 0)
            console.log(l)
            setListings(l)
        }
        get();
    }, [searchData, tryGetRelevantListings]);


    return (
        <div>
            <Navbar></Navbar>
            <div style={{display: 'inline-flex', gap: '1rem', marginLeft: '4rem', alignItems: 'center'}}>
                <div><TextInput placeholder="Anywhere" title="LOCATION"></TextInput></div>

                <div style={{border: '1px solid' + colors.secondary, borderRadius: '1rem', padding: '1rem', fontFamily: 'Playfair Display', fontWeight: 'bold', cursor: 'pointer', color: colors.tertiary}}>
                    <div onClick={() => setFilterView(true)}><FilterOutlined /> FILTERS</div>
                </div>
            </div>
            <br />
            <br />
            <div style={{fontFamily: 'Playfair Display', fontWeight: 'bold', marginLeft: '4rem', fontSize: '20px'}}>{listings.length} yards</div>
            <br />
            <div style={{display: 'inline-flex', justifyContent: 'space-evenly', flexWrap: 'wrap', gap: '2rem', margin: '0 2rem'}}>
                {listings.map((listing) => (
                    <Listing key={listing.id} listing={listing} viewListing={() => history('/listing/' + listing.id)}/>
                ))}
            </div>
            {filterView && (
                <Header24>
                    <div style={{
                        position: 'fixed', 
                        width: '100%', 
                        backgroundColor: 'rgba(0, 0, 0, .5)', 
                        top: 0, 
                        bottom: 0}}
                        onClick={() => setFilterView(false)}
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
                        <div style={{textAlign: 'center'}}>Filters</div>
                        <hr style={{backgroundColor: colors.primary}}></hr>
                        <br />
                        <div style={{padding: '0 1rem'}}>
                            Plot/Planter Size
                            <br />
                            <div style={{display: 'inline-flex', alignItems: 'center'}}>
                                <TextInput title="min size" placeholder="0 sq ft."/>
                                &nbsp;---&nbsp;
                                <TextInput title="max size" placeholder="1000+ sq ft."/>
                            </div>
                            <br />
                            <br />
                            Type of Space
                            <br />
                            <div>
                                <Checkbox title={"Private plot/planter(s)"}/>
                                <Checkbox title={"Shared plot/planter(s)"}/>
                                <Checkbox title={"Entire yard/garden"}/>
                            </div>
                            <br />
                            Amenities
                            <br />
                            <div>
                                <Checkbox title={"Sprinkler system"}/>
                                <Checkbox title={"Hose"}/>
                                <Checkbox title={"Wheelbarrow"}/>
                                <Checkbox title={"Seating"}/>
                                <Checkbox title={"Compost barrel"}/>
                            </div>
                        </div>
                        <hr></hr>
                        <div style={{display: 'inline-flex', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
                            <Subheader20>Clear all</Subheader20>
                            <div style={{display: 'inline-flex'}}>
                                <SmallButton2 title={"Cancel"} onClick={() => setFilterView(false)}/>
                                &nbsp;&nbsp;
                                <SmallButton title={"Apply"}/>
                            </div>
                            
                        </div>
                    </div>
                </Header24>
            )}
        </div>
    )
}
const mapStateToProps = state => ({
    searchData: state.data.get("search")
});

const mapDispatchToProps = dispatch => ({
    tryGetRelevantListings: (longitude, latitude, milesRadius) => dispatch(tryGetRelevantListings(longitude, latitude, milesRadius))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);