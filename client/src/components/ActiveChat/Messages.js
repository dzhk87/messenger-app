import React, { useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const useStyles = makeStyles(() => ({
  root: {
    overflowY: "auto",
  },
}));

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const classes = useStyles();
  const messageRef = useRef(null);

  useEffect(() => {
    const elem = messageRef.current;
    const messageElems = elem?.childNodes || [];
    const lastElem = messageElems[messageElems.length - 1];
    if (lastElem) {
      lastElem.scrollIntoView(false);
    }
  }, [messages.length]);

  return (
    <Box ref={messageRef} className={classes.root}>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
    </Box>
  );
};

export default Messages;
