import React from 'react';
import { connect } from 'react-redux';
import { Header24, Header32, Subheader20 } from './fonts';

const Listing = ({listing, viewListing, fromUser}) => {
    return (
        <div style={{
            boxShadow: fromUser ? '-0.2em 0px 0.5em gray' : '',
            borderRadius: '1rem',
            padding: '1.25rem',
            width: fromUser ? '100%' : '25%',
            backgroundColor: 'white',
            cursor: 'pointer'
        }}
            onClick={viewListing}
        >
            { <img src={listing.image} alt="Listing" style={{width: '100%'}}/> }
            <Header32>{listing.title}</Header32>
            <Subheader20>{listing.description}</Subheader20>
            <Header24>{listing.gardenUnits + " sq. ft"}</Header24>
        </div>
    )
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Listing);