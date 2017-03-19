import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Board from '../components/Board';
import * as actions from '../actions';

class App extends Component {
    render() {
        const props = this.props;
        const conditionalAttributes = {};
        if (props.solving) {
            conditionalAttributes.disabled = 'disabled';
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <span className="pull-right"><i>version: {props.version}</i></span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-offset-3 col-md-6">
                        <div id="wrapper">
                            <Board { ...props } />
                            <div>
                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={props.onSolve}
                                    { ...conditionalAttributes }
                                >
                                    Solve
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    version: PropTypes.string.isRequired,
    initialValues: PropTypes.arrayOf(PropTypes.string).isRequired,
    currentValues: PropTypes.arrayOf(PropTypes.string).isRequired,
    solving: PropTypes.bool.isRequired,
    onSolve: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    onSolve: () => dispatch(actions.startSolvingAsync())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
