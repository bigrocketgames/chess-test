import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import { HistoryMessages } from '../containers/historyMessages';
import { rewindBoard } from '../redux/board/actions';
// need to add action and reducer for rewinding history - add action to mapDispatchToProps

class History extends Component {

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({behavior: "smooth"});
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }


  render() {
    const { history } = this.props
    const prevBoard = history[history.length-1]
    
    return(
      <div>
        <h2 className="history-title">Previous Moves</h2>
        <div className="movesContainer">
          { history.length && history.map(history => <HistoryMessages key={history.id} move={history} />)}
          <div ref={(el) => { this.messagesEnd = el; }}></div>
        </div>
      </div>
    )
  }
}

History.propTypes={
  history: PropTypes.array
}

const mapStateToProps = (state) => {
  return({
    history: state.history
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    rewindBoard: rewindBoard
  })
}

export default connect((mapStateToProps), mapDispatchToProps)(History);