// @flow
import React from 'react';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  roomSidebar: {
    color: '#000',
    background: 'rgb(243, 222, 138)',
  },

  header: {
    padding: '20px 15px',
    marginBottom: '10px',
    width: '155px',
  },

  roomName: {
    marginBottom: '0',
    fontSize: '22px',
    lineHeight: '1',
    color: '#fff',
  },

  userList: {
    paddingLeft: '15px',
    listStyle: 'none',
  },

  username: {
    position: 'relative',
    paddingLeft: '20px',
    fontSize: '14px',
    fontWeight: '300',
    ':after': {
      position: 'absolute',
      top: '7px',
      left: '0',
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: 'rgb(64,151,141)',
      content: '""',
    },
  },

  listHeading: {
    marginLeft: '15px',
    marginBottom: '5px',
    fontSize: '13px',
    textTransform: 'uppercase',
  },
});

const RoomSidebar = ({ room, currentUser, presentUsers }) =>
  <div className={css(styles.roomSidebar)}>
    <div className={css(styles.header)}>
      <h2 className={css(styles.roomName)}></h2>
    </div>
    <div className={css(styles.listHeading)}>Active Users</div>
    <ul className={css(styles.userList)}>
      {presentUsers.map(user =>
        <li key={user.id} className={css(styles.username)}>{user.username}</li>
      )}
    </ul>
  </div>;

export default RoomSidebar;