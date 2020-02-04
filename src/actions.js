import client from './apollo-client';
import {
  userTasks,
  createTask as createTaskMutation,
  updateTask as updateTaskMutation,
} from './graphql';

export const FETCH_TASKS = 'FETCH_TASKS';
export const FETCH_TASKS_COMMIT = 'FETCH_TASKS_COMMIT';
export const CREATE_TASK = 'CREATE_TASK';
export const CREATE_TASK_COMMIT = 'CREATE_TASK_COMMIT';
export const START_TASK = 'START_TASK';
export const START_TASK_COMMIT = 'START_TASK_COMMIT';
export const START_TASK_ROLLBACK = 'START_TASK_ROLLBACK';
export const SUBMIT_TASK = 'SUBMIT_TASK';
export const SUBMIT_TASK_COMMIT = 'SUBMIT_TASK_COMMIT';
export const SUBMIT_TASK_ROLLBACK = 'SUBMIT_TASK_ROLLBACK';
export const COMPLETE_TASK = 'COMPLETE_TASK';
export const COMPLETE_TASK_COMMIT = 'COMPLETE_TASK_COMMIT';
export const COMPLETE_TASK_ROLLBACK = 'COMPLETE_TASK_ROLLBACK';

export const fetchTasksCommit = res => ({
  type: FETCH_TASKS_COMMIT,
  payload: res,
});

export const fetchTasks = (startDateTime, endDateTime) => {
  return async dispatch => {
    dispatch({type: FETCH_TASKS});
    const res = await client.query({
      query: userTasks,
      variables: {
        startDateTimeUtc: startDateTime,
        endDateTimeUtc: endDateTime,
      },
      errorPolicy: 'all',
    });

    dispatch(fetchTasksCommit(res));
  };
};

export const createTask = task => {
  return {
    type: CREATE_TASK,
    payload: task,
    meta: {
      offline: {
        effect: {
          mutation: createTaskMutation,
          variables: {
            taskInput: task,
          },
          discardOn: [409],
        },
      },
      commit: {
        type: CREATE_TASK_COMMIT,
        meta: {task},
      },
    },
  };
};

export const startTask = taskId => {
  return {
    type: START_TASK,
    payload: taskId,
    meta: {
      offline: {
        effect: {
          mutation: updateTaskMutation,
          variables: {
            taskId,
            input: {
              status: 'IN_PROGRESS',
            },
          },
        },
      },
      commit: {
        type: START_TASK_COMMIT,
        meta: {taskId},
      },
      rollback: {
        type: START_TASK_ROLLBACK,
        meta: {taskId},
      },
    },
  };
};

export const submitTask = taskId => {
  return {
    type: SUBMIT_TASK,
    payload: taskId,
    meta: {
      offline: {
        effect: {
          mutation: updateTaskMutation,
          variables: {
            taskId,
            input: {
              status: 'SUBMITTED',
            },
          },
        },
      },
      commit: {
        type: SUBMIT_TASK_COMMIT,
        meta: {taskId},
      },
      rollback: {
        type: SUBMIT_TASK_ROLLBACK,
        meta: {taskId},
      },
    },
  };
};

export const completeTask = taskId => {
  return {
    type: COMPLETE_TASK,
    payload: taskId,
    meta: {
      offline: {
        effect: {
          mutation: updateTaskMutation,
          variables: {
            taskId,
            input: {
              status: 'COMPLETED',
            },
          },
        },
      },
      commit: {
        type: COMPLETE_TASK_COMMIT,
        meta: {taskId},
      },
      rollback: {
        type: COMPLETE_TASK_ROLLBACK,
        meta: {taskId},
      },
    },
  };
};
