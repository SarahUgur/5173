import React, { useState, useEffect } from 'react';
import { X, Search, Send, Phone, Video, MoreHorizontal, User as UserIcon, MessageCircle, Clock } from 'lucide-react';
import type { User } from '../types';

interface MessagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

interface Conversation {
  id: string;
  participants: User[];
  lastMessage: Message;
  unreadCount: number;
}

const MessagesModal: React.FC<MessagesModalProps> = ({ isOpen, onClose, currentUser }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadConversations();
    }
  }, [isOpen]);

  const loadConversations = async () => {
    setLoading(true);
    try {
      // Mock conversations data
      const mockConversations: Conversation[] = [
        {
          id: '1',
          participants: [
            currentUser,
            {
              id: '2',
              name: 'Maria Hansen',
              email: 'maria@example.com',
              avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
              location: 'København',
              memberSince: new Date('2023-01-15'),
              rating: 4.8,
              completedJobs: 45,
              isOnline: true,
              subscription: 'basic'
            }
          ],
          lastMessage: {
            id: '1',
            senderId: '2',
            receiverId: currentUser.id,
            content: 'Hej! Jeg er interesseret i rengøringsjobbet. Hvornår kan vi mødes?',
            timestamp: new Date(Date.now() - 30 * 60 * 1000),
            read: false
          },
          unreadCount: 2
        },
        {
          id: '2',
          participants: [
            currentUser,
            {
              id: '3',
              name: 'Lars Nielsen',
              email: 'lars@example.com',
              avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
              location: 'Aarhus',
              memberSince: new Date('2022-08-20'),
              rating: 4.6,
              completedJobs: 32,
              isOnline: false,
              subscription: 'pro'
            }
          ],
          lastMessage: {
            id: '2',
            senderId: currentUser.id,
            receiverId: '3',
            content: 'Tak for det gode arbejde! Jeg vil gerne booke dig igen næste måned.',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            read: true
          },
          unreadCount: 0
        }
      ];

      setConversations(mockConversations);
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      // Mock messages data
      const mockMessages: Message[] = [
        {
          id: '1',
          senderId: '2',
          receiverId: currentUser.id,
          content: 'Hej! Jeg så dit opslag om rengøring.',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          read: true
        },
        {
          id: '2',
          senderId: currentUser.id,
          receiverId: '2',
          content: 'Hej Maria! Tak for din interesse. Hvornår har du tid?',
          timestamp: new Date(Date.now() - 90 * 60 * 1000),
          read: true
        },
        {
          id: '3',
          senderId: '2',
          receiverId: currentUser.id,
          content: 'Jeg er ledig i morgen eftermiddag. Hvad med kl. 14?',
          timestamp: new Date(Date.now() - 60 * 60 * 1000),
          read: true
        },
        {
          id: '4',
          senderId: '2',
          receiverId: currentUser.id,
          content: 'Hej! Jeg er interesseret i rengøringsjobbet. Hvornår kan vi mødes?',
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          read: false
        }
      ];

      setMessages(mockMessages);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      receiverId: selectedConversation.participants.find(p => p.id !== currentUser.id)?.id || '',
      content: newMessage.trim(),
      timestamp: new Date(),
      read: false
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Update conversation's last message
    setConversations(prev => prev.map(conv => 
      conv.id === selectedConversation.id 
        ? { ...conv, lastMessage: message }
        : conv
    ));
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Nu';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}t`;
    if (days < 7) return `${days}d`;
    return date.toLocaleDateString('da-DK');
  };

  const getOtherParticipant = (conversation: Conversation) => {
    return conversation.participants.find(p => p.id !== currentUser.id);
  };

  const filteredConversations = conversations.filter(conv => {
    const otherParticipant = getOtherParticipant(conv);
    return otherParticipant?.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[600px] flex overflow-hidden">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Beskeder</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Søg samtaler..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-gray-500">
                <MessageCircle className="w-8 h-8 mb-2" />
                <p className="text-sm">Ingen samtaler fundet</p>
              </div>
            ) : (
              filteredConversations.map((conversation) => {
                const otherParticipant = getOtherParticipant(conversation);
                if (!otherParticipant) return null;

                return (
                  <button
                    key={conversation.id}
                    onClick={() => {
                      setSelectedConversation(conversation);
                      loadMessages(conversation.id);
                    }}
                    className={`w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100 transition-colors ${
                      selectedConversation?.id === conversation.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={otherParticipant.avatar}
                          alt={otherParticipant.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {otherParticipant.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900 truncate">
                            {otherParticipant.name}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {formatTime(conversation.lastMessage.timestamp)}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 truncate mt-1">
                          {conversation.lastMessage.senderId === currentUser.id ? 'Du: ' : ''}
                          {conversation.lastMessage.content}
                        </p>
                      </div>
                      
                      {conversation.unreadCount > 0 && (
                        <div className="w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                          {conversation.unreadCount}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={getOtherParticipant(selectedConversation)?.avatar}
                      alt={getOtherParticipant(selectedConversation)?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {getOtherParticipant(selectedConversation)?.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {getOtherParticipant(selectedConversation)?.isOnline ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Phone className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Video className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreHorizontal className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.senderId === currentUser.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.senderId === currentUser.id ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    placeholder="Skriv en besked..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Vælg en samtale</h3>
                <p className="text-gray-600">Vælg en samtale fra listen for at begynde at chatte</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesModal;