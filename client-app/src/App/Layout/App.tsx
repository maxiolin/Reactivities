import React, {useEffect, Fragment, useContext} from 'react';
import {Container } from '../../../node_modules/semantic-ui-react'
import './styles.css';
import NavBar from '../../Features/nav/NavBar';
import ActivityDashboard from '../../Features/activities/dashboard/ActivityDashboard';
import { LoadingComponents } from './LoadingComponents';
import ActivityStore from '../stores/activityStore';
import {observer} from 'mobx-react-lite'

const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if(activityStore.loadingInitial) 
    return (<LoadingComponents content='Loading activities...'/>)
  else {
    return (
      <Fragment>
        <NavBar />
        <Container style={{marginTop: '7em'}}>
          <ActivityDashboard />
        </Container>
      </Fragment>
    );
  }
  
}

export default observer(App);

