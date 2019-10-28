import React, { FunctionComponent } from "react";

import { Task } from "../models/task";

interface IProps {
    task: Task;
    onDelete: (task: Task) => void;
}

export const TaskListItem: FunctionComponent<IProps> = ({ task, onDelete }) => {
    const onClick = () => {
        onDelete(task);
    };

    return (
        <li>
            {task.name} <button onClick={onClick}>X</button>
        </li>
    );
};