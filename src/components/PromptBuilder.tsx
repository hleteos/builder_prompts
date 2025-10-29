import { motion } from 'framer-motion';
import { usePrompt } from '../hooks/usePrompt';
import PromptInput from './PromptInput';
import PromptPreview from './PromptPreview';
import AIHelper from './AIHelper';
import { promptOptions } from '../constants/promptOptions';

/**
 * Componente principal para construir prompts
 * Contiene el grid responsivo con inputs y preview
 */
const PromptBuilder = () => {
  const { resetConfig, error } = usePrompt();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
      {/* Panel de configuración */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-6"
      >
        <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-dark-700/50">
          {/* Header del panel */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-dark-100 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
              Configuración del Prompt
            </h2>
            
            <motion.button
              onClick={resetConfig}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 text-xs bg-dark-700 hover:bg-dark-600 text-dark-300 hover:text-dark-100 rounded-lg transition-all duration-200 border border-dark-600 hover:border-dark-500"
            >
              Limpiar
            </motion.button>
          </div>

          {/* Mostrar error si existe */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-900/20 border border-red-700/50 rounded-lg text-red-300 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Inputs de configuración */}
          <div className="space-y-4">
            <PromptInput
              label="Tema del Prompt"
              field="theme"
              type="select"
              options={promptOptions.themes}
              placeholder="Selecciona una categoría temática"
            />

            <PromptInput
              label="Objetivo Específico"
              field="objective"
              type="textarea"
              placeholder="Describe qué quieres lograr con este prompt..."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <PromptInput
                label="Tono"
                field="tone"
                type="select"
                options={promptOptions.tones}
              />

              <PromptInput
                label="Formato de Salida"
                field="format"
                type="select"
                options={promptOptions.formats}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <PromptInput
                label="Nivel de Detalle"
                field="detailLevel"
                type="range"
              />

              <PromptInput
                label="Idioma"
                field="language"
                type="select"
                options={promptOptions.languages}
              />
            </div>

            <PromptInput
              label="Instrucciones Adicionales"
              field="additionalInstructions"
              type="textarea"
              placeholder="Añade cualquier contexto adicional o restricciones específicas..."
            />
          </div>
        </div>

        {/* Componente AI Helper */}
        <AIHelper />
      </motion.div>

      {/* Panel de preview */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="lg:sticky lg:top-6 h-fit"
      >
        <PromptPreview />
      </motion.div>
    </div>
  );
};

export default PromptBuilder;