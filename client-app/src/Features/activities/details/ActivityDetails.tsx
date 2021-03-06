import React, { useContext, useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import { RouteComponentProps } from 'react-router-dom'
import { LoadingComponents } from '../../../App/Layout/LoadingComponents'
import ActivityDetailedChat from './ActivityDetailedChat'
import ActivityDetailedSidebar from './ActivityDetailedSidebar'
import ActivityDetailedHeader from './ActivityDetailedHeader'
import ActivityDetailedInfo from './ActivityDetailedInfo'
import { RootStoreContext } from '../../../App/stores/rootStore'

interface DetailParams {
    id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({
    match}) => {
    const rootStore = useContext(RootStoreContext);
    const {activity, loadActivity, loadingInitial} = rootStore.activityStore;

    useEffect(() => {
        loadActivity(match.params.id)
    }, [loadActivity, match.params.id])

    if(loadingInitial )
        return <LoadingComponents content='Loading activity...' />

    if(!activity)
        return <h1>Activity not found</h1>
    
        return (
            <Grid>
                <Grid.Column width={10}>
                    <ActivityDetailedHeader activity={activity}/>
                    <ActivityDetailedInfo activity={activity}/>
                    <ActivityDetailedChat/>
                </Grid.Column>
                <Grid.Column width={6}>
                    <ActivityDetailedSidebar/>
                </Grid.Column>
            </Grid>
        ) 
    
}

export default observer(ActivityDetails);