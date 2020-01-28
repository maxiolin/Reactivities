import React, { useEffect, useContext } from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import ActivityList from './ActivityList'
import { observer } from 'mobx-react-lite'
import { LoadingComponents } from '../../../App/Layout/LoadingComponents';
import { RootStoreContext } from '../../../App/stores/rootStore'

const ActivityDashboard: React.FC = () => {
    
  const rootStore = useContext(RootStoreContext);
  const {loadActivities, loadingInitial} = rootStore.activityStore

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  if(loadingInitial) 
    return (<LoadingComponents content='Loading activities...'/>)
  else
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList/>
            
            </Grid.Column>
            <GridColumn width={6}>
                <h2>Activity filters</h2>
            </GridColumn>
        </Grid>
    )
};

export default observer(ActivityDashboard);