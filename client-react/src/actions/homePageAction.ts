import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
// import axios from 'axios';

import { IHomePage, IHomePageState } from '../reducers/homePageReducer';

export enum HomePageActionTypes {
    GET = 'GET',
}

export interface IHomePageGetAction {
    type: HomePageActionTypes.GET;
    homePage: IHomePage;
}

export type HomePageActions = IHomePageGetAction;

export const getHomePage: ActionCreator<
    ThunkAction<Promise<any>, IHomePageState, null, IHomePageGetAction>
> = () => {
    return async (dispatch: Dispatch) => {
        try {
            // Fake Request
            const result: IHomePage = {};
            result.isHeaderHidden = true;
            const generatedHeaderTextColorCode = '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
            result.headerTextColorCode = generatedHeaderTextColorCode;
            const generatedHeaderBackgroundColorCode = '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
            result.headerBackgroundColorCode = generatedHeaderBackgroundColorCode;
            result.headerContent = `Header text color code = [${generatedHeaderTextColorCode}].\nHeader background color code = [${generatedHeaderBackgroundColorCode}]`;
            // const response = await axios.get('https://swapi.co/api/people/');
            // / Fake Request
            dispatch({
                homePage: result,
                type: HomePageActionTypes.GET,
            });
        } catch (err) {
            console.error(err);
        }
    };
};
