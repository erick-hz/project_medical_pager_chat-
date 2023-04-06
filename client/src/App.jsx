import React from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { ChannelListContainer, ChannelContainer, Auth } from "./components";
import "./App.css";

const apiKey = "mcc8sx5gncyk";

const client = StreamChat.getInstance(apiKey);

const AuthToken = false;

const App = () => {
  if (!AuthToken) return <Auth />;
  
  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer />

        <ChannelContainer />
      </Chat>
    </div>
  );
};

export default App;
