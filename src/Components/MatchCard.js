import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import CssBaseline from 'material-ui/CssBaseline';
import Switch from 'material-ui/Switch';
import Collapse from 'material-ui/transitions/Collapse';

function MatchCard(props) {
    return (
        <div className="matches">
            <p>Hello! I'm {props.name} with a budget of {props.budget}</p>
        </div>
    )
}

export default MatchCard;