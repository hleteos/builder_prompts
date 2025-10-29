import { motion } from 'framer-motion';
import { usePrompt } from '../hooks/usePrompt';

/**
 * Componente para integración con API de IA (Groq)
 * Permite mejorar prompts automáticamente
 */
const AIHelper = () => {
  const { generatedPrompt, improveWithAI, isLoading, error } = usePrompt();

  const canImprove = generatedPrompt && generatedPrompt.trim().length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-purple-700/30"
    >
      {/* Header */}
      <div className="flex items-center mb-4">
        <motion.div 
          className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mr-3"
          animate={isLoading ? { rotate: 360 } : {}}
          transition={{ duration: 2, repeat: isLoading ? Infinity : 0, ease: "linear" }}
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </motion.div>
        <div>
          <h3 className="text-lg font-semibold text-purple-200">
            Asistente IA
          </h3>
          <p className="text-sm text-purple-300/70">
            Mejora tu prompt con inteligencia artificial
          </p>
        </div>
      </div>

      {/* Descripción de funcionalidad */}
      <div className="mb-6 p-4 bg-dark-800/30 rounded-lg border border-purple-700/20">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-sm text-dark-300 leading-relaxed">
            <p className="mb-2">
              El asistente IA analizará tu prompt actual y sugerirá mejoras para:
            </p>
            <ul className="space-y-1 text-xs text-dark-400">
              <li className="flex items-center">
                <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                Claridad y precisión de las instrucciones
              </li>
              <li className="flex items-center">
                <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                Estructura y organización del contenido
              </li>
              <li className="flex items-center">
                <span className="w-1 h-1 bg-green-400 rounded-full mr-2"></span>
                Optimización para mejores resultados
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Estado de la API */}
      <div className="mb-4 p-3 bg-yellow-900/20 border border-yellow-700/30 rounded-lg">
        <div className="flex items-center text-yellow-300 text-sm">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <span>
            Integración con API Groq pendiente de configuración
          </span>
        </div>
      </div>

      {/* Botón principal */}
      <motion.button
        onClick={improveWithAI}
        disabled={!canImprove || isLoading}
        whileHover={canImprove && !isLoading ? { scale: 1.02 } : {}}
        whileTap={canImprove && !isLoading ? { scale: 0.98 } : {}}
        className={`
          w-full px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300
          flex items-center justify-center space-x-2
          ${canImprove && !isLoading
            ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg hover:shadow-purple-500/25'
            : 'bg-dark-700 text-dark-400 cursor-not-allowed'
          }
        `}
      >
        {isLoading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
            />
            <span>Mejorando prompt...</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>✨ Mejorar con IA</span>
          </>
        )}
      </motion.button>

      {/* Mostrar error si existe */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-red-900/20 border border-red-700/50 rounded-lg text-red-300 text-sm"
        >
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        </motion.div>
      )}

      {/* Información adicional */}
      <div className="mt-4 text-xs text-dark-500 text-center">
        <p>
          Próximamente: Integración completa con APIs de IA para mejoras automáticas
        </p>
      </div>
    </motion.div>
  );
};

export default AIHelper;