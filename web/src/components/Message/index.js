// @flow
import React from 'react';
import moment from 'moment';
import Avatar from '../Avatar';

const Message = ({ message: { text, inserted_at, user } }) =>
  <div style={{ display: 'flex', marginBottom: '10px' }}>
    <Avatar email={user.email} user_avatar={user.user_avatar} style={{ marginRight: '10px' }} />
    <div>
      <div style={{ lineHeight: '1.2' }}>
        <b style={{ marginRight: '8px', fontSize: '14px' }}>{user.username}</b>
        <time style={{ fontSize: '12px', color: 'rgb(192,192,192)' }}>{moment(inserted_at).format('h:mm A')}</time>
      </div>
      <div>{text}</div>
    </div>
  </div>;

export default Message;