import React from "react";

export interface ResponseBoxProps {
    responseMessage?: string;
}

export const ResponseBox = (props: ResponseBoxProps) => {
    const { responseMessage } = props;

    return <textarea cols={50} rows={20} readOnly value={responseMessage} />;
}