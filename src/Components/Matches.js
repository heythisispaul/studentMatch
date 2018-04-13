import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import CssBaseline from 'material-ui/CssBaseline';
import Switch from 'material-ui/Switch';
import Collapse from 'material-ui/transitions/Collapse';
import MatchCard from './MatchCard';
import firebase from 'firebase';
import base, { firebaseApp } from '../base';

class Matches extends Component {

    constructor(props) {
        super(props);
        this.state = {
            matches: []
        }
    }
    

    componentDidMount() {
        this.getMatches();
    }

    componentWillReceiveProps(nextProps) {
        // this.getMatches();
    }

    getMatches = () => {
        base.fetch('users/', {
            context: this,
            asArray: true,
        })
        .then((users) => {
            let matches = [];
            users.forEach(e => {
                let myBudg = parseInt(this.props.budget);
                let theirBudg = parseInt(e.matchInfo.budget);
                //considered a match if they're the same gender, their budget is less than or equal to yours, and they're not you and they're open to matching
                if (myBudg >= theirBudg && this.props.gender == e.matchInfo.gender && this.props.email != e.email && e.matchInfo.open == true) {
                    matches.push(e);
                }
            });
            console.log('I pulled new matches!');
            this.setState({matches: matches});
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render() {
        let matches = this.state.matches;
        console.log(matches);
        return (
            <React.Fragment>
                { matches.length < 1 ? 
                <div>Sorry no matches</div>
                : matches.map((match) => {
                    return (
                    <MatchCard 
                    key={match.email}
                    budget={match.matchInfo.budget}
                    name={match.fName}
                    />
                    )
                })}
            </React.Fragment>
        )
    }
}

export default Matches;