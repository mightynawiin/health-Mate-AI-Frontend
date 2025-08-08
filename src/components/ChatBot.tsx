import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle, Send, ArrowLeft, Brain, BookOpen, Lightbulb, Mic, Square, Play, Pause
} from 'lucide-react';

interface ChatBotProps {
  onBack: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  reasoning?: string;
  isThinking?: boolean;
}

const API_BASE = "https://healthmate-ai-voice-agent-backend.onrender.com";

const ChatBot: React.FC<ChatBotProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessingAudio, setIsProcessingAudio] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // Welcome message on load
    const welcomeMessage: Message = {
      id: 'welcome',
      type: 'bot',
      content: "Welcome to HealthMate! Click the microphone to ask me any clinical question. I'll think through it step-by-step like a real doctor.",
      reasoning: ''
    };
    setMessages([welcomeMessage]);
    speakText(welcomeMessage.content);
  }, []);

const suggestedPrompts = [
  "What are the signs of high blood pressure?",
  "How to reduce stress and strain?",
  "What to do if I have a fever?",
  "Home remedies for cough?",
  "Why does body ache during flu?",
  "How to stay safe in summer heat?",
  "What to eat when feeling weak?",
  "Tips to sleep better at night?",
  "How to prevent cold and cough?",
  "What to know before dialysis?"
];


  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(scrollToBottom, [messages]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
      };
      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };
      speechSynthesisRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  const pauseSpeech = () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resumeSpeech = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  // Audio recording and transcription
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e: BlobEvent) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await processAudio(audioBlob, "message.webm");
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch {
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsProcessingAudio(true);
    }
  };

  const processAudio = async (audioBlob: Blob, filename: string) => {
    try {
      setIsProcessingAudio(true);
      const formData = new FormData();
      formData.append("audio", audioBlob, filename);

      const resp = await fetch(`${API_BASE}/transcribe`, {
        method: 'POST',
        body: formData,
      });

      if (!resp.ok) throw new Error("Transcription failed.");

      const data = await resp.json();
      const transcriptText: string = data.text;
      setInput(transcriptText);

      if (transcriptText && !transcriptText.toLowerCase().includes("transcription failed")) {
        await handleSendMessage(transcriptText);
      } else {
        alert("Could not transcribe audio. Try again.");
      }
    } catch {
      alert("Error processing audio. Please try again.");
    } finally {
      setIsProcessingAudio(false);
    }
  };

  // Handle message sending (typed or transcribed)
  const handleSendMessage = async (msg: string) => {
    if (!msg.trim()) return;

    setMessages(prev => [
      ...prev,
      { id: Date.now().toString(), type: 'user', content: msg },
    ]);
    setInput('');
    setIsLoading(true);

    const thinkingMsg: Message = {
      id: `think-${Date.now()}`,
      type: 'bot',
      content: '',
      isThinking: true,
    };
    setMessages(prev => [...prev, thinkingMsg]);

    try {
      const resp = await fetch(`${API_BASE}/api/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: msg, n_results: 3 }),
      });

      if (!resp.ok) throw new Error("Bot error");

      const data = await resp.json();

      // Remove markdown code fences (e.g., ``````)
      const cleanedThinking = data.thinking.replace(/``````/g, '').trim();
      const cleanedAnswer = data.answer.replace(/```(?:html)?/g, '').trim();

      setMessages(prev =>
        prev.filter(m => !m.isThinking).concat({
          id: Date.now().toString(),
          type: 'bot',
          content: cleanedAnswer,
          reasoning: cleanedThinking,
        })
      );

      speakText(`Clinical reasoning: ${cleanedThinking}. Final answer: ${cleanedAnswer}`);
    } catch {
      setMessages(prev =>
        prev.filter(m => !m.isThinking).concat({
          id: Date.now().toString(),
          type: 'bot',
          content: "Sorry, something went wrong contacting the backend.",
          reasoning: undefined,
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => handleSendMessage(input);
  const handlePromptClick = async (prompt: string) => await handleSendMessage(prompt);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">HealthMate</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Chat Container */}
      <div className="flex-1 flex flex-col bg-gray-50">
        <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
          {/* Voice Banner - show at very start of conversation */}
          {messages.length === 1 && messages[0].id === 'welcome' && (
            <div className="mb-4 mt-5 flex flex-col items-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-1 ">
                Try Voice Interaction
              </h1>
              <div className="text-gray-600 text-lg text-center">
                Experience ultra-fast voice understanding with real-time medical guidance
              </div>
            </div>
          )}


          <div className="bg-white border-b border-gray-200 p-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Suggested Prompts:</h4>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handlePromptClick(prompt)}
                  className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm hover:bg-blue-100"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'user' ? (
                  <div className="bg-blue-600 text-white p-4 rounded-lg max-w-md flex items-center space-x-2">
                    <MessageCircle className="w-5 h-5 text-white" />
                    <span>{message.content}</span>
                  </div>
                ) : (
                  <div className="max-w-2xl space-y-3">
                    {message.isThinking ? (
                      <div className="flex items-center space-x-2 text-gray-600">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        <span className="flex items-center">
                          <Brain className="w-5 h-5 text-blue-600 mr-1" />
                          Thinking...
                        </span>
                      </div>
                    ) : (
                      <>
                        {message.reasoning && (
                          <div
                            className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg"
                            style={{
                              borderLeftWidth: 6,
                              borderLeftColor: '#facc15', // Tailwind yellow-400
                              borderLeftStyle: 'solid',
                            }}
                          >
                            <div className="flex items-center space-x-2 mb-2">
                              <BookOpen className="w-4 h-4 text-yellow-600" />
                              <span className="font-medium text-yellow-800">Clinical Reasoning:</span>
                            </div>
                            <div
                              className="text-yellow-700"
                              dangerouslySetInnerHTML={{ __html: message.reasoning || '' }}
                            />
                          </div>
                        )}

                        {message.content && (
                          <div
                            className="border border-gray-200 p-4 rounded-lg shadow-sm"
                            style={{
                              borderLeftWidth: 6,
                              borderLeftColor: '#2563EB', // strong blue
                              backgroundColor: '#EFF6FF', // light blue
                              borderLeftStyle: 'solid',
                            }}
                          >
                            <div className="flex items-center space-x-2 mb-2">
                              <Lightbulb className="w-4 h-4 text-blue-600" />
                              <span className="font-medium text-gray-800">Final Answer:</span>
                            </div>
                            <div
                              className="text-gray-700"
                              dangerouslySetInnerHTML={{ __html: message.content || '' }}
                            />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Voice Input Area */}
          <div className="bg-white border-t border-gray-200 p-6">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col items-center">
                {/* "AI is Speaking..." label above speech controls */}
                {isSpeaking && (
                  <div className=" text-blue-600 font-medium flex items-center justify-center mb-5">
                    <Brain className="w-4 h-4 mr-1" />
                    AI is Speaking...
                  </div>
                )}

                {/* Speech Controls above mic */}
                {isSpeaking && (
                  <div className="flex items-center space-x-2 mb-2">
                    {isPaused ? (
                      <button
                        onClick={resumeSpeech}
                        className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
                        title="Resume Speech"
                      >
                        <Play className="w-5 h-5" />
                      </button>
                    ) : (
                      <button
                        onClick={pauseSpeech}
                        className="p-2 bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200"
                        title="Pause Speech"
                      >
                        <Pause className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={stopSpeech}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                      title="Stop Speech"
                    >
                      <Square className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {/* Microphone / Stop recording button */}
                <div className="flex items-center justify-center">
                  {!isRecording && !isProcessingAudio ? (
                    <button
                      onClick={startRecording}
                      className="w-16 h-16 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center"
                      title="Start Recording"
                    >
                      <Mic className="w-8 h-8" />
                    </button>
                  ) : isRecording ? (
                    <button
                      onClick={stopRecording}
                      className="w-16 h-16 bg-red-600 text-white rounded-full hover:bg-red-700 animate-pulse shadow-lg flex items-center justify-center"
                      title="Stop Recording"
                    >
                      <Square className="w-8 h-8" />
                    </button>
                  ) : (
                    <div className="w-16 h-16 bg-yellow-600 text-white rounded-full shadow-lg flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Status Text with icons */}
              <div className="text-center">
                {isRecording && (
                  <span className="text-red-600 font-medium flex items-center justify-center">
                    <Mic className="w-5 h-5 mr-1" /> Recording... Click to stop
                  </span>
                )}
                {isProcessingAudio && (
                  <span className="text-yellow-600 font-medium flex items-center justify-center">
                    <Square className="w-5 h-5 mr-1" /> Processing audio...
                  </span>
                )}
                {!isRecording && !isProcessingAudio && (
                  <span className="text-gray-600 flex items-center justify-center">
                    <Mic className="w-5 h-5 mr-1" /> Click the microphone to start a conversation with HealthMate
                  </span>
                )}
              </div>

              {/* Text Input and Send Button */}
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Or type your clinical question..."
                  className="flex-1 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                  disabled={isLoading || isRecording || isProcessingAudio}
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim() || isRecording || isProcessingAudio}
                  className="px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ChatBot;
