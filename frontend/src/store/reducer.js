import { Map, fromJS} from 'immutable';

/* Immutable */
const STORE_RESET = 'STORE_RESET';

/* Actions */
export const setStoreReset = () => ({'type': STORE_RESET});

/* Initial State */
const initialState = Map({
    resetting: false,
});

/* Reducer */
const reducer = (state=initialState, action) => {
    switch (action.type) {
        case STORE_RESET:
            return state.merge(initialState);
        default:
            return state;
    }
};

export default reducer;