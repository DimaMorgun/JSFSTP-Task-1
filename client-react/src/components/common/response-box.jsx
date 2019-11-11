import React from "react";

export const ResponseBox = (props) => {
    const { responseMessage } = props;

    return <textarea cols={50} rows={20} readOnly value={responseMessage} />;
}