import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Button, TextInput } from '../components/inputs';
import Navbar from '../components/navbar';
import { colors } from '../utils/colors';
import { Title36, Text14, Header32, Header24, Subheader20 } from '../components/fonts';
import Geocode from "react-geocode";
import { City }  from 'country-state-city';

const SponsorSearch = () => {
    const [searchLocation, setSearchLocation] = useState("");
    const [autocompleteVisible, setAutocompleteVisible] = useState(false);
    const [coords, setCoords] = useState({lat: 0, lng: 0})

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
            <div style={{marginLeft: '4rem'}}>
                <Title36>Search</Title36>
                <br />
                <div style={{
                    boxShadow: '-0.2em 0px 0.5em gray',
                    borderRadius: '1rem',
                    padding: '1.25rem',
                    width: '75%',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    position: 'relative'
                }}
                >
                    <Header24>Neighborhood</Header24>
                    <Subheader20>Enter a local city</Subheader20>
                    <br />
                    <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                        <TextInput placeholder="Anywhere" title="LOCATION" value={searchLocation} onChange={(e) => {setSearchLocation(e.target.value); setAutocompleteVisible(true)}}></TextInput>
                        {(searchLocation && autocompleteVisible) && 
                            <div>
                                {City.getCitiesOfCountry('US').filter((city) => (
                                    city.stateCode.toLowerCase().includes(searchLocation.toLowerCase()) || 
                                    (city.name.toLowerCase().includes(searchLocation.split(", ")[0].toLowerCase()) && 
                                    (searchLocation.includes(", ") ? city.stateCode.toLowerCase().includes(searchLocation.split(", ")[1].toLowerCase()) : true))
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
                        <Button title="Search" onClick={updateSearch}/>
                    </div>
                    <br />
                    <Subheader20>Unsure about where to donate? Search here for recomendations based on which areas are most in need of green spaces</Subheader20>
                </div>
                <br />
                {/* {coords.lat && 
                    <Header24>
                        DATA GOES HERE
                    </Header24>
                } */}
            </div>
        </div>
    )
}
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SponsorSearch);