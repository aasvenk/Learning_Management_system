import {
  Avatar,
  ChatContainer,
  Conversation,
  ConversationHeader,
  ConversationList,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
  Sidebar
} from "@chatscope/chat-ui-kit-react";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { useEffect, useState } from "react";

function ChatPage() {
  const [messageInputValue, setMessageInputValue] = useState("");
  const [chatSideBar, setChatSideBar] = useState({})
  const [chatHeader, setChatHeader] = useState({})
  const [chatConversation, setChatConversation] = useState([])

  const roboIco =
    "https://gravatar.com/avatar/e667ebe7cfdae109d94f42b9f090f582?s=400&d=robohash&r=x";

  useEffect(() => {
    setChatHeader({
      name: "Applied Algorithms",
      info: "10 online"
    })
    setChatSideBar({
      "group_msgs": [
        {
          name: "Applied Algorithms",
          lastSenderName: "Aashish",
          info: "When is exam?",
          unreadCnt: 1,
          status: "unavailable",
        },
        {
          name: "Software engineering",
          lastSenderName: "Chip",
          info: "Chat!!!",
          unreadCnt: 0,
          status: "available",
        }
      ],
      "direct_msgs": [
        {
          name: "Chip",
          info: "Chat progress",
          status: "unavailable"
        }
      ]
    })
    setChatConversation([
      {
        message: "First message",
        sentTime: "15 mins ago",
        sender: "Zoe",
        direction: "incoming",
        position: "normal"
      },
      {
        message: "First reply",
        sentTime: "15 mins ago",
        sender: "Zoe",
        direction: "outgoing",
        position: "normal"
      }
    ])
  }, [])

  const conversationChanged = (id) => {
    alert('Conversation changed to ' + id)
  }

  const messageSent = (msg) => {
    setMessageInputValue('')
    const newChatConversation = [...chatConversation]
    newChatConversation.push( {
      message: messageInputValue,
      sentTime: "15 mins ago",
      sender: "Zoe",
      direction: "outgoing",
      position: "normal"
    })
    setChatConversation(newChatConversation)
  }

  return (
    <div
      style={{
        height: "100vh",
        position: "relative",
      }}
    >
      <MainContainer responsive>
        <Sidebar position="left" scrollable={false}>
          <ConversationList>
            <h3 style={{ marginLeft: 10 }}> Classes </h3>
            {chatSideBar["group_msgs"] && chatSideBar["group_msgs"].map((item, index) => {
              return (
                <Conversation
                  onClick={(event) => conversationChanged('conversation-id-' + index)}
                  key={'group_' + index}
                  name={item.name}
                  lastSenderName={item.lastSenderName}
                  info={item.info}
                  status={item.status}
                  unreadCnt={item.unreadCnt}
                >
                  <Avatar src={roboIco} name={item.name} status={item.status} />
                </Conversation>
              );
            })}
            <h3 style={{ marginLeft: 10 }}> Direct Messages </h3>
            {chatSideBar["group_msgs"] && chatSideBar["direct_msgs"].map((item, index) => {
              return (
                <Conversation
                  onClick={(event) => conversationChanged('conversation-id-' + index)}
                  key={'direct_' + index}
                  name={item.name}
                  lastSenderName={item.lastSenderName}
                  info={item.info}
                  status={item.status}
                  unreadCnt={item.unreadCnt}
                >
                  <Avatar src={roboIco} name={item.name} status={item.status} />
                </Conversation>
              );
            })}
          </ConversationList>
        </Sidebar>

        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back />
            <Avatar src={roboIco} name={chatHeader.name} />
            <ConversationHeader.Content
              userName={chatHeader.name}
              info={chatHeader.info}
            />
          </ConversationHeader>
          <MessageList>
            {
              chatConversation.map((item, index) => {
                return (
                  <Message
                    key={'chat_msg_' + index}
                    model={{
                      message: item.message,
                      sentTime: item.sentTime,
                      sender: item.sender,
                      direction: item.direction,
                      position: item.position,
                    }}
                  >
                    <Avatar src={roboIco} name="Zoe" />
                  </Message>
                )
              })
            }
          </MessageList>
          <MessageInput
            placeholder="Type message here"
            value={messageInputValue}
            onChange={(val) => setMessageInputValue(val)}
            onSend={() => messageSent("")}
            attachButton={false}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}

export default ChatPage;
