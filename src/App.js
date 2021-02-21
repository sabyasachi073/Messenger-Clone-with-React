import React, { useEffect, useState } from "react";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import "./App.css";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";
import moment from "moment";

function App() {
  document.body.style.margin = "0";
  document.body.style.backgroundImage = "url('background.jpg')";

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]); // In order to send the message we need to store it
  const [username, setUsername] = useState("");

  // useState = variable in REACT
  // useEffect = Run a bunch of code on a condition in REACT

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        )
      ); // doc.data() returs an array of objets of each element
  }, []);

  useEffect(() => {
    // If its blank inside [], this code runs ONCE when the app component loads
    setUsername(prompt("Please Enter Your Name: "));
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    let time = moment().format("hh:mm A");
    let date = moment().format("DD/MM/YYYY");

    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      time: time,
      date: date,
    });

    // All the logic to send a message
    setMessages([
      ...messages,
      { username: username, message: input, time: time, date: date },
    ]);

    setInput("");
  };

  return (
    <div className="App">
    
      <header>
        <h2 className="welcome__bar">
          <span className="logo__container">
            <img className="logo" src="messenger__icon.png" />
            <span className="logo__text">Messenger Clone</span>
          </span>
          <span className="Welcome__text">Welcome {username}</span>
        </h2>
      </header>

      <div className="spacer"></div>

      <form className="app__form">
        <FormControl className="app__formControl">
          <Input
            className="app__input"
            placeholder="Enter a message..."
            htmlFor="my-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />

          <IconButton
            className="app__iconButton "
            type="submit"
            disabled={!input}
            variant="contained"
            color="primary"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>

      <div className="spacer"></div>
      <div className="message__hide"></div>
    </div>
  );
}

export default App;
