// rfce
import React, { forwardRef } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./Message.css";

const Message = forwardRef(({ message, username }, ref) => {
  let isUser = username === message.username;

  
  if(username && message.username) {
    isUser = (username.toUpperCase()) === (message.username).toUpperCase();
  }

  return (
    <div ref={ref} className={`message ${isUser && "message__user"}`}>
      <Card className={isUser ? "message__userCard" : "message__guestCard"}>
        <CardContent className="message__card">
          <Typography className="message__text" color="white" varient="h5" component="h2">
            <span className="user">{!isUser && `${message.username || "Unknown User"}: `}</span>
            {message.message}
          </Typography>
          <Typography className="message__time" color="textSecondary">
            {message.time}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default Message;
