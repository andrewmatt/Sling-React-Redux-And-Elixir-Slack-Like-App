// @flow
import React from 'react';
import md5 from 'md5';


const Avatar = ({ email, user_avatar, size = 40, style }) => {

  
  let uri = user_avatar;
  if (uri == null) {
    uri = 'https://i.imgur.com/jNNT4LE.png';
  }

  else if ( !(uri.startsWith("https://i.imgur.com/"))){
    uri = 'https://i.imgur.com/jNNT4LE.png';
  }
  console.log("here's the uri link", uri);
  return (
    <img
      src={uri}
      alt={email}
      style={{ width: `${size}px`, height: `${size}px`, borderRadius: '4px', ...style }}
    />
  );
};

export default Avatar;