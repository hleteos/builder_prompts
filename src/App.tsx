import { motion } from 'framer-motion';
import { PromptProvider } from './context/PromptContext';
import FunctionalPromptBuilder from './components/FunctionalPromptBuilder';

function App() {
  return (
    <PromptProvider>
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="border-b border-dark-700/50 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center space-x-3">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </motion.div>
              <div>
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-2xl font-bold text-dark-100"
                >
                  Prompt Architect
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-sm text-dark-400"
                >
                  Construye prompts avanzados para IA con precisión profesional
                </motion.p>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          <FunctionalPromptBuilder />
        </main>
      </div>
    </PromptProvider>
  );
}

export default App;
