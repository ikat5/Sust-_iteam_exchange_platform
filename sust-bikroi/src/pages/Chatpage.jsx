import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { chatService } from '../services/chatService';
import { initSocket } from '../services/socket';
import { showError } from '../utils/notifications';

const normalizeMessages = (items = []) =>
  items.map((msg) => ({
    ...msg,
    senderId:
      typeof msg.senderId === 'string'
        ? { _id: msg.senderId }
        : msg.senderId || {},
  }));

const createContactSkeleton = (user) => ({
  _id: user?._id,
  fullName: user?.fullName || 'Unknown user',
  userName: user?.userName || '',
  lastMessage: user?.lastMessage || 'No messages yet',
  lastMessageTime: user?.lastMessageTime || null,
});

const ChatPage = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [contacts, setContacts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [contactsLoading, setContactsLoading] = useState(false);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login', { replace: true, state: { from: '/chat' } });
    }
  }, [isAuthenticated, loading, navigate]);

  useEffect(() => {
    if (!isAuthenticated) return;
    const loadContacts = async () => {
      setContactsLoading(true);
      const result = await chatService.getContacts();
      if (result.success) {
        const fetchedContacts = result.data || [];
        setContacts((prev) => {
          const fetchedIds = new Set(fetchedContacts.map((c) => c?._id));
          const preserved = prev.filter(
            (contact) => contact && !fetchedIds.has(contact._id)
          );
          return [...fetchedContacts, ...preserved];
        });
        setFetchError('');
      } else {
        setFetchError(result.message);
        showError(result.message);
      }
      setContactsLoading(false);
    };
    loadContacts();
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated || !location.state?.peer) return;
    const peer = location.state.peer;

    setContacts((prev) => {
      const exists = prev.some((c) => c._id === peer._id);
      if (exists) {
        return prev;
      }
      return [createContactSkeleton(peer), ...prev];
    });

    openChat(peer);
    navigate(location.pathname, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state, isAuthenticated]);

  const openChat = async (contact) => {
    if (!contact?._id) return;
    setSelectedUser(contact);
    setMessages([]);
    setMessagesLoading(true);
    const result = await chatService.getConversation(contact._id);
    if (result.success) {
      setMessages(normalizeMessages(result.data?.messages));
      setFetchError('');
    } else {
      setFetchError(result.message);
      showError(result.message);
    }
    setMessagesLoading(false);
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    socketRef.current = initSocket();
    if (!socketRef.current) return;

    const handleReceive = (data) => {
      const sender = data?.message?.senderId;
      if (
        selectedUser &&
        sender?._id &&
        selectedUser._id === sender._id
      ) {
        setMessages((prev) => [...prev, data.message]);
      }

      if (sender?._id) {
        upsertContact(sender, data.message);
      }
    };

    const handleMessageSent = ({ message }) => {
      if (message) {
        setMessages((prev) => [...prev, message]);
        if (selectedUser?._id) {
          upsertContact(selectedUser, message);
        }
      }
    };

    const handleSocketError = (err) => {
      console.error('Socket error', err);
    };

    socketRef.current.on('receiveMessage', handleReceive);
    socketRef.current.on('messageSent', handleMessageSent);
    socketRef.current.on('error', handleSocketError);

    return () => {
      socketRef.current?.off('receiveMessage', handleReceive);
      socketRef.current?.off('messageSent', handleMessageSent);
      socketRef.current?.off('error', handleSocketError);
    };
  }, [isAuthenticated, selectedUser]);

  const upsertContact = (contactInfo, messagePayload) => {
    setContacts((prev) => {
      const normalizedContact = createContactSkeleton(contactInfo);
      if (!normalizedContact._id) return prev;

      const updatedContact = {
        ...normalizedContact,
        lastMessage: messagePayload?.content || normalizedContact.lastMessage,
        lastMessageTime:
          messagePayload?.createdAt || normalizedContact.lastMessageTime,
      };

      const filtered = prev.filter((c) => c._id !== normalizedContact._id);
      return [updatedContact, ...filtered];
    });
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedUser?._id) return;
    if (!socketRef.current) {
      socketRef.current = initSocket();
    }
    if (!socketRef.current) {
      showError('Unable to connect to chat server');
      return;
    }

    socketRef.current.emit('sendMessage', {
      receiverId: selectedUser._id,
      content: newMessage.trim(),
    });

    setNewMessage('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const FirstLetter = ({ name = '' }) => (
    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
      {name.charAt(0).toUpperCase()}
    </div>
  );

  return (
    <div className="flex h-[calc(100vh-80px)] bg-gray-100">
      <div className="w-96 bg-white border-r border-gray-300 flex flex-col">
        <div className="p-4 bg-blue-600 text-white text-xl font-bold">
          My Chats
        </div>
        <div className="flex-1 overflow-y-auto">
          {contactsLoading ? (
            <div className="p-4 text-gray-500">Loading contacts...</div>
          ) : contacts.length === 0 ? (
            <div className="p-4 text-gray-500">No contacts yet.</div>
          ) : (
            contacts.map((contact) => (
              <div
                key={contact._id}
                onClick={() => openChat(contact)}
                className={`p-4 flex items-center gap-3 hover:bg-gray-100 cursor-pointer border-b ${
                  selectedUser?._id === contact._id ? 'bg-gray-100' : ''
                }`}
              >
                <FirstLetter name={contact.fullName} />
                <div className="flex-1">
                  <div className="font-semibold">{contact.fullName}</div>
                  <div className="text-xs text-gray-500">@{contact.userName}</div>
                  <div className="text-sm text-gray-600 truncate">
                    {contact.lastMessage || 'No messages yet'}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            <div className="bg-blue-600 text-white p-4 flex items-center gap-3">
              <FirstLetter name={selectedUser.fullName} />
              <div>
                <div className="font-semibold">{selectedUser.fullName}</div>
                <div className="text-sm opacity-90">@{selectedUser.userName}</div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {messagesLoading ? (
                <div className="text-gray-500">Loading chat...</div>
              ) : messages.length === 0 ? (
                <div className="text-gray-500">Start the conversation.</div>
              ) : (
                messages.map((msg) => {
                  const senderId =
                    typeof msg.senderId === 'string'
                      ? msg.senderId
                      : msg.senderId?._id;
                  const isMine = senderId === user?._id;
                  return (
                    <div
                      key={msg._id}
                      className={`mb-4 flex ${
                        isMine ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          isMine
                            ? 'bg-blue-600 text-white'
                            : 'bg-white border border-gray-300'
                        }`}
                      >
                        <div>{msg.content}</div>
                        <div className="text-xs opacity-70 mt-1">
                          {msg.createdAt
                            ? new Date(msg.createdAt).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })
                            : ''}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 border rounded-full outline-none focus:border-blue-500"
                />
                <button
                  onClick={sendMessage}
                  className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700"
                >
                  Send
                </button>
              </div>
              {fetchError && (
                <p className="text-xs text-red-500 mt-2">{fetchError}</p>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 text-xl">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;