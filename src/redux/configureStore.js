import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { Dishes } from './dishes';
import { Info } from './info';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import { Favorites } from './favorites';
import { Lusers } from './lusers'
import { Auth } from './auth';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback } from './forms';
import { Users } from './users';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            users: Users,
            lusers: Lusers,
            info: Info,
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            auth: Auth,
            favorites : Favorites,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}