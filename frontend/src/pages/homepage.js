import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { setStoreReset } from '../store/reducer';

const Homepage = ({setStoreReset}) => {

    useEffect(() => {
        setStoreReset();
    }, []);

    return (
        <div>Homepage!</div>
    )
}
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({
    setStoreReset: () => dispatch(setStoreReset())
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);