import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as C from '../constants';
import * as actions from '../actions';
import Board from '../components/Board';

class App extends Component {
    render() {
        const props = this.props;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-offset-4 col-md-4">
                        <Board { ...props } />
                    </div>
                    <div className="col-md-offset-4 col-md-4">
                        <button className="btn btn-sm btn-primary" onClick={() => props.onClick(props.solution)}>Show Solution</button>
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    initialValues: PropTypes.arrayOf(PropTypes.string).isRequired,
    currentValues: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClick: PropTypes.func.isRequired,
    solution: PropTypes.arrayOf(PropTypes.string).isRequired
};

const mapStateToProps = state => ({
    initialValues: state.initialValues,
    currentValues: state.currentValues,
});

const mapDispatchToProps = dispatch => ({
    onClick: solution => dispatch(actions.showSolution(solution))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
