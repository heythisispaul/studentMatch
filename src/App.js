import React, { Component } from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import ButtonAppBar from './Components/Header';
import base, { firebaseApp } from './base';
import MainWndow from './Components/MainWindow';
import { EditorFormatLineSpacing } from 'material-ui';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import MainWindow from './Components/MainWindow';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      needLogIn: true,
      fName: "",
      lName: "",
      id: "",
      photoURL: "",
      gender: "",
      email: "",
      budget: null,
      open: true,
      linkedURL: "",
      arrDate: "",
      depDate: "",
      first: false
    }
  }

  authHandler = async (authData) => {
    const user = await base.fetch(`users/${authData.user.uid}`, { context: this});
    console.log(authData.user.id);
    console.log(user);
    if (!user.email) {
      base.post(`users/${authData.user.uid}`, {
        data: {
          id: authData.user.uid,
          photoURL: authData.user.photoURL,
          gender: authData.additionalUserInfo.profile.gender ? authData.additionalUserInfo.profile.gender : null,
          fName: authData.additionalUserInfo.profile.given_name,
          lName: authData.additionalUserInfo.profile.family_name,
          email: authData.additionalUserInfo.profile.email
        }
      })
      .then(
        this.setState({
          needLogIn: false,
          id: authData.user.uid,
          photoURL: authData.user.photoURL,
          gender: authData.additionalUserInfo.profile.gender,
          fName: authData.additionalUserInfo.profile.given_name,
          lName: authData.additionalUserInfo.profile.family_name,
          email: authData.additionalUserInfo.profile.email,
          first: true
        })
      )
    }

    if (user.email) {
      this.setState({
        needLogIn: false,
        id: authData.user.uid,
        photoURL: authData.user.photoURL,
        gender: user.matchInfo.gender || user.gender,
        fName: user.fName,
        lName: user.lName,
        email: user.email,
        first: false,
        linkedURL: user.matchInfo.linkedURL,
        budget: user.matchInfo.budget,
        arrDate: user.matchInfo.arrDate,
        depDate: user.matchInfo.depDate,
        open: user.matchInfo.open
      })
      console.log(this.state);
    }
  }

  stateUpdate = (id) => {
    console.log(id);
    base.fetch(`users/${id}`, {})
    .then((user) => {
      console.log(user);
      this.setState({
        needLogIn: false,
        id: id,
        photoURL: user.photoURL,
        gender: user.matchInfo.gender || user.gender,
        fName: user.fName,
        lName: user.lName,
        email: user.email,
        first: false,
        linkedURL: user.matchInfo.linkedURL,
        budget: user.matchInfo.budget,
        arrDate: user.matchInfo.arrDate,
        depDate: user.matchInfo.depDate,
        open: user.matchInfo.open
      })
    })
  }

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  }

  logout = () => {
    firebase
    .auth()
    .signOut()
    .then(() => {
      this.setState({
        needLogIn: true
      })
    })
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <ButtonAppBar authenticate={ this.authenticate } needLogIn={ this.state.needLogIn } fName={ this.state.fName } photoURL={ this.state.photoURL } logout={this.logout}/>
        <MainWindow 
          id={this.state.id}
          photoURL={this.state.photoURL}
          fName={this.state.fName}
          lName={this.state.lName}
          email={this.state.email}
          gender={this.state.gender}
          needLogIn={this.state.needLogIn}
          first={this.state.first} 
          open={this.state.open}
          depDate={this.state.depDate}
          arrDate={this.state.arrDate}
          linkedURL={this.state.linkedURL}
          budget={this.state.budget}
          update={this.stateUpdate}
        />
      </React.Fragment>
    );
  }
}

export default App;
