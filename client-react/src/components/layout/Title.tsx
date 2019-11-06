import React from "react";

export interface TitleProps {
    title?: string;
    username?: string;
}

export const Title = (props: TitleProps) => {
    const { title, username } = props;

    return <h3>{title} : {username ? `Current user is ${username}.` : 'Please sign in.'}</h3>;
}
