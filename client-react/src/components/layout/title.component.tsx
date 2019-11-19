import React, { FunctionComponent } from "react";

import { TitleComponentProps } from "../../types/index";

export const Title: FunctionComponent<TitleComponentProps> = (props) => {
    const { title, username } = props;

    return <h3>{title} : {username ? `Current user is ${username}.` : 'Please sign in.'}</h3>;
}
