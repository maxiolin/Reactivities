import React, { Fragment} from 'react';
import {Container } from '../../../node_modules/semantic-ui-react'
import './styles.css';
import NavBar from '../../Features/nav/NavBar';
import ActivityDashboard from '../../Features/activities/dashboard/ActivityDashboard';
import {observer} from 'mobx-react-lite'
import { Route, withRouter, RouteComponentProps, Switch } from 'react-router-dom';
import HomePage from '../../Features/home/HomePage';
import ActivityForm from '../../Features/activities/form/ActivityForm';
import ActivityDetails from '../../Features/activities/details/ActivityDetails';
import NotFound from './NotFound';
import {ToastContainer} from 'react-toastify'

const App: React.FC<RouteComponentProps> = ({location}) => {

    return (
      <Fragment>
        <ToastContainer position='bottom-right'/>>
        <Route exact path='/' component={HomePage}/>
        <Route path={'/(.+)'} render={() => (
          <Fragment>
            <NavBar />
            <Container style={{marginTop: '7em'}}>
              <Switch>
                <Route exact path='/activities' component={ActivityDashboard}/>
                <Route path='/activities/:id' component={ActivityDetails}/>
                <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm}/>
                <Route component={NotFound}/>
              </Switch>
            </Container>
          </Fragment>
        )} />
      </Fragment>
    );
  }
  

export default withRouter(observer(App));

