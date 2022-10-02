import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { Button, Checkbox, SmallButton, SmallButton2, TextInput } from '../components/inputs';
import Navbar from '../components/navbar';
import {tryGetRelevantListings} from '../middleware/search';
import Listing from '../components/listing';
import { colors } from '../utils/colors';
import { FilterOutlined } from '@ant-design/icons';
import { Header24, Subheader20, Text14 } from '../components/fonts';
import { useNavigate } from 'react-router-dom';
import Geocode from "react-geocode";
import { Country, State, City }  from 'country-state-city';
import {setSearchParameters} from '../store/reducer';

const SearchPage = ({searchData, tryGetRelevantListings}) => {
    const [listings, setListings] = useState([]);
    const [searchLocation, setSearchLocation] = useState("");
    const [filterView, setFilterView] = useState(false);
    const [autocompleteVisible, setAutocompleteVisible] = useState(false);
    const [coords, setCoords] = useState({lat: 0, lng: 0})
    let history = useNavigate();

    useEffect(() => {
        async function get() {
            const l = await tryGetRelevantListings(coords.lat, coords.lng, 25)
            setListings(l)
            console.log(l)
        }
        get();
    }, [coords]);

    useEffect(() => {
        async function get() {
            const l = await tryGetRelevantListings(
                searchData.get("coordinates").get("latitude"), 
                searchData.get("coordinates").get("longitude"), 
                searchData.get("radius")
            )
            setListings(l)
        }
        get();
    }, [searchData, tryGetRelevantListings]);

    useEffect(() => {
        async function get() {
            Geocode.fromLatLng(
                searchData.get("coordinates").get("latitude"), 
                searchData.get("coordinates").get("longitude")).then(
                (response) => {
                  let city, state
                  for (let i = 0; i < response.results[0].address_components.length; i++) {
                    for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
                      switch (response.results[0].address_components[i].types[j]) {
                        case "locality":
                          city = response.results[0].address_components[i].long_name;
                          break;
                        case "administrative_area_level_1":
                          state = response.results[0].address_components[i].long_name;
                          break;
                      }
                    }
                  }
                  setSearchLocation(city + ", " + state)
                },
                (error) => {
                  console.error(error);
                }
              );
        }
        get();
    }, []);

    const updateSearch = async () => {
        const loc = searchLocation !== "" ? searchLocation : "New York City, New York"
        Geocode.fromAddress(loc).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                setCoords({lat: lat, lng: lng})
            },
            (error) => {
                console.error(error);
            }
        ) 
    }

    return (
        <div>
            <Navbar></Navbar>
            <div style={{display: 'inline-flex', gap: '1rem', marginLeft: '4rem', alignItems: 'center'}}>
                <div>
                    <div><TextInput placeholder="Anywhere" title="LOCATION" value={searchLocation} onChange={(e) => {setSearchLocation(e.target.value); setAutocompleteVisible(true)}}></TextInput></div>
                    {(searchLocation && autocompleteVisible) && 
                        <div>
                            {City.getCitiesOfCountry('US').filter((city) => (
                                city.stateCode.toLowerCase().includes(searchLocation.toLowerCase()) || 
                                city.name.toLowerCase().includes(searchLocation.split(", ")[0].toLowerCase()) && 
                                (searchLocation.includes(", ") ? city.stateCode.toLowerCase().includes(searchLocation.split(", ")[1].toLowerCase()) : true)
                            )
                            ).slice(0, 2).map((city => (
                                <Text14 style={{
                                    border: '1px solid' + colors.secondary, 
                                    padding: '0.5rem 1rem', 
                                    borderRadius: '1rem', 
                                    cursor: 'pointer',
                                }}
                                    onClick={() => {setSearchLocation(city.name + ", " + city.stateCode); setAutocompleteVisible(false)}}
                                >
                                    {city.name}, {city.stateCode}
                                </Text14>
                            )))}
                        </div>
                    }
                </div>
                <div style={{border: '1px solid' + colors.secondary, borderRadius: '1rem', padding: '1rem', fontFamily: 'Playfair Display', fontWeight: 'bold', cursor: 'pointer', color: colors.tertiary}}>
                    <div onClick={() => setFilterView(true)}><FilterOutlined /> FILTERS</div>
                </div>
                <Button title="Search" onClick={updateSearch}/>
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
                            <div style={{gap: '1rem', display: 'flex'}}>
                                <Checkbox title={"Private plot/planter(s)"}/>
                                <Checkbox title={"Shared plot/planter(s)"}/>
                                <Checkbox title={"Entire yard/garden"}/>
                            </div>
                            <br />
                            Amenities
                            <br />
                            <div style={{gap: '1rem', display: 'flex'}}>
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
                                <SmallButton title={"Apply"} onClick={() => setFilterView(false)}/>
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
    tryGetRelevantListings: (longitude, latitude, milesRadius) => dispatch(tryGetRelevantListings(longitude, latitude, milesRadius)),
    setSearchParameters: (data) => dispatch(setSearchParameters(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);