import React from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';

const Tasks = () => {
  const tasks = useSelector(state => Object.values(state.entities.tasks));

  return (
    <View>
      {tasks.map(task => (
        <View style={{padding: 20}}>
          <Text>{task.id}</Text>
          <Text>
            {task.type} - {task.status}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default Tasks;
