import React, { useContext, useEffect } from 'react'
import { Card, Image, Button, Grid, GridColumn } from 'semantic-ui-react'
import ActivityStore from '../../../App/stores/activityStore'
import { observer } from 'mobx-react-lite'
import { RouteComponentProps, Link } from 'react-router-dom'
import { LoadingComponents } from '../../../App/Layout/LoadingComponents'
import ActivityDetailedChat from './ActivityDetailedChat'
import ActivityDetailedSidebar from './ActivityDetailedSidebar'
import ActivityDetailedHeader from './ActivityDetailedHeader'
import ActivityDetailedInfo from './ActivityDetailedInfo'

interface DetailParams {
    id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {
    const activityStore = useContext(ActivityStore);
    const {activity, loadActivity, loadingInitial} = activityStore;

    useEffect(() => {
        loadActivity(match.params.id)
    }, [loadActivity, match.params.id])

    if(loadingInitial || !activity)
        return <LoadingComponents content='Loading activity...' />
    else {
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
}

export default observer(ActivityDetails);