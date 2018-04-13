import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import {FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import Avatar from 'material-ui/Avatar';
// import { MenuIcon } from 'material-ui-icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function Header(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Student Match
          </Typography>
          { 
            props.needLogIn ? 
            <React.Fragment>
                <FacebookLoginButton className="loginButton" onClick={() => props.authenticate('Facebook')} />
                <GoogleLoginButton className="loginButton" onClick={() => props.authenticate('Google')} />
            </React.Fragment> 
            :
            <div> 
              <span>
                <Button variant="raised" color="primary" className={classes.button} onClick={props.logout}>
                Logout
                </Button>
              </span>
              <span>
                <Avatar alt={props.fName} src={props.photoURL}/>
              </span>
            </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);