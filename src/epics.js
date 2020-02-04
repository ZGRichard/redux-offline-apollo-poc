import {map} from 'rxjs/operators';
import {ofType} from 'redux-observable';
import {SUBMIT_TASK_COMMIT, completeTask} from './actions';

export const taskSubmitEpic = action$ =>
  action$.pipe(
    ofType(SUBMIT_TASK_COMMIT),
    map(action => completeTask(action.meta.taskId)),
  );
