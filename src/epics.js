import {filter, mergeMap} from 'rxjs/operators';
import {SUBMIT_TASK_COMMIT, completeTask} from './actions';

export const taskSubmitEpic = action$ => {
  console.log('calling task submission epic');
  return action$.pipe(
    filter(action => action.type === SUBMIT_TASK_COMMIT),
    mergeMap(async action => completeTask(action.payload)),
  );
};
