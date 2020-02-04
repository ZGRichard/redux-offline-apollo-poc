import React from 'react';
import {Button, Text, View} from 'react-native';
import {useSelector, useStore} from 'react-redux';
import {startTask, submitTask} from './actions';

const Tasks = () => {
  const store = useStore();
  const tasks = useSelector(state => Object.values(state.entities.tasks));

  const onStart = taskId => {
    store.dispatch(startTask(taskId));
  };
  const onProgress = () => {};
  const onSubmit = taskId => {
    store.dispatch(submitTask(taskId));
  };

  return (
    <View>
      {tasks.map(task => (
        <View style={{padding: 20, borderTopWidth: 1}}>
          <Text>{task.id}</Text>
          <Text>
            {task.type} - {task.status}
          </Text>
          {task.status === 'HAS_NOT_STARTED' ? (
            <Button title="Start" onPress={() => onStart(task.id)} />
          ) : (
            <Button title="In Progress" onPress={onProgress} />
          )}
          <Button title="Submit" onPress={() => onSubmit(task.id)} />
        </View>
      ))}
    </View>
  );
};

export default Tasks;
