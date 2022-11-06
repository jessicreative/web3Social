# popup-chat-react

`popup-chat-react` provides an intercom-like chat window that can be included easily in any project for free. It provides no messaging facilities, only the view component.

![GitHub license](https://img.shields.io/github/package-json/v/asliddinusmonov/popup-chat-react.svg?style=flat-square) <a href="https://www.npmjs.com/package/popup-chat-react" target="\_parent">
  <img alt="" src="https://img.shields.io/npm/dm/popup-chat-react.svg" />
</a>
<a href="https://github.com/asliddinusmonov/popup-chat-react" target="\_parent">
  <img alt="" src="https://img.shields.io/github/stars/asliddinusmonov/popup-chat-react.svg?style=social&label=Star" />
</a>
<br/>

![Demo gif of popup-chat-react being used](https://puu.sh/xei2F/fd4a121185.gif)

## Features

- Customizeable
- Backend agnostic
- Free

## [Demo](https://asliddinusmonov.github.io/popup-chat-react/)

## Table of Contents
- [Installation](#installation)
- [Example](#example)
- [Components](#components)

## Installation

```
$ npm install popup-chat-react
```

## Example

``` javascript
import React, { useState } from 'react';
import { Launcher } from '../../src';

function Demo() {
  const [state, setState] = useState({
    messageList: [],
    newMessagesCount: 0,
    isOpen: false,
    fileUpload: true,
  });

  function onMessageWasSent(message) {
    setState(state => ({
      ...state,
      messageList: [...state.messageList, message]
    }));
  }

  function onFilesSelected(fileList) {
    const objectURL = window.URL.createObjectURL(fileList[0]);

    setState(state => ({
      ...state,
      messageList: [
        ...state.messageList,
        {
          type: 'file', author: 'me',
          data: {
            url: objectURL,
            fileName: fileList[0].name,
          }
        }
      ]
    }));
  }

  function sendMessage(text) {
    if (text.length > 0) {
      const newMessagesCount = state.isOpen ? state.newMessagesCount : state.newMessagesCount + 1;

      setState(state => ({
        ...state,
        newMessagesCount: newMessagesCount,
        messageList: [
          ...state.messageList,
          {
            author: 'them',
            type: 'text',
            data: { text }
          }
        ]
      }));
    }
  }

  function onClick() {
    setState(state => ({
      ...state,
      isOpen: !state.isOpen,
      newMessagesCount: 0
    }));
  }

  return (
    <div>
      <Header />

      <TestArea
        onMessage={sendMessage}
      />

      <Launcher
        agentProfile={{
          teamName: 'popup-chat-react',
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
        }}
        onMessageWasSent={onMessageWasSent}
        onFilesSelected={onFilesSelected}
        messageList={state.messageList}
        newMessagesCount={state.newMessagesCount}
        onClick={onClick}
        isOpen={state.isOpen}
        showEmoji
        fileUpload={state.fileUpload}
        pinMessage={{
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
          title: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
          text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
        }}
        placeholder='placeholder'
      />

      <img className="demo-monster-img" src={monsterImgUrl} />
      <Footer />
    </div>
  );
}
```

For more detailed examples see the demo folder.

## Components

# Launcher

`Launcher` is the only component needed to use popup-chat-react. It will react dynamically to changes in messages. All new messages must be added via a change in props as shown in the example.

Launcher props:

|      prop        | type   | required | description |
|------------------|--------|----------|-------------|
| agentProfile     | [object](#agent-profile-objects) | yes | Represents your product or service's customer service agent. Fields: imageUrl (string), teamName (string). |
| onClick          | function | yes | Intercept the click event on the launcher. No argument sent when function is called. |
| isOpen           | boolean | yes | Force the open/close state of the chat window. If this is not set, it will open and close when clicked. |
| messageList      | [[message](#message-objects)] | yes | An array of message objects to be rendered as a conversation. |
| mute             | boolean | no | Don't play sound for incoming messages. Defaults to `false`. |
| newMessagesCount | number | no | The number of new messages. If greater than 0, this number will be displayed in a badge on the launcher. Defaults to `0`. |
| onFilesSelected  | function([fileList](https://developer.mozilla.org/en-US/docs/Web/API/FileList)) | no | Called after file has been selected from dialogue in chat window. |
| onMessageWasSent | function([message](#message-objects)) | yes | Called when a message is sent, with a message object as an argument. |
| showEmoji        | boolean | no | Whether or not to show the emoji button in the input bar. Defaults to `true`.
| fileUpload       | boolean | no | 
| pinMessage       | object  | no | 
| placeholder      | string  | no | 


### Message Objects

Message objects are rendered differently depending on their type. Currently, only text, file, and emoji types are supported. Each message object has an `author` field which can have the value 'me' or 'them'.

``` javascript
{
  author: 'them',
  type: 'text',
  data: {
    text: 'some text'
  }
}

{
  author: 'me',
  type: 'emoji',
  data: {
    code: 'someCode'
  }
}


{
  author: 'me',
  type: 'file',
  data: {
    url: 'somefile.mp3',
    fileName: 'Any old name'
  }
}

```

### Agent Profile Objects

Look like this:

```js
{
  imageUrl: 'https://somewhere.on/the_web.png',
  teamName: 'Da best'
}
```
