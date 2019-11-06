import React from "react";

export const Title = (props: any) => {
    const { title, user } = props;
    return <h3>{title} : {user ? `Current user is ${user}.` : 'Please sign in.'}</h3>;
}
