import React, { Component } from 'react';
import {connect} from 'react-redux';

import { HistoryMessages } from '../containers/historyMessages';

class History extends Component {

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({behavior: "smooth"});
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }


  render() {
    const { history } = this.props
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

const mapStateToProps = (state) => {
  return({
    history: state.history
  })
}

export default connect(mapStateToProps)(History);