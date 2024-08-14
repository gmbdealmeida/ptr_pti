import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import { useTranslation } from "react-i18next";
import { Transition } from "@headlessui/react";
import { FaDiceTwo, FaMinus } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import {
    GetActiveChats,
    GetMessages,
    GetUserById,
    SendMessage,
} from "../../_services/api";

interface IMessage {
    created_at: string;
    id: number;
    idReceiver: number;
    idReply: number | null;
    idSender: number;
    message: string | null;
}

function Chat(props: any) {
    const [isChatBoxAlive, setIsChatBoxAlive] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isChatListOpen, setIsChatListOpen] = useState(false);
    const [activeChatArray, setActiveChatArray] = useState<any[]>([]);
    const [allHosts, setAllHosts] = useState<any[]>([]);
    const [currentUser, setCurrentUser] = useState<number>(0);
    const [allChats, setAllChats] = useState<any[]>();
    const [hostName, setHostName] = useState<string>("")
    const [hostAvatar, setHostAvatar] = useState<string>("")
    const [hostAddress, setHostAddress] = useState<string>("")
    const [lockUseEffect, setLockUseEffect] = useState(true)
    
    
    useEffect(() => {
        if(localStorage.getItem('authenticated') === 'true') {
            getActiveChat();
            setInterval(refreshMessages, 30000)
        }
    }, [newchatCreated()]);
    
    function newchatCreated() {
        if(props.update && lockUseEffect) {
            console.log(props)
            setLockUseEffect(false);
            getActiveChat();
        }
    }

    function refreshMessages() {
        getActiveChat()
    }

    function sendMessage() {
        if(allHosts.length > 0 ) {
            let message = (document.getElementById("message-id") as HTMLInputElement).value
            if(message.length > 0) {
                SendMessage(allHosts[currentUser].id, message)
                    .then(res => {
                        getActiveChat()
                        let obj = (document.getElementById('messages') as HTMLElement)
                        obj.scrollTop = obj.scrollHeight
                    })
                    .catch(err => console.log(err))
            }
        }
    }

    function getActiveChat() {
        GetActiveChats()
            .then((res) => {
                setActiveChatArray(res.data);

                let promises = [];

                for (let i = 0; i < res.data.length; i++) {
                    promises.push(
                        GetMessages(
                            JSON.parse(
                                localStorage.getItem("userData") as string
                            ).id,
                            res.data[i]
                        )
                    );
                }

                Promise.all(promises).then((responses: any) => {
                    let messages = responses.map((d: any) => {
                        return d.data;
                    });
                    setAllChats(messages);
                });

                // message receiver info

                let promisesHost = [];

                for (let i = 0; i < res.data.length; i++) {
                    promisesHost.push(GetUserById(res.data[i]));
                }

                Promise.all(promisesHost).then((responses: any) => {
                    let hosts = responses.map((d: any) => {
                        return d.data.user;
                    });
                    setAllHosts(hosts);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    
    function closeChat() {
      setIsChatBoxAlive(false);
    }
    
    function createChatHistory() {
      let chatHistory: any[] = [];
      if (allHosts.length > 0 && allChats) {
        for (let i = 0; i < allChats[currentUser]?.length; i++) {
          const element = allChats[currentUser][i];
          if(allChats[currentUser][i].message !== "") {
            if(allHosts[currentUser].id === allChats[currentUser][i].idReceiver){
                    //left
                    chatHistory.push(
                      <div className="chat-message">
                          <div className="flex items-end justify-end">
                              <div className="flex flex-col space-y-2 text-xs w-56 max-w-xs mx-2 order-1 items-end">
                                  <div>
                                      <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                                        {allChats[currentUser][i].message}
                                      </span>
                                  </div>
                              </div>
                              <img
                                  src={(JSON.parse(localStorage.getItem('userData') as string)).avatar}
                                  alt="My profile"
                                  className="w-6 h-6 rounded-full order-2"
                              />
                          </div>
                      </div>
                  );
                } else {
                    //right
                    chatHistory.push(
                        <div className="chat-message">
                            <div className="flex items-end">
                                <div className="flex flex-col space-y-2 text-xs w-56 max-w-xs mx-2 order-2 items-start">
                                    <div>
                                        <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                                          {allChats[currentUser][i].message}
                                        </span>
                                    </div>
                                </div>
                                <img
                                    src={allHosts[currentUser].avatar}
                                    alt="My profile"
                                    className="w-6 h-6 rounded-full order-1"
                                />
                            </div>
                        </div>
                    );
  
                  }
          }
                
            }
        }
        return chatHistory;
    }

    function openChat(id: any) {
        setIsChatBoxAlive(true);
        setIsChatOpen(true);
        setCurrentUser(id);
        setHostAvatar((allHosts as any[])[id].avatar)
        setHostName((allHosts as any[])[id].name)
        setHostAddress((allHosts as any[])[id].address)
        // let obj = (document.getElementById('messages') as HTMLElement)
        // obj.scrollTop = obj.scrollHeight
    }

    function toggleChatList() {
        setIsChatListOpen(!isChatListOpen);
        getActiveChat();
    }

    function createChatList() {
        let chatList: any[] = [];
        if (allHosts.length > 0) {
            for (let i = 0; i < activeChatArray.length; i++) {
                chatList.push(
                    <div className="flex items-center justify-between border-b-2 border-dark_blue p-2">
                        <div className="flex items-center space-x-4">
                            <img
                                src={(allHosts as any[])[i]?.avatar}
                                alt=""
                                className="w-12 h-12 rounded-full"
                            />
                            <div className="flex flex-col leading-tight">
                                <div className="text-lg mt-1 flex items-center">
                                    <span className="text-gray-700 mr-3">
                                        {(allHosts as any[])[i]?.name}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex ml-16 items-end space-x-2">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                                onClick={() => {
                                    openChat(i);
                                }}
                            >
                                Open
                            </button>
                        </div>
                    </div>
                );
            }
        }
        return chatList;
    }
    return (
        <div className="flex space-x-4">
            {isChatBoxAlive && (
                <Transition
                    show={!isChatOpen}
                    className="self-end"
                    enter="transition ease-in-out duration-500 transform"
                    enterFrom="hidden"
                    enterTo="hidden"
                    leave="transition ease-in-out duration-500 transform"
                    leaveFrom="hidden"
                    leaveTo="hidden"
                >
                    <div className="flex items-start justify-start bg-dark_blue p-2 pl-4 rounded-t-lg cursor-pointer">
                        <div
                            className="flex items-start justify-start"
                            onClick={() => setIsChatOpen(!isChatOpen)}
                        >
                            <img
                                src={hostAvatar}
                                alt="My profile"
                                className="w-8 h-8 rounded-full"
                            />
                            <div className="flex text-xs w-64 max-w-xs mx-2 justify-center">
                                <div className="text-xl flex items-center">
                                    <span className="text-white mr-3 align-middle	">
                                        {hostName}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div
                            className="flex justify-center items-center"
                            onClick={closeChat}
                        >
                            <MdClose size={28} color="#ffffff" />
                        </div>
                    </div>
                </Transition>
            )}
            <Transition
                show={isChatOpen}
                enter="transition ease-in-out duration-500 transform"
                enterFrom="translate-y-96"
                enterTo="translate-y-0"
                leave="transition ease-in-out duration-500 transform"
                leaveFrom="translate-y-0"
                leaveTo="translate-y-96"
            >
                <div className="flex-1 p-2 justify-between flex flex-col h-96 bg-white border-t-2 border-l-2 border-r-2 border-dark_blue rounded-t-3xl">
                    <div className="flex items-center justify-between border-b-2 border-dark_blue p-2">
                        <div className="flex items-center space-x-4">
                            <img
                                src={hostAvatar}
                                alt=""
                                className="w-12 h-12 rounded-full"
                            />
                            <div className="flex flex-col leading-tight">
                                <div className="text-lg mt-1 flex items-center">
                                    <span className="text-gray-700 mr-3">
                                        {hostName}
                                    </span>
                                </div>
                                <span className="text-xs text-gray-600">
                                    {hostAddress}
                                </span>
                            </div>
                        </div>
                        <div className="flex ml-16 items-end space-x-2">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                                onClick={() => setIsChatOpen(!isChatOpen)}
                            >
                                <FaMinus color="#2D4059" />
                            </button>
                        </div>
                    </div>
                    <div
                        id="messages"
                        className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
                    >
                        {createChatHistory()}
                    </div>
                    <div className="border-t-2 border-gray-200 px-4 pt-4 mb-0">
                        <div className="relative flex">
                            <textarea
                                id="message-id"
                                placeholder="Write Something"
                                className="w-72 h-12 overflow-hidden resize-none focus:outline-none focus:ring-0 focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-6 pr-8 bg-gray-200 rounded-l-full"
                            />
                            <div className="absolute right-0 items-center inset-y-0 flex">
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                                    onClick={() => {
                                        sendMessage()
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="h-6 w-6 transform rotate-90"
                                    >
                                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
            <Transition
                show={!isChatListOpen}
                className="self-end"
                enter="transition ease-in-out duration-100 transform"
                enterFrom="hidden"
                enterTo="hidden"
                leave="transition ease-in-out duration-100 transform"
                leaveFrom="hidden"
                leaveTo="hidden"
            >
                <div
                    className="justify-center items-center bg-dark_blue p-2 rounded-t-lg cursor-pointer"
                    onClick={() => toggleChatList()}
                >
                    <FiPlusCircle color="#ffffff" size={32} />
                </div>
            </Transition>
            <Transition
                show={isChatListOpen}
                enter="transition ease-in-out duration-100 transform"
                enterFrom="translate-x-0"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-100 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-0"
            >
                <div className="flex-1 p-2 flex flex-col h-96 bg-white border-t-2 border-l-2 border-r-2 border-dark_blue rounded-t-3xl">
                    <div
                        className="flex justify-between border-b-2 border-dark_blue p-2"
                        onClick={() => toggleChatList()}
                    >
                        <div className="inline-flex items-center justify-center">
                            <p className="text-2xl font-medium">Chats</p>
                        </div>
                        <div className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none cursor-pointer">
                            <FaMinus />
                        </div>
                    </div>
                    {createChatList()}
                </div>
            </Transition>
        </div>
    );
}

export default Chat;
