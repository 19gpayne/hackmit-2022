import React from 'react';
import { connect } from 'react-redux';
import {Button} from '../components/inputs';
import Navbar from '../components/navbar';
import { Header24, Title36, Subheader20 } from '../components/fonts';

const SponsorPage = ({}) => {
    return (
        <div>
            <Navbar></Navbar>
            <div style={{marginLeft: '4rem'}}>
                <Title36>Support Your Community</Title36>
                <br />
                <br />
                <Header24>What is GardenShare?</Header24>
                <Subheader20>GardenShare is a free online marketplace focused on sharing garden/backyard space for growing fresh and sustainable fruits and vegetables while bringing the community together.</Subheader20>
                <br />
                <br />
                <Header24>Why Sponsor?</Header24>
                <Subheader20>Your generosity will help underserved families gain access to fresh and healthy food. 100% of your donations will go directly to these sustainable gardens. This will make a BIG impact in neighborhoods with food deserts - areas with limited access to affordable and nutritious food. Help us address food insecurity and foster a vibrant local community!</Subheader20>
                <br />
                <br />
                <Header24>How does it work?</Header24>
                <Subheader20>Choose a neighborhood and a donation amount. We will verify the garden expense receipts within that area and handle the distribution of resources. That easy!</Subheader20>
                <br />
                <br />
                <Button title="Donate" style={{width: "25%"}}/>
            </div>
        </div>
    )
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(SponsorPage);