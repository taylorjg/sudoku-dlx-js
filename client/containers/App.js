import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Board from '../components/Board';
import * as actions from '../actions';

class App extends Component {
    render() {
        const props = this.props;
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
                                <div id="controls">
                                    {!props.solving && <input type="button" value="Solve" className="btn btn-sm btn-primary" onClick={props.onSolve} />}
                                    {props.solving && <input type="button" value="Cancel" className="btn btn-sm btn-danger" onClick={props.onCancel} />}
                                    <label htmlFor="drawingInterval">Drawing interval (ms): {props.drawingInterval}</label>
                                    <input id="drawingInterval" type="range" value={props.drawingInterval} onChange={ev => props.onChangeDrawingInterval(Number(ev.target.value))} />
                                </div>
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
    drawingInterval: PropTypes.number.isRequired,
    onSolve: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onChangeDrawingInterval: PropTypes.func.isRequired
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    onSolve: () => dispatch(actions.startSolvingAsync()),
    onCancel: () => dispatch(actions.cancelSolvingAsync()),
    onChangeDrawingInterval: value => dispatch(actions.changeDrawingIntervalAsync(value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
