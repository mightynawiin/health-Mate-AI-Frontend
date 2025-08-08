import React from 'react';
import { Brain, Pill, TrendingUp, MessageCircle, Github, Mail, Shield,Mic} from 'lucide-react';




interface HomePageProps {
  onStartChat: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartChat }) => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">HealthMate</h1>
            </div>
            <button
              onClick={onStartChat}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Start Chat</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            HealthMate
          </h2>

<p className="text-2xl text-gray-700 font-semibold mb-6 max-w-3xl mx-auto text-center">
  A Voice Agent for Medical Awareness and Decision Support
</p>
<p className="text-lg text-gray-600 font-medium mb-8 max-w-3xl mx-auto text-center">
  Empowering patients with trustworthy medical knowledge through voice interaction.<br />
  Get instant answers about symptoms, medical terms, and when to seek professional help.
</p>
         <div className="flex items-center justify-center mt-5">
          <button
            onClick={onStartChat}
            className="bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition-transform duration-200 transform hover:scale-105 text-lg font-semibold shadow-lg flex items-center text-center justify-center gap-2"
          >
            <Mic className="w-5 h-5" />
            <span>Start Voice Conversation</span>
          </button>
        </div>

        </div>

        {/* Features Section */}
        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Reasoning Engine</h3>
            <p className="text-gray-600">Simulates expert diagnostic logic with step-by-step clinical reasoning</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Pill className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Medical Accuracy</h3>
            <p className="text-gray-600">Built on clinical training data and evidence-based medicine</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Answers</h3>
            <p className="text-gray-600">Get clinical insights and diagnostic support in seconds</p>
          </div>
        </div>

       {/* Additional Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Trusted by Healthcare Professionals
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              HealthMate provides evidence-based clinical decision support, helping healthcare providers 
              make informed decisions through AI-powered diagnostic reasoning and treatment recommendations.
            </p>
          </div>
        </div>

        {/* How HealthMate Works */}
        <div className="bg-gray-50 rounded-xl p-8 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">How HealthMate Works</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Advanced AI technology delivers instant, trustworthy health guidance through voice interaction
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <div className="bg-cyan-500 text-white text-xs px-2 py-1 rounded-full inline-block mb-2">01</div>
              <h4 className="font-semibold text-gray-900 mb-2">Speak Your Query</h4>
              <div className="text-cyan-600 text-sm font-medium mb-2">Voice Recognition</div>
              <p className="text-gray-600 text-sm">
                User speaks a health-related question through microphone in browser or app
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="bg-cyan-500 text-white text-xs px-2 py-1 rounded-full inline-block mb-2">02</div>
              <h4 className="font-semibold text-gray-900 mb-2">Ultra-Fast Processing</h4>
              <div className="text-cyan-600 text-sm font-medium mb-2">AI Speech-to-Text</div>
              <p className="text-gray-600 text-sm">
                AssemblyAI converts speech to text with ~300ms latency for instant understanding
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div className="bg-green-600 text-white text-xs px-2 py-1 rounded-full inline-block mb-2">03</div>
              <h4 className="font-semibold text-gray-900 mb-2">Intelligent Analysis</h4>
              <div className="text-green-600 text-sm font-medium mb-2">RAG + LLM + VectorDB</div>
              <p className="text-gray-600 text-sm">
                NLP Engine with RAG interprets intent and retrieves relevant medical information
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full inline-block mb-2">04</div>
              <h4 className="font-semibold text-gray-900 mb-2">Safe Response</h4>
              <div className="text-red-500 text-sm font-medium mb-2">Ethical AI</div>
              <p className="text-gray-600 text-sm">
                Voice agent replies with reliable, safe information - never providing diagnosis
              </p>
            </div>
          </div>

          <div className="text-center">
            <h4 className="text-xl font-semibold text-gray-900 mb-6">Powered by Advanced Technology</h4>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">AssemblyAI</span>
              <span className="bg-green-100  text-green-800 px-4 py-2 rounded-full text-sm font-medium">LiveKIT</span>
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">Real-time Speech Processing</span>
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">RAG (Retrieval-Augmented Generation)</span>
              <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">Medical Knowledge Base</span>
              <span className="bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium">Ethical AI Safeguards</span>
            </div>
          </div>
        </div>

        {/* Ethical Safeguards */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Ethical Safeguards</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              HealthMate operates with the highest ethical standards to ensure user safety and responsible AI use
            </p>
          </div>

          <div className="space-y-6 mb-8">
            <div className="flex items-start space-x-4 p-6 bg-red-50 rounded-xl">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-semibold text-gray-900">No Diagnosis or Prescriptions</h4>
                  <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">Critical</span>
                </div>
                <p className="text-gray-600">
                  HealthMate never provides medical diagnoses or prescribes medications. All guidance is educational only.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-yellow-50 rounded-xl">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-semibold text-gray-900">Always Recommends Professional Help</h4>
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">Essential</span>
                </div>
                <p className="text-gray-600">
                  For complex or risky symptoms, HealthMate always directs users to seek professional medical care.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-blue-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Pill className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-semibold text-gray-900">Trusted Sources Only</h4>
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">Verified</span>
                </div>
                <p className="text-gray-600">
                  All information comes from reliable public health sources like WHO, MedlinePlus, and medical institutions.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-green-50 rounded-xl">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-semibold text-gray-900">Red Flag Escalation</h4>
                  <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded-full">Emergency</span>
                </div>
                <p className="text-gray-600">
                  Serious symptoms like chest pain or breathing difficulties are immediately escalated to emergency care.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Shield className="w-3 h-3 text-white" />
              </div>
              <span className="text-green-700 font-medium">Important Disclaimer</span>
            </div>
            <p className="text-gray-700">
              HealthMate is an educational tool and does not replace professional medical advice, diagnosis, or treatment. Always 
              consult with qualified healthcare professionals for medical concerns. In case of emergency, contact emergency 
              services immediately.
            </p>
          </div>
        </div>

        {/* Impact Potential */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 mb-16">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Impact Potential</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              HealthMate has the potential to transform healthcare accessibility and health literacy worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <span className="text-blue-600 text-sm font-medium">Global Reach</span>
                  <h4 className="text-xl font-semibold text-gray-900">Millions of Patients</h4>
                </div>
              </div>
              <p className="text-gray-600">
                Helps patients worldwide with no medical background understand health information
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <span className="text-green-600 text-sm font-medium">Trusted Info</span>
                  <h4 className="text-xl font-semibold text-gray-900">Prevents Misinformation</h4>
                </div>
              </div>
              <p className="text-gray-600">
                Reduces self-medication and misinformed health decisions through reliable guidance
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <span className="text-purple-600 text-sm font-medium">Local Languages</span>
                  <h4 className="text-xl font-semibold text-gray-900">Rural & Underserved Areas</h4>
                </div>
              </div>
              <p className="text-gray-600">
                Scales in vernacular languages for voice-first deployment in remote locations
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Pill className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <span className="text-red-600 text-sm font-medium">Professional Aid</span>
                  <h4 className="text-xl font-semibold text-gray-900">Healthcare Worker Support</h4>
                </div>
              </div>
              <p className="text-gray-600">
                Assists rural health workers as a reliable knowledge companion
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-cyan-600 mb-2">3.6B</div>
              <div className="text-gray-600">People lack healthcare access</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-600 mb-2">90%</div>
              <div className="text-gray-600">Medical misinformation online</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-600 mb-2">50%</div>
              <div className="text-gray-600">Rural areas underserved</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-600 mb-2">24/7</div>
              <div className="text-gray-600">Always available support</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-900 font-semibold">HealthMate</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-1">
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-1">
                <Mail className="w-4 h-4" />
                <span>Contact</span>
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-1">
                <Shield className="w-4 h-4" />
                <span>Privacy</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;