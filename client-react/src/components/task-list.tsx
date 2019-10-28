import React, { FunctionComponent } from "react";

import { Task } from "../models/task";
import { TaskListItem } from "./task-list-item";

interface IProps {
    tasks: Task[];
    onDelete: (task: Task) => void;
}

export const TasksList: FunctionComponent<IProps> = ({ tasks, onDelete }) => (
    <ul>
        {tasks.map(task => (
            <TaskListItem task={task} onDelete={onDelete} />
        ))}
    </ul>
);