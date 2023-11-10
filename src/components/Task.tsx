import styles from './Task.module.css';

import trash from '../assets/trash.svg';
import circleCheck from '../assets/circle-check.svg';
import circleChecked from '../assets/circle-checked.svg';

export interface Task {
  id: string;
  content: string;
}

interface TaskProps {
  task: Task;
}

export function Task({ task }: TaskProps) {
  return (
    <div className={styles.task}>
      <img src={circleCheck} />
      <input type='checkbox' id={task.id} />
      <label htmlFor={task.id}>{task.content}</label>
      <button className={styles.trashButton}>
        <img src={trash} alt='Remover tarefa' />
      </button>
    </div>
  );
}
