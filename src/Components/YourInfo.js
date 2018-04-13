import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import CssBaseline from 'material-ui/CssBaseline';
import Switch from 'material-ui/Switch';
import Collapse from 'material-ui/transitions/Collapse';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText, FormControlLabel } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Button from 'material-ui/Button';
import firebase from 'firebase';
import base, { firebaseApp } from '../base';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    numField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 105
    },
    menu: {
      width: 200,
    },
    formControl: {
        // margin: theme.spacing.unit,
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing.unit * 2,
      },
      button: {
        margin: theme.spacing.unit,
      },
      input: {
        display: 'none',
      }
  });
  
class YourInfo extends Component {
    constructor(props) {
        super(props);
        this.updateInfo = this.updateInfo.bind(this);
        this.state = {
            open: this.props.open || true,
            gender: this.props.gender || '',
            budget: this.props.budget || 0,
            linkedURL: this.props.linkedURL || "",
            arrDate: this.props.arrDate || "",
            depDate: this.props.depDate || "",
            updated: false
        }
    }

    render() {

        let date = new Date();

        return (
            <React.Fragment>
                <CssBaseline/>
                <Grid>
                <form className="infoCard">
                <FormControlLabel
                control={
                    <Switch
                    checked={this.state.open}
                    onChange={(event) => {this.setState({open: event.target.checked, updated: false})}}
                    value="open"
                    />
                }
                label="Open to new matches"
                />
                    <TextField
                    id="linkedURL"
                    label="LinkedIn Profile"
                    value={this.state.linkedURL}
                    onChange={(event) => {this.setState({linkedURL: event.target.value, updated: false})}}
                    margin="normal"
                    className={this.props.classes.textField}
                    />
                    <div>
                    <FormControl className={this.props.classes.formControl}>
                        <InputLabel htmlFor="gender-helper">Gender</InputLabel>
                        <Select
                        value={this.state.gender}
                        onChange={(event) => { this.setState({gender: event.target.value, updated: false})}}
                        input={<Input name="gender" id="gender-helper" />}>
                            <MenuItem value="">
                            <em>None</em>
                            </MenuItem>
                            <MenuItem value='male'>Male</MenuItem>
                            <MenuItem value='female'>Female</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        id="arrDate"
                        label="Arrival"
                        type="date"
                        defaultValue={'2018-12-31'}
                        onChange={(event) => {this.setState({arrDate: event.target.value, updated: false})}}
                        className={this.props.classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <TextField
                        id="depDate"
                        label="Departure"
                        type="date"
                        defaultValue={'2018-12-31'}
                        onChange={(event) => {this.setState({depDate: event.target.value, updated: false})}}
                        className={this.props.classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <span>$</span>
                    <TextField
                    id="budget"
                    label="Nightly Budget"
                    value={this.state.budget}
                    onChange={(event) => {this.setState({budget: event.target.value, updated: false})}}
                    type="number"
                    className={this.props.classes.numField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                    />
                    <span>.00</span>
                    </div>
                </form>
                <Button variant="raised" color="primary" className={this.props.classes.button} onClick={this.updateInfo}>
                    { this.state.updated ? 'Your Information was successfully updated' : 'Update your information' }
                </Button>
                </Grid>
            </React.Fragment>
        )
    }

    updateInfo() {
        let id = this.props.id;
        base.update(`users/${id}/matchInfo`, {
            data: {
                arrDate: this.state.arrDate,
                depDate: this.state.depDate,
                gender: this.state.gender,
                budget: this.state.budget,
                linkedURL: this.state.linkedURL,
                open: this.state.open
            }
        })
        .then(
            this.setState({
                updated: true
            })
        )
        .then(
            this.props.update(id)
        )
    }

    componentWillReceiveProps(prevProps) {
    }
}

export default withStyles(styles)(YourInfo);