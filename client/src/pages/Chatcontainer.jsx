import React, { useEffect, useRef, useCallback } from 'react';
import { useChatStore } from '../store/useChatStore';
import MessageSkeleton from './skeletons/MessageSkeleton';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import { useAuthStore } from '../store/useAuthStore';
import avatar from "../assets/avatar.png";
import { format } from "date-fns";
import { motion, useAnimation } from "framer-motion";

const Chatcontainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const controls = useAnimation(); // Framer Motion animation controls

  // Memoized functions to prevent unnecessary re-renders
  const fetchMessages = useCallback(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
    }
  }, [selectedUser?._id, getMessages, subscribeToMessages]);

  useEffect(() => {
    fetchMessages();
    return () => unsubscribeFromMessages();
  }, [fetchMessages, unsubscribeFromMessages]);

  useEffect(() => {
    controls.start({ y: 0, transition: { duration: 0.5, ease: "easeOut" } });
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, controls]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <ChatHeader />

      <motion.div
        className="flex-1 p-4 space-y-4 overflow-y-auto 
        scrollbar-thin scrollbar-thumb-gray-700 
        scrollbar-track-gray-900 hover:scrollbar-thumb-gray-500"
        animate={controls}
      >
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePicture || avatar
                      : selectedUser?.profilePicture || avatar
                  }
                  alt="profile picture"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1 font-sans">
                {message.createdAt ? format(new Date(message.createdAt), "MMM dd, h:mm a") : "Invalid Date"}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}

        <div ref={messageEndRef}></div>
      </motion.div>

      <MessageInput />
    </div>
  );
};

export default Chatcontainer;
