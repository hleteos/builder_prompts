import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePrompt } from '../hooks/usePrompt';

interface EditablePromptViewerProps {
  className?: string;
}

/**
 * Componente de vista previa editable que permite al usuario
 * modificar directamente el prompt generado
 */
const EditablePromptViewer: React.FC<EditablePromptViewerProps> = ({ className = '' }) => {
  const { 
    isEditing,
    updateEditedPrompt,
    resetToGenerated,
    getCurrentPrompt
  } = usePrompt();

  const [isExpanded, setIsExpanded] = useState(false);
  const currentPrompt = getCurrentPrompt();

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateEditedPrompt(e.target.value);
  };

  const handleReset = () => {
    resetToGenerated();
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (!currentPrompt || currentPrompt.trim().length === 0) {
    return (
      <div className={`${className}`}>
        <div className="text-center py-12">
          <div className="w-12 h-12 mx-auto mb-4 bg-dark-700 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-dark-300 mb-2">
            Configurando prompt...
          </h3>
          <p className="text-sm text-dark-400 max-w-sm mx-auto">
            Selecciona un tema y escribe tu objetivo para comenzar.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Header con controles */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span className="text-sm font-medium text-dark-200">Prompt Editable</span>
          </div>
          
          {isEditing && (
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-amber-400 font-medium">Modificado</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {isEditing && (
            <motion.button
              onClick={handleReset}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all duration-200"
              title="Volver a la versión generada automáticamente"
            >
              <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Restaurar
            </motion.button>
          )}
          
          <motion.button
            onClick={toggleExpanded}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 bg-dark-700 hover:bg-dark-600 text-dark-300 hover:text-dark-100 rounded-lg transition-all duration-200"
            title={isExpanded ? "Vista compacta" : "Vista expandida"}
          >
            <svg 
              className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Editor de texto */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        key={currentPrompt} // Re-animar cuando cambie el prompt
        className="relative"
      >
        <textarea
          value={currentPrompt}
          onChange={handlePromptChange}
          className={`w-full p-4 bg-dark-900/50 border border-dark-600/50 rounded-lg text-dark-100 font-mono text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
            isExpanded ? 'min-h-[600px]' : 'min-h-[300px]'
          }`}
          placeholder="Tu prompt aparecerá aquí. Puedes editarlo libremente..."
          spellCheck={false}
        />
        
        {/* Overlay para indicar modo edición */}
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-200 ${
          isEditing ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute top-2 right-2">
            <div className="bg-amber-500/20 border border-amber-500/40 rounded-lg px-2 py-1">
              <div className="flex items-center space-x-1">
                <svg className="w-3 h-3 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span className="text-xs text-amber-300 font-medium">Editando</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Información de ayuda */}
      <div className="mt-3 text-xs text-dark-400 space-y-1">
        <div className="flex items-center">
          <svg className="w-3 h-3 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>💡 Tip: Modifica directamente el texto. Los cambios en la configuración {isEditing ? 'no' : ''} actualizarán automáticamente.</span>
        </div>
        {isEditing && (
          <div className="flex items-center">
            <svg className="w-3 h-3 mr-1 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span>⚠️ Modo edición: usa "Restaurar" para volver a la versión automática.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditablePromptViewer;