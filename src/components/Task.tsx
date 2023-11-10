import styles from './Task.module.css';

import trash from '../assets/trash.svg';
import circleCheck from '../assets/circle-check.svg';
import circleChecked from '../assets/circle-checked.svg';
import { ChangeEvent, useState } from 'react';

export interface TaskModel {
  id: string;
  content: string;
  isComplete: boolean;
}

interface TaskProps {
  task: TaskModel;
  onDeleteTask: (task: TaskModel) => void;
  onChangeTask: (task: TaskModel) => void;
}

export function Task({ task, onDeleteTask: onDeleteTask, onChangeTask }: TaskProps) {
  const [isChecked, setIsChecked] = useState(task.isComplete);

  function handleCheckboxChange(event: ChangeEvent<HTMLInputElement>) {
    const isChecked = event.target.checked;
    setIsChecked(isChecked);
    onChangeTask({...task, isComplete: isChecked});
  }

  function checkboxToggle() {
    setIsChecked(!isChecked);
  }

  function handleOnDeleteTask() {
    onDeleteTask(task);
  }

  return (
    <div className={styles.task}>
      <img src={isChecked ? circleChecked : circleCheck} onClick={checkboxToggle} />
      <input type='checkbox' id={task.id} checked={isChecked} onChange={handleCheckboxChange}/>
      <label className={isChecked ? styles.complete : ''} htmlFor={task.id}>{task.content}</label>
      <button className={styles.trashButton} onClick={handleOnDeleteTask}>
        <img src={trash} alt='Remover tarefa' />
      </button>
    </div>
  );
}
