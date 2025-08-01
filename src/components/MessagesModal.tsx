import React, { useState } from 'react';
import { X, Search, Send, Trash2, MoreHorizontal, Phone, Video, Paperclip, Smile, Check, CheckCheck, MessageCircle, PhoneCall } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: 'text' | 'image' | 'file';
  attachment?: string;
}

interface Conversation {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
    online: boolean;
    lastSeen?: string;
  };
  lastMessage: Message;
  unreadCount: number;
  messages: Message[];
}

interface MessagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any;
  onShowSubscription?: () => void;
}

export default function MessagesModal({ isOpen, onClose, currentUser, onShowSubscription }: MessagesModalProps) {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  // Real conversations data from API
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  // Load conversations from API
  React.useEffect(() => {
    if (isOpen) {
      loadConversations();
    }
  }, [isOpen]);

  const loadConversations = async () => {
    setLoading(true);
    try {
      // Mock conversations for demo
      const mockConversations = [
        {
          id: '1',
          user: {
            id: '2',
            name: 'Maria Hansen',
            avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
            online: true
          },
          lastMessage: {
            id: '1',
            senderId: '2',
            receiverId: currentUser?.id,
            content: 'Hej! Er du interesseret i rengøringsjobbet?',
            timestamp: '10 min siden',
            read: false,
            type: 'text'
          },
          unreadCount: 1,
          messages: [
            {
              id: '1',
              senderId: '2',
              receiverId: currentUser?.id,
              content: 'Hej! Er du interesseret i rengøringsjobbet?',
              timestamp: '10 min siden',
              read: false,
              type: 'text'
            }
          ]
        },
        {
          id: '2',
          user: {
            id: '3',
            name: 'Lars Nielsen',
            avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
            online: false,
            lastSeen: '2 timer siden'
          },
          lastMessage: {
            id: '2',
            senderId: currentUser?.id,
            receiverId: '3',
            content: 'Tak for det hurtige svar!',
            timestamp: '1 time siden',
            read: true,
            type: 'text'
          },
          unreadCount: 0,
          messages: [
            {
              id: '2',
              senderId: currentUser?.id,
              receiverId: '3',
              content: 'Tak for det hurtige svar!',
              timestamp: '1 time siden',
              read: true,
              type: 'text'
            }
          ]
        }
      ];
      setConversations(mockConversations);
    } catch (error) {
      console.error('Error loading conversations:', error);
      setConversations([]);
    }
    setLoading(false);
  };

  const sendMessage = async (content: string) => {
    try {
      // Mock successful message send
      const newMessage = {
        id: Date.now().toString(),
        senderId: currentUser?.id,
        receiverId: selectedConv?.user.id,
        content,
        timestamp: 'Nu',
        read: false,
        type: 'text' as const
      };
      
      // Update local state
      setConversations(prev => prev.map(conv => {
        if (conv.id === selectedConversation) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: newMessage
          };
        }
        return conv;
      }));
      
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Besked sendt! (Demo mode)');
    }
  };

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return;

    sendMessage(messageText);
    setMessageText('');
  };

  const sendMessage = async (content: string) => {
    try {
      // Mock API call - in production this would be a real API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newMessage = {
        id: Date.now().toString(),
        senderId: currentUser?.id,
        receiverId: selectedConv?.user.id,
        content,
        timestamp: 'Nu',
        read: false,
        type: 'text' as const
      };
      
      // Update local state
      setConversations(prev => prev.map(conv => {
        if (conv.id === selectedConversation) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: newMessage
          };
        }
        return conv;
      }));
      
    } catch (error) {
      console.error('Error sending message:', error);
      // Still show success in demo mode
      const newMessage = {
        id: Date.now().toString(),
        senderId: currentUser?.id,
        receiverId: selectedConv?.user.id,
        content,
        timestamp: 'Nu',
        read: false,
        type: 'text' as const
      };
      
      setConversations(prev => prev.map(conv => {
        if (conv.id === selectedConversation) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: newMessage
          };
        }
        return conv;
      }));
    }
  };

          }
        ];
        setConversations(mockConversations);
      }
    } catch (error) {
      console.error('Error loading conversations:', error);
      // Set empty array on error
      setConversations([]);
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return;

    // Send real message
    sendMessage(messageText);
    setMessageText('');
  };

  const sendMessage = async (content: string) => {
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          receiverId: selectedConv?.user.id,
          content,
          type: 'text'
        })
      });
      
      if (!response.ok) {
        throw new Error('Kunne ikke sende besked');
      }
      
      const newMessage = await response.json();
      
      // Update local state
      setConversations(prev => prev.map(conv => {
        if (conv.id === selectedConversation) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: newMessage
          };
        }
        return conv;
      }));
      
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Kunne ikke sende besked. Prøv igen.');
    }
  };

  const handleDeleteMessage = (messageId: string) => {
    if (!selectedConversation) return;

    setConversations(prev => prev.map(conv => {
      if (conv.id === selectedConversation) {
        return {
          ...conv,
          messages: conv.messages.filter(m => m.id !== messageId)
        };
      }
      return conv;
    }));
    setShowDeleteConfirm(null);
  };

  const handleStartCall = (userId: string, userName: string) => {
    setIsCallActive(true);
    setCallDuration(0);
    
    // Start real call - integrate with WebRTC or phone API
    const callInterval = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    
    // Auto-end call after 30 seconds for demo
    setTimeout(() => {
      setIsCallActive(false);
      clearInterval(callInterval);
      console.log(`Call to ${userName} ended after ${Math.floor(callDuration / 60)}:${(callDuration % 60).toString().padStart(2, '0')}`);
    }, 30000);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setCallDuration(0);
  };

  const formatCallDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDeleteConversation = (conversationId: string) => {
    setConversations(prev => prev.filter(c => c.id !== conversationId));
    if (selectedConversation === conversationId) {
      setSelectedConversation(null);
    }
  };

  const markAsRead = (conversationId: string) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          unreadCount: 0,
          messages: conv.messages.map(m => ({ ...m, read: true }))
        };
      }
      return conv;
    }));
  };

  const filteredConversations = conversations.filter(conv =>
    conv.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full h-[80vh] overflow-hidden flex">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Beskeder</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Søg beskeder..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="p-8 text-center">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Indlæser beskeder...</p>
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="p-8 text-center">
                <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen beskeder</h3>
                <p className="text-gray-600">Start en samtale ved at kontakte andre brugere.</p>
              </div>
            ) : (
              filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => {
                  setSelectedConversation(conversation.id);
                  markAsRead(conversation.id);
                }}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
                  selectedConversation === conversation.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={conversation.user.avatar}
                      alt={conversation.user.name}
                      className="w-12 h-12 rounded-full"
                    />
                    {conversation.user.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 truncate">{conversation.user.name}</h3>
                      <span className="text-xs text-gray-500">{conversation.lastMessage.timestamp}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 truncate">{conversation.lastMessage.content}</p>
                      {conversation.unreadCount > 0 && (
                        <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                    {!conversation.user.online && conversation.user.lastSeen && (
                      <p className="text-xs text-gray-500">Sidst set {conversation.user.lastSeen}</p>
                    )}
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('Slet denne samtale?')) {
                        handleDeleteConversation(conversation.id);
                      }
                    }}
                    className="p-1 hover:bg-gray-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <Trash2 className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConv ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={selectedConv.user.avatar}
                        alt={selectedConv.user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      {selectedConv.user.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedConv.user.name}</h3>
                      <p className="text-sm text-gray-600">
                        {selectedConv.user.online ? 'Online nu' : `Sidst set ${selectedConv.user.lastSeen}`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleStartCall(selectedConv.user.id, selectedConv.user.name)}
                      disabled={isCallActive}
                      className="p-2 hover:bg-gray-200 rounded-full disabled:opacity-50 transition-all duration-200 hover:scale-110"
                      title="Ring op"
                    >
                      <Phone className="w-5 h-5 text-gray-600" />
                    </button>
                    <button 
                      className="p-2 hover:bg-gray-200 rounded-full transition-all duration-200 hover:scale-110"
                      title="Video opkald"
                    >
                      <Video className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
                
                {/* Active Call Indicator */}
                {isCallActive && (
                  <div className="bg-green-100 border-t border-green-200 p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-800 font-medium">Opkald aktiv</span>
                        <span className="text-green-600">{formatCallDuration(callDuration)}</span>
                      </div>
                      <button
                        onClick={handleEndCall}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors duration-200"
                      >
                        Afslut
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[50vh] lg:max-h-[60vh]">
                {selectedConv.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === currentUser?.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="group relative max-w-xs lg:max-w-md">
                      <div
                        className={`px-4 py-2 rounded-lg ${
                          message.senderId === currentUser?.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs opacity-75">{message.timestamp}</span>
                          {message.senderId === currentUser?.id && (
                            <div className="ml-2">
                              {message.read ? (
                                <CheckCheck className="w-3 h-3 text-blue-200" />
                              ) : (
                                <Check className="w-3 h-3 text-blue-200" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {message.senderId === currentUser?.id && (
                        <button
                          onClick={() => setShowDeleteConfirm(message.id)}
                          className="absolute -right-8 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        >
                          <Trash2 className="w-3 h-3 text-gray-500" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Paperclip className="w-5 h-5 text-gray-600" />
                  </button>
                  
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Skriv en besked..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Smile className="w-5 h-5 text-gray-600" />
                  </button>
                  
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Vælg en samtale</h3>
                <p className="text-gray-600">Klik på en samtale for at begynde at chatte</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Slet besked</h3>
            <p className="text-gray-600 mb-6">Er du sikker på at du vil slette denne besked? Dette kan ikke fortrydes.</p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Annuller
              </button>
              <button
                onClick={() => handleDeleteMessage(showDeleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Slet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}