import React, { Fragment, useContext, useEffect } from "react";
import { Container } from "../../../node_modules/semantic-ui-react";
import "./styles.css";
import NavBar from "../../Features/nav/NavBar";
import ActivityDashboard from "../../Features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch
} from "react-router-dom";
import HomePage from "../../Features/home/HomePage";
import ActivityForm from "../../Features/activities/form/ActivityForm";
import ActivityDetails from "../../Features/activities/details/ActivityDetails";
import NotFound from "./NotFound";
import { ToastContainer } from "react-toastify";
import LoginForm from "../../Features/user/LoginForm";
import { RootStoreContext } from "../stores/rootStore";
import { LoadingComponents } from "./LoadingComponents";
import ModalContainer from "../common/modals/ModalContainer";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const {setAppLoaded, token, appLoaded} = rootStore.commonStore;
  const {getUser} = rootStore.userStore;
  
  useEffect(() => {
    
    if (token) {
      getUser().finally(() => setAppLoaded())
    } else {
      setAppLoaded()
    }
  }, [getUser, setAppLoaded, token])

  if(!appLoaded)
    return(<LoadingComponents content='Loading App'/>)

  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer position="bottom-right" />>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route exact path="/activities" component={ActivityDashboard} />
                <Route path="/activities/:id" component={ActivityDetails} />
                <Route
                  key={location.key}
                  path={["/createActivity", "/manage/:id"]}
                  component={ActivityForm}
                />
                <Route path="/login" component={LoginForm} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
