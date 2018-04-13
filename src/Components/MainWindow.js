import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Tabs, { Tab } from 'material-ui/Tabs';
import CssBaseline from 'material-ui/CssBaseline';
import About from './About';
import YourInfo from './YourInfo';
import Matches from './Matches';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary
    },
  });
  
  class MainWindow extends React.Component  {
    constructor(props) {
      super(props);
      this.state = {
        tabVal: this.props.first ? 1 : 0
      }
    }

    handleChange = (event, val) => {
      this.setState({ tabVal: val });
    }
  
    render() {
      return (
        <div className={this.props.classes.root}>
          <CssBaseline />
          <Grid container spacing={24}>
            <Grid item xs={2} />
            <Grid item xs={8} sm={8}>
              <Paper className={this.props.classes.paper}>
                <Tabs value={this.state.tabVal} onChange={this.handleChange} indicatorColor="primary" textColor="primary" centered>
                  <Tab label="About" />
                  <Tab label="Your Information" disabled={this.props.needLogIn}
                  />
                  <Tab label="Find a Match" disabled={this.props.needLogIn}
                  />
                </Tabs>
                { this.state.tabVal == 0 ? <About tabVal={this.state.tabVal}/> : null }
                { this.state.tabVal == 1 ? 
                  <YourInfo
                  gender={this.props.gender}
                  id={this.props.id} 
                  linkedURL={this.props.linkedURL}
                  depDate={this.props.depDate}
                  arrDate={this.props.arrDate}
                  open={this.props.open}
                  budget={this.props.budget}
                  update={this.props.update}
                  /> 
                : null }
                { this.state.tabVal == 2 ? 
                <Matches 
                budget={this.props.budget}
                gender={this.props.gender}
                email={this.props.email}
                /> 
                : null }
              </Paper>
            </Grid>
            <Grid item xs={2} sm={2} />
          </Grid>
        </div>
      );
    }
  }
  
  MainWindow.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(MainWindow);
  