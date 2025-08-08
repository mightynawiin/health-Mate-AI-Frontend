import React, { useState } from 'react';
import HomePage from './components/HomePage';
import ChatBot from './components/ChatBot';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'chat'>('home');

  const navigateToChat = () => {
    setCurrentView('chat');
  };

  const navigateToHome = () => {
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {currentView === 'home' && <HomePage onStartChat={navigateToChat} />}
      {currentView === 'chat' && <ChatBot onBack={navigateToHome} />}
    </div>
  );
} 

export default App;