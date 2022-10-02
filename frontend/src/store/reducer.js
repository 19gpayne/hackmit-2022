import { Map, fromJS} from 'immutable';

/* Immutable */
const SEARCH_DATA = 'SEARCH_DATA';
const USER_DATA = 'USER_DATA';
const STORE_RESET = 'STORE_RESET';

/* Actions */
export const setSearchParameters = (data) => ({'search': data, 'type': SEARCH_DATA});
export const setUserData = (data) => ({'user': data, 'type': USER_DATA});
export const setStoreReset = () => ({'type': STORE_RESET});

/* Initial State */
const initialState = Map({
    search: Map(),
    user: Map(),
    resetting: false,
});

/* Reducer */
const reducer = (state=initialState, action) => {
    switch (action.type) {
        case SEARCH_DATA:
            return state.merge({search: fromJS(action.search)})
        case USER_DATA:
            return state.merge({user: fromJS(action.user)})
        case STORE_RESET:
            return state.merge(initialState);
        default:
            return state;
    }
};

export default reducer;