import React, { useEffect, useContext } from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import ActivityList from './ActivityList'
import { observer } from 'mobx-react-lite'
import ActivityStore from '../../../App/stores/activityStore'
import { LoadingComponents } from '../../../App/Layout/LoadingComponents';

const ActivityDashboard: React.FC = () => {
    
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if(activityStore.loadingInitial) 
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