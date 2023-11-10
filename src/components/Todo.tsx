import { ChangeEvent, FormEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Task, TaskModel } from './Task';
import styles from './Todo.module.css';

import plus from '../assets/plus.svg';
import clipboard from '../assets/clipboard.svg';

export function Todo() {
  const [taskList, setTaskList] = useState<TaskModel[]>([]);
  const [newContentTask, setNewContent] = useState('');
  const [countTasksCompletes, setCountTasksCompletes] = useState(0);

  function handleAddNewTask(event: FormEvent) {
    event.preventDefault();
    const newTask: TaskModel = createNewTask(newContentTask, false);
    const newTaskList = [newTask, ...taskList];
    updateTaskList(newTaskList);
    setNewContent('');
  }

  function createNewTask(content: string, isComplete: boolean): TaskModel {
    return {
      id: uuidv4(),
      content: content,
      isComplete: isComplete
    }
  }

  function handleNewContentTask(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setNewContent(event.target.value);
  }

  function handleDeleteTask(taskToDelete: TaskModel) {
    const newTaskList = taskList.filter((task: TaskModel) => task.id !== taskToDelete.id);
    updateTaskList(newTaskList);
  }

  function updateTaskList(tasks: TaskModel[]) {
    updateCountCompletedTasks(tasks);
    setTaskList(tasks);
  }

  function updateTaskInTaskList(updatedTask: TaskModel) {
    const newTaskList = taskList.map((task: TaskModel) =>  {
      if(task.id === updatedTask.id) {
        return updatedTask;
      }
      return task;
    });
    updateTaskList(newTaskList);
  }

  function updateCountCompletedTasks(tasks: TaskModel[]) {
    const countCompleteTasks = tasks.reduce(
      (count: number, task: TaskModel) => {
        if(task.isComplete) {
          return count + 1;
        }
        return count;
      }, 0
    );
    setCountTasksCompletes(countCompleteTasks);
  }

  return (
    <div className={styles.todo}>
      <header>
        <form className={styles.todoForm} onSubmit={handleAddNewTask}>
          <input
            type='text'
            name='newTodo'
            placeholder='Adicione uma nova tarefa'
            value={newContentTask}
            onChange={handleNewContentTask}
            required
          />
          <button>
            Criar <img src={plus} />
          </button>
        </form>
      </header>
      <main className={styles.todoList}>
        <header>
          <div className={styles.createdTasks}>
            <strong>Tarefas criadas</strong>
            <span>{taskList.length}</span>
          </div>
          <div className={styles.completedTasks}>
            <strong>Concluídas</strong>
            <span>{countTasksCompletes} de {taskList.length}</span>
          </div>
        </header>
        <div className={styles.todoList}>
          {taskList.length > 0 ? (taskList.map((task: TaskModel) => {
            return <Task key={task.id} task={task} onDeleteTask={handleDeleteTask} onChangeTask={updateTaskInTaskList} />;
          })) : (
            <div className={styles.emptyList}>
              <img src={clipboard} />
              <div>
                <strong>Você ainda não tem tarefas cadastradas</strong>
                <span>Crie tarefas e organize seus itens a fazer</span>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
