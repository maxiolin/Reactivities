import React, {useState, FormEvent, useContext, useEffect} from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import ActivityStore from '../../../App/stores/activityStore'
import { IActivity } from '../../../App/models/activity'
import {v4 as uuid} from 'uuid'
import { observer } from 'mobx-react-lite'
import { RouteComponentProps } from 'react-router-dom'

interface DetailParams {
    id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
    match,
    history
}) => {
    const activityStore = useContext(ActivityStore);
    const {
        createActivity, 
        activity: initialState, 
        editActivity, 
        submitting, 
        loadActivity,
        clearActivity
    } = activityStore;
    
    

    const [activity, setActivity] = useState<IActivity>({
        id: '',
        title:'',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if(match.params.id && activity.id.length === 0) {
            loadActivity(match.params.id).then(
                () => initialState && setActivity(initialState)
            );
        }

        return () => {
            clearActivity();
        }
    }, [loadActivity, match.params.id, clearActivity, initialState, activity.id.length])

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.currentTarget
        setActivity({...activity, [name]: value})
    }

    const handleSubmit = () => {
        if(activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
        } else {
            editActivity(activity).then(() => history.push(`/activities/${activity.id}`));
        }
    }
    
    return (    
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input name='title' onChange={handleInputChange} placeholder='Title' value={activity.title}/>
                <Form.TextArea name='description' onChange={handleInputChange} rows={2} placeholder='Description'value={activity.description}/>
                <Form.Input name='category' onChange={handleInputChange} placeholder='Category' value={activity.category}/>
                <Form.Input name='date' onChange={handleInputChange} type="datetime-local" placeholder='Date' value={activity.date}/>
                <Form.Input name='city' onChange={handleInputChange} placeholder='City' value={activity.city}/>
                <Form.Input name='venue' onChange={handleInputChange} placeholder='Venue' value={activity.venue}/>
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                <Button onClick={() => history.push('/activities')}  floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}

export default observer(ActivityForm);