import { Reducer } from 'redux';
import {
    HomePageActions,
    HomePageActionTypes,
} from '../actions/homePageAction';

export interface IHomePage {
    isHeaderHidden?: boolean,
    headerContent?: string,
    headerBackgroundColorCode?: string,
    headerTextColorCode?: string,
}

export interface IHomePageState {
    readonly homePageState: IHomePage;
}

const initialHomePageState: IHomePageState = { homePageState: {} };

export const homePageReducer: Reducer<IHomePageState, HomePageActions> = (
    state = initialHomePageState,
    action,
) => {
    switch (action.type) {
        case HomePageActionTypes.GET: {
            return { ...state, homePage: action.homePage };
        }
        default:
            return state;
    }
};
