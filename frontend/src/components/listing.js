import React from 'react';
import { connect } from 'react-redux';
import { Header24, Header32, Subheader20 } from './fonts';

const Listing = ({listing, viewListing}) => {
    return (
        <div style={{
            borderRadius: '1rem',
            padding: '1.25rem',
            width: '25%',
            backgroundColor: 'white',
            cursor: 'pointer'
        }}
            onClick={viewListing}
        >
            <img src={listing.images[0]} alt="Listing" style={{width: '100%'}}/>
            <Header32>{listing.title}</Header32>
            <Subheader20>{listing.description}</Subheader20>
            <Header24>{listing.gardenSize + " sq. ft"}</Header24>
        </div>
    )
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Listing);