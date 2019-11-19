import React, { FunctionComponent } from "react";

import { ResponseBoxComponentProps } from "../../types/index";

export const ResponseBox: FunctionComponent<ResponseBoxComponentProps> = (props) => {
    const { responseMessage } = props;

    return <textarea cols={50} rows={20} readOnly value={responseMessage} />;
}