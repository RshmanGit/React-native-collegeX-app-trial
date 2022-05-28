// import React from "react";
// import { StyleSheet, Text, View } from "react-native";
// import { GiftedChat } from "react-native-gifted-chat";
// import { DirectLine } from "botframework-directlinejs";

// const directLine = new DirectLine({
//   secret: "Ncz1-8fdqZs.FDPK5HDPjkFjBuBSfae0Zq-zz3-2e7Y0bIvZpHUHnv8",
//   webSocket: true,
// });

// const botMessageToGiftedMessage = botMessage => {
//   console.log('botMessage: ', botMessage)
//  return { ...botMessage,
//   _id: botMessage.id,
//   createdAt: botMessage.timestamp,
//   user: {
//     _id: "2",
//     name: "TempBot",
//     avatar:
//       "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fen%2Fsearch%3Fq%3Dbot%2BIcon&psig=AOvVaw1nHE7NoprAhx5PHF5Rgxp7&ust=1653385575313000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCNiKm7Kr9fcCFQAAAAAdAAAAABAD"
//   },
//   trustedOrigin: ["http://localhost:19006"]
// }};

// function giftedMessageToBotMessage(message) {
//   return {
//     from: { id: "1", name: "John Doe" },
//     type: "message",
//     text: message.text
//   };
// }

// export default class App extends React.Component {
//   state = {
//     messages: []
//   };

// constructor(props) {
//     super(props);
//     console.log(directLine.connectionStatus$)
//     directLine.getSessionId().subscribe(
//       res => console.log('from get session id: ', res),
//       err => console.log('failed at get session id')
//     );

//     console.log('directline: ', directLine)

//     // directLine.activity$.subscribe(botMessage => {
//     //   // console.log(botMessage)
//     //   const newMessage = botMessageToGiftedMessage(botMessage);
//     //   this.setState({ messages: [newMessage, ...this.state.messages] });
//     // });

//     // directLine.postActivity({
//     //   from: { _id: "1",  }, // required (from.name is optional)
//     //   type: 'message',
//     //   text: 'a message for you, Rudy'
//     // }).subscribe(
//     //   id => console.log("Posted activity, assigned ID ", id),
//     //   error => console.log("Error posting activity", error)
//     // );
//   }

//   // componentDidMount() {
//   //   directline.
//   // }

// onSend = messages => {
//     this.setState({ messages: [...messages, ...this.state.messages] });
//     messages.forEach(message => {
//       directLine
//         .postActivity(giftedMessageToBotMessage(message))
//         .subscribe(
//           (response) => console.log("success", response), 
//           (err) => console.log("failed", err)
//         );
//     });
//   };
// render() {
//     return (
//       <View style={styles.container}>
//         <GiftedChat
//           user={{
//             _id: 1
//           }}
//           messages={this.state.messages}
//           onSend={this.onSend}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   }
// });

// /* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text } from 'react-native';

// create a component
export default function ChatBotScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Text>ChatBot!</Text>
    </View>
  );
}
