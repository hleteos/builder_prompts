import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrompt } from '../hooks/usePrompt';

/**
 * Componente que muestra la vista previa del prompt generado
 * Incluye funcionalidades de copia y exportación
 */
const PromptPreview = () => {
  const { generatedPrompt, config } = usePrompt();
  const [copied, setCopied] = useState(false);
  const [showStats, setShowStats] = useState(false);

  // Función para copiar al portapapeles
  const copyToClipboard = async () => {
    if (!generatedPrompt) return;
    
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error copying to clipboard:', err);
    }
  };

  // Función para exportar como JSON
  const exportAsJSON = () => {
    const exportData = {
      prompt: generatedPrompt,
      configuration: config,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `prompt-architect-${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  // Estadísticas del prompt
  const stats = {
    characters: generatedPrompt.length,
    words: generatedPrompt.split(' ').filter(word => word.length > 0).length,
    lines: generatedPrompt.split('\n').filter(line => line.trim().length > 0).length,
    sections: generatedPrompt.split('\n\n').filter(section => section.trim().length > 0).length
  };

  const isEmpty = !generatedPrompt || generatedPrompt.trim().length === 0;

  return (
    <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl border border-dark-700/50 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-dark-700/50">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-dark-100 flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Vista Previa
          </h2>

          <div className="flex items-center space-x-2">
            {/* Botón de estadísticas */}
            <motion.button
              onClick={() => setShowStats(!showStats)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-lg transition-all duration-200 border ${
                showStats 
                  ? 'bg-blue-500/20 border-blue-500/50 text-blue-400' 
                  : 'bg-dark-700 border-dark-600 text-dark-300 hover:text-dark-100 hover:border-dark-500'
              }`}
              title="Mostrar estadísticas"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </motion.button>

            {/* Botón de exportar */}
            <motion.button
              onClick={exportAsJSON}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isEmpty}
              className="p-2 bg-dark-700 hover:bg-dark-600 text-dark-300 hover:text-dark-100 rounded-lg transition-all duration-200 border border-dark-600 hover:border-dark-500 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Exportar como JSON"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
            </motion.button>

            {/* Botón de copiar */}
            <motion.button
              onClick={copyToClipboard}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isEmpty}
              className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.svg
                    key="check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="copy"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </motion.svg>
                )}
              </AnimatePresence>
              <span className="text-sm font-medium">
                {copied ? 'Copiado!' : 'Copiar'}
              </span>
            </motion.button>
          </div>
        </div>

        {/* Estadísticas */}
        <AnimatePresence>
          {showStats && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-dark-700/30 rounded-lg"
            >
              <div className="text-center">
                <div className="text-xl font-bold text-blue-400">{stats.characters}</div>
                <div className="text-xs text-dark-400">Caracteres</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-400">{stats.words}</div>
                <div className="text-xs text-dark-400">Palabras</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-yellow-400">{stats.lines}</div>
                <div className="text-xs text-dark-400">Líneas</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-400">{stats.sections}</div>
                <div className="text-xs text-dark-400">Secciones</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Contenido del prompt */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {isEmpty ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-dark-700 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-dark-300 mb-2">
                Prompt en construcción
              </h3>
              <p className="text-sm text-dark-400 max-w-sm mx-auto">
                Completa los campos de configuración para ver la vista previa de tu prompt personalizado.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-dark-900/50 rounded-lg p-4 border border-dark-600/50">
                <pre className="text-sm text-dark-100 font-mono whitespace-pre-wrap leading-relaxed">
                  {generatedPrompt}
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PromptPreview;