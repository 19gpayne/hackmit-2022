import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, TextInput } from '../components/inputs';
import {SearchOutlined} from '@ant-design/icons';
import Navbar from '../components/navbar';
import {setSearchParameters} from '../store/reducer';
import { Header32, Subheader20, Text14 } from '../components/fonts';
import Geocode from "react-geocode";
import { City }  from 'country-state-city';
import { colors } from '../utils/colors';

const Homepage = ({setSearchParameters}) => {
    let history = useNavigate();
    const [location, setLocation] = useState("");
    const [radius, setRadius] = useState(0);
    const [autocompleteVisible, setAutocompleteVisible] = useState(true);

    

    useEffect(() => {
        const loc = location !== "" ? location : "New York City, New York"
        Geocode.fromAddress(loc).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                setSearchParameters({coordinates: {latitude: lat, longitude: lng}, radius: radius})
            },
            (error) => {
                console.error(error);
            }
        );
    }, [location, radius, setSearchParameters]);


    return (
        <div>
            <Navbar></Navbar>
            <div style={{
                boxShadow: '-0.2em 0px 0.5em gray',
                borderRadius: '1rem',
                padding: '1.25rem',
                width: '33%',
                marginLeft: '4rem',
                backgroundColor: 'white'
            }}>
                <Header32>Share your yard</Header32>
                <Subheader20>Help your community by sharing your garden</Subheader20>
            </div>

            <div style={{
                boxShadow: '-0.2em 0px 0.5em gray',
                borderRadius: '1rem',
                padding: '1.25rem',
                width: '33%',
                margin: '1rem 4rem',
                backgroundColor: 'white'
            }}>
                <Header32>Find backyards to plant in</Header32>
                <Subheader20>Discover entire gardens or backyard spaces, perfect for sharing</Subheader20>
                <br />
                <div><TextInput placeholder="Anywhere" title="LOCATION" value={location} onChange={(e) => {setLocation(e.target.value); setAutocompleteVisible(true)}}></TextInput></div>
                {(location && autocompleteVisible) && 
                    <div>
                        {City.getCitiesOfCountry('US').filter((city) => (
                            city.stateCode.toLowerCase().includes(location.toLowerCase()) || 
                            (city.name.toLowerCase().includes(location.split(", ")[0].toLowerCase()) && 
                            (location.includes(", ") ? city.stateCode.toLowerCase().includes(location.split(", ")[1].toLowerCase()) : true))
                        )
                        ).slice(0, 2).map((city => (
                            <Text14 style={{
                                border: '1px solid' + colors.secondary, 
                                padding: '0.5rem 1rem', 
                                borderRadius: '1rem', 
                                cursor: 'pointer',
                            }}
                                onClick={() => {setLocation(city.name + ", " + city.stateCode); setAutocompleteVisible(false)}}
                            >
                                {city.name}, {city.stateCode}
                            </Text14>
                        )))}
                    </div>
                }
                <br/> 
                <div><TextInput type="number" placeholder="N/A" title="RADIUS (IN MILES)" value={radius} onChange={(e) => setRadius(e.target.value)}></TextInput></div>
                <br />
                <div><Button title={<><SearchOutlined /> Search</>} onClick={() => history('/search')}/></div>
            </div>

            <div style={{
                position: 'absolute',
                zIndex: -1,
                top: '5rem',
                bottom: '2rem',
                left: '20rem',
                right: '10rem',
                margin: 'auto',
            }}>
                <img 
                    src="https://www.edencondensed.com/upload/cache/phpThumb_cache_edencondensed.com_src176b5ef43e3c729dca093b0f267654de_par0b3d73f82c7b7a8b64fc62a48e8ba0e2_dat1528960853.jpeg" 
                    style={{width: '100%', borderRadius: '1rem'}}
                    alt="Woman tending to a garden"/>
            </div>
        </div>
    )
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
    setSearchParameters: (data) => dispatch(setSearchParameters(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);