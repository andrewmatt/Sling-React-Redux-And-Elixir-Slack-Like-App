// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { connectToChannel, leaveChannel, createMessage, loadOlderMessages } from '../../actions/room'; // add loadOlderMessages
import MessageList from '../../components/MessageList';
import MessageForm from '../../components/MessageForm';
import RoomNavbar from '../../components/RoomNavbar';
import RoomSidebar from '../../components/RoomSidebar';


class Room extends Component {
  componentDidMount() {
    this.props.connectToChannel(this.props.socket, this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.props.leaveChannel(this.props.channel);
      this.props.connectToChannel(nextProps.socket, nextProps.params.id);
    }
    if (!this.props.socket && nextProps.socket) {
      this.props.connectToChannel(nextProps.socket, nextProps.params.id);
    }
  }

  componentWillUnmount() {
    this.props.leaveChannel(this.props.channel);
  }

  handleLoadMore = () =>
    this.props.loadOlderMessages(
      this.props.params.id,
      { last_seen_id: this.props.messages[0].id }
    )

  handleMessageCreate = (data) => {
    this.props.createMessage(this.props.channel, data);
    this.messageList.scrollToBottom(); 
  }

  render() {
    const moreMessages = this.props.pagination.total_pages > this.props.pagination.page_number; // new line

    return (
      <div style={{ display: 'flex', height: '100vh', }}>
         
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <RoomNavbar room={this.props.room} />
          <MessageList 
            moreMessages={moreMessages}
            messages={this.props.messages}
            onLoadMore={this.handleLoadMore}
            ref={(c) => { this.messageList = c; }}
            loadingOlderMessages={this.props.loadingOlderMessages}
          />
          <MessageForm onSubmit={this.handleMessageCreate} />
        </div>
         <RoomSidebar
            room={this.props.room}
            currentUser={this.props.currentUser}
            presentUsers={this.props.presentUsers}
          />
      </div>
    );
  }
}

export default connect(
  state => ({
    room: state.room.currentRoom,
    socket: state.session.socket,
    channel: state.room.channel,
    messages: state.room.messages,
    presentUsers: state.room.presentUsers,
    currentUser: state.session.currentUser,
    pagination: state.room.pagination, // new line
    loadingOlderMessages: state.room.loadingOlderMessages, // new line
  }),
  { connectToChannel, leaveChannel, createMessage, loadOlderMessages } // add loadOlderMessages
)(Room);