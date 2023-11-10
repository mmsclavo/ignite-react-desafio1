import { Task } from './Task';
import styles from './Todo.module.css';

import plus from '../assets/plus.svg';
import { useState } from 'react';

const tasksList: Task[] = [
  {
    id: '1',
    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit odio ducimus sint fugiat
        illo optio voluptas dicta nostrum iure aliquam aliquid libero adipisci repellendus, velit
        est impedit, labore, eveniet ab!`,
  },
  {
    id: '2',
    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit odio ducimus sint fugiat
        illo optio voluptas dicta nostrum iure aliquam aliquid libero adipisci repellendus, velit
        est impedit, labore, eveniet ab!`,
  },
  {
    id: '3',
    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit odio ducimus sint fugiat
        illo optio voluptas dicta nostrum iure aliquam aliquid libero adipisci repellendus, velit
        est impedit, labore, eveniet ab!`,
  },
];

export function Todo() {
  return (
    <div className={styles.todo}>
      <header>
        <form className={styles.todoForm}>
          <input type='text' name='newTodo' placeholder='Adicione uma nova tarefa' />
          <button>
            Criar <img src={plus} />
          </button>
        </form>
      </header>
      <main className={styles.todoList}>
        <header>
          <div className={styles.createdTasks}>
            <strong>Tarefas criadas</strong>
            <span>5</span>
          </div>
          <div className={styles.completedTasks}>
            <strong>Concluídas</strong>
            <span>2 de 5</span>
          </div>
        </header>
        <div className={styles.todoList}>
          {tasksList.map((task) => {
            return <Task key={task.id} task={task} />;
          })}
        </div>
      </main>
    </div>
  );
}
