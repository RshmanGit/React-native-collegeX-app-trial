// Removed the commented code.. which is not working

// /* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { DirectLine } from "botframework-directlinejs";
import {DIRECT_LINE} from "@env";

// {
//   _id: 1,
//   text: 'My message',
//   createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
//   user: {
//     _id: 2,
//     name: 'React Native',
//     avatar: 'https://facebook.github.io/react/img/logo_og.png',
//   },
//   image: 'https://facebook.github.io/react/img/logo_og.png',
//   // Any additional custom parameters are passed through
// }


const directLine = new DirectLine({
  secret: DIRECT_LINE
});
const botMessageToGiftedMessage = botMessage => ({
  ...botMessage,
  _id: botMessage.id,
  createdAt: botMessage.timestamp,
  user: {
    _id: 2,
    name: "React Native",
    avatar:
      "https://d33wubrfki0l68.cloudfront.net/554c3b0e09cf167f0281fda839a5433f2040b349/ecfc9/img/header_logo.svg"
  },
});
function giftedMessageToBotMessage(message) {
  return {
    from: { id: 1, name: "John Doe" },
    type: "message",
    text: message.text
  };
}
export default class ChatBotScreen extends React.Component {
  state = {
    messages: []
  };
  constructor(props) {
    super(props);
    directLine.activity$.subscribe(botMessage => {
      const newMessage = botMessageToGiftedMessage(botMessage);
      this.setState({ messages: [newMessage, ...this.state.messages] });
    });
  }
  onSend = messages => {
    this.setState({ messages: [...messages, ...this.state.messages] });
    messages.forEach(message => {
      directLine
        .postActivity(giftedMessageToBotMessage(message))
        .subscribe(() => console.log("success"), () => console.log("failed"));
    });
  };

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#ffffff'
      }}>
        <GiftedChat
          user={{
            _id: 1
          }}
          messages={this.state.messages}
          onSend={this.onSend}
        />
      </View>
    );
  }
}

