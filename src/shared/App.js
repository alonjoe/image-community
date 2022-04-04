
import './App.css';
import React from "react";

import {BrowserRouter, Route} from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';

import PostList from "../pages/PostList";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Permit from './Permit';

import Header from "../components/Header";
import {Button, Grid} from "../elements";

import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from "../redux/modules/user";
import {apiKey} from "./firebase";

function App() {
  const dispatch = useDispatch();
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;
    if (is_session) {
      dispatch(userActions.loginCheckFB());
    }
  React.useEffect(() => {

  }, []);    // []안의 값들이 변경될 떄, useEffect 안의 함수가 재실행된다.  아무것도 안들어가면 1번만 실행.
  return (
    <React.Fragment>
      <Grid>
        <Header></Header>
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup}/>
        </ConnectedRouter>
      </Grid>
      <Permit>
        <Button is_float text="+">
        </Button>
      </Permit>
    </React.Fragment>
  );
}

export default App;
