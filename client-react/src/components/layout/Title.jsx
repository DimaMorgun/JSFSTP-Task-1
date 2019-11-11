import React from "react";

export const Title = (props) => {
    const { title, username } = props;

    return <h3>{title} : {username ? `Current user is ${username}.` : 'Please sign in.'}</h3>;
}
