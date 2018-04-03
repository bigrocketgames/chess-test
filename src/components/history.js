import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import { HistoryMessages } from '../containers/historyMessages';
import { rewindBoard } from '../redux/board/actions';
import { rewindHistory } from '../redux/history/actions';
import { updateMessageSuccess } from '../redux/message/actions';
import { Button } from '../containers/button';

class History extends Component {
  constructor(props){
    super(props)

    this.undoMoveOnClick = this.undoMoveOnClick.bind(this)
  }

  undoMoveOnClick(lastGameState){
    this.props.rewindBoard(lastGameState);
    this.props.rewindHistory();
    const message = "You have undone that move."
    this.props.updateMessageSuccess(message);
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({behavior: "smooth"});
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }


  render() {
    const { history } = this.props
    const prevGameState = history[history.length-1].gameState
    
    return(
      <div>
        <h2 className="history-title">Previous Moves</h2>
        <div className="movesContainer">
          { history.length && history.map(history => <HistoryMessages key={history.id} move={history} />)}
          <div ref={(el) => { this.messagesEnd = el; }}></div>
        </div>
        {history.length > 1 && <Button classes="rewind-btn" handleClick={() => this.undoMoveOnClick(prevGameState)} label="Undo Move" />}
      </div>
    )
  }
}

History.propTypes={
  history: PropTypes.array,
  rewindBoard: PropTypes.func,
  rewindHistory: PropTypes.func,
  updateMessageSuccess: PropTypes.func
}

const mapStateToProps = (state) => {
  return({
    history: state.history
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    rewindBoard: rewindBoard,
    rewindHistory: rewindHistory,
    updateMessageSuccess: updateMessageSuccess
  }, dispatch)
}

export default connect((mapStateToProps), mapDispatchToProps)(History);