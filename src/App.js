/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  RefreshControl,
} from 'react-native';
import {Provider} from 'react-redux';
import moment from 'moment';
import uuid from 'uuid/v4';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import store from './store';
import {fetchTasks, createTask} from './actions';

import Tasks from './Tasks';

const App = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onPressFetchTasks = async () => {
    const endDateTimeUtc = moment()
      .endOf('day')
      .utc()
      .seconds(0)
      .format();

    setRefreshing(true);
    try {
      await store.dispatch(fetchTasks('2020-01-04T08:00:00Z', endDateTimeUtc));
    } catch (err) {
    } finally {
      setRefreshing(false);
    }
  };

  const onPressCreateTask = () => {
    const task = {
      id: uuid(),
      // id: 'ab3bf5d7-16e2-4e1e-b5ca-4b9f976a4206',
      orid: 'X1-ORz284nctpse4a_ic76i',
      type: 'EVALUATION',
      salesforceId: 'test',
      status: 'HAS_NOT_STARTED',
    };

    store.dispatch(createTask(task));
  };

  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onPressFetchTasks}
            />
          }
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Button title="Create Task" onPress={onPressCreateTask} />
          <View style={{margin: 20}} />
          <Tasks />
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
    flex: 1,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
