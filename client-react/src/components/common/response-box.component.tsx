import React, { FunctionComponent, ReactElement } from "react";

import { ResponseBoxComponentProps } from "../../types/index";

export const ResponseBox: FunctionComponent<ResponseBoxComponentProps> = (props): ReactElement => (
    <textarea cols={50} rows={20} readOnly value={props.responseMessage} />
)