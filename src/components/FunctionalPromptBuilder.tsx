import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePrompt } from '../hooks/usePrompt';
import { promptOptions, rolesByTheme } from '../constants/promptOptions';
import EditablePromptViewer from './EditablePromptViewer';

/**
 * Componente funcional del constructor de prompts
 */
const FunctionalPromptBuilder = () => {
  const { 
    config, 
    error, 
    updateConfig, 
  resetConfig, 
    resetToGenerated,
    isEditing,
    getCurrentPrompt,
    optimizeObjective,
    revertObjectiveOptimization,
    isObjectiveOptimized
  } = usePrompt();

  const [showStats, setShowStats] = useState(false);
  const [copied, setCopied] = useState(false);

  // Función para copiar al portapapeles
  const copyToClipboard = async () => {
    const currentPrompt = getCurrentPrompt();
    if (!currentPrompt) return;
    
    try {
      await navigator.clipboard.writeText(currentPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error copying to clipboard:', err);
    }
  };

  // Función para exportar como JSON
  const exportAsJSON = () => {
    const currentPrompt = getCurrentPrompt();
    const exportData = {
      prompt: currentPrompt,
      configuration: config,
      timestamp: new Date().toISOString(),
      app: 'Prompt Architect v1.0'
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

  // Función para exportar como Markdown
  const exportAsMarkdown = () => {
    const currentPrompt = getCurrentPrompt();
    const markdownContent = `# Prompt Architect Export

## Configuración

- **Tema**: ${config.theme || 'No especificado'}
- **Objetivo**: ${config.objective || 'No especificado'}
- **Tono**: ${config.tone}
- **Formato**: ${config.format}
- **Nivel de detalle**: ${config.detailLevel}/4
- **Idioma**: ${config.language}

${config.additionalInstructions ? `## Instrucciones Adicionales\n\n${config.additionalInstructions}\n` : ''}

## Prompt Generado

\`\`\`
${currentPrompt}
\`\`\`

---
*Generado con Prompt Architect el ${new Date().toLocaleDateString()}*
`;

    const dataBlob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `prompt-architect-${Date.now()}.md`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  // Estadísticas del prompt
  const currentPrompt = getCurrentPrompt() || '';
  const stats = {
    characters: currentPrompt.length,
    words: currentPrompt.split(' ').filter(word => word.length > 0).length,
    lines: currentPrompt.split('\n').filter(line => line.trim().length > 0).length,
    sections: currentPrompt.split('\n\n').filter(section => section.trim().length > 0).length
  };

  // Información del motor seleccionado
  const selectedEngine = promptOptions.aiEngines.find(engine => engine.id === config.aiEngine);

  // Determinar si hay contenido para exportar
  const hasContent = getCurrentPrompt() && getCurrentPrompt().trim().length > 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

          <div className="space-y-6">
            {/* Tema del prompt */}
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Tema del Prompt
              </label>
              <select 
                value={config.theme}
                onChange={(e) => {
                  updateConfig('theme', e.target.value);
                  // Resetear el rol cuando se cambia el tema
                  updateConfig('role', '');
                }}
                className="w-full px-4 py-3 bg-dark-700/50 border border-dark-600 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Selecciona una categoría temática</option>
                {promptOptions.themes.map((theme) => (
                  <option key={theme} value={theme}>{theme}</option>
                ))}
              </select>
            </div>

            {/* Rol profesional - Solo se muestra si hay un tema seleccionado */}
            {config.theme && rolesByTheme[config.theme] && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-sm font-medium text-dark-300 mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Rol Profesional
                </label>
                <select 
                  value={config.role}
                  onChange={(e) => updateConfig('role', e.target.value)}
                  className="w-full px-4 py-3 bg-dark-700/50 border border-dark-600 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Selecciona un rol profesional</option>
                  {rolesByTheme[config.theme].map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </motion.div>
            )}

            {/* Objetivo específico */}
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Objetivo Específico
                {isObjectiveOptimized && (
                  <span className="ml-2 text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                    Texto optimizado
                  </span>
                )}
              </label>
              <div className="relative">
                <textarea 
                  value={config.objective}
                  onChange={(e) => updateConfig('objective', e.target.value)}
                  className="w-full px-4 py-3 bg-dark-700/50 border border-dark-600 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  rows={3}
                  placeholder="Escribe tu objetivo en lenguaje natural..."
                />
                {config.objective.trim() && (
                  <div className="flex gap-2 mt-3">
                    {!isObjectiveOptimized ? (
                      <motion.button
                        onClick={optimizeObjective}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Optimizar texto
                      </motion.button>
                    ) : (
                      <motion.button
                        onClick={revertObjectiveOptimization}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-lg transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h11M9 21V3m0 0l-4 4m4-4l4 4" />
                        </svg>
                        Deshacer optimización
                      </motion.button>
                    )}
                  </div>
                )}
              </div>
              <p className="mt-2 text-xs text-dark-400">
                Escribe tu idea en lenguaje natural. Usa el botón "Optimizar texto" para mejorar la claridad y legibilidad.
              </p>
            </div>

            {/* Tono y Formato */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v3M7 4H5a1 1 0 00-1 1v16a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1h-2m-8 0V2" />
                  </svg>
                  Tono
                </label>
                <select 
                  value={config.tone}
                  onChange={(e) => updateConfig('tone', e.target.value)}
                  className="w-full px-4 py-3 bg-dark-700/50 border border-dark-600 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  {promptOptions.tones.map((tone) => (
                    <option key={tone} value={tone}>{tone}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  Formato
                </label>
                <select 
                  value={config.format}
                  onChange={(e) => updateConfig('format', e.target.value)}
                  className="w-full px-4 py-3 bg-dark-700/50 border border-dark-600 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  {promptOptions.formats.map((format) => (
                    <option key={format} value={format}>{format}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Nivel de detalle */}
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-3 flex items-center">
                <svg className="w-4 h-4 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Nivel de Detalle ({config.detailLevel}/4)
              </label>
              <div className="space-y-3">
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={config.detailLevel}
                  onChange={(e) => updateConfig('detailLevel', parseInt(e.target.value))}
                  className="w-full h-2 bg-dark-600 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-dark-400">
                  {['Breve', 'Moderado', 'Detallado', 'Extenso'].map((label, index) => (
                    <span 
                      key={label}
                      className={`${
                        index + 1 === config.detailLevel 
                          ? 'text-blue-400 font-semibold' 
                          : 'text-dark-400'
                      } transition-colors duration-200`}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Idioma */}
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                Idioma
              </label>
              <select 
                value={config.language}
                onChange={(e) => updateConfig('language', e.target.value)}
                className="w-full px-4 py-3 bg-dark-700/50 border border-dark-600 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                {promptOptions.languages.map((language) => (
                  <option key={language} value={language}>{language}</option>
                ))}
              </select>
            </div>

            {/* Instrucciones adicionales */}
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Instrucciones Adicionales
              </label>
              <textarea 
                value={config.additionalInstructions}
                onChange={(e) => updateConfig('additionalInstructions', e.target.value)}
                className="w-full px-4 py-3 bg-dark-700/50 border border-dark-600 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                rows={3}
                placeholder="Añade cualquier contexto adicional o restricciones específicas..."
              />
            </div>

            {/* Botón de regenerar (solo visible si el usuario ha editado manualmente) */}
            {isEditing && (
              <div className="pt-4 border-t border-dark-600/30">
                <motion.button
                  onClick={resetToGenerated}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.581M20 20v-5h-.581M4 9a8 8 0 1116 0" />
                  </svg>
                  <span>Restaurar versión automática</span>
                </motion.button>
              </div>
            )}
          </div>
        </div>

        {/* Información sobre optimización automática */}
        <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-green-700/30">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-green-500/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-green-300 mb-2">
              ✨ Vista previa automática
            </h3>
            <p className="text-sm text-green-400/80 leading-relaxed">
              La vista previa se actualiza automáticamente y combina tu <strong>Objetivo específico</strong> con las opciones seleccionadas (tema, tono, formato, nivel, idioma).
              <span className="block mt-1 font-medium text-green-300">
                Ajusta cualquier campo y la vista previa reflejará los cambios en tiempo real.
              </span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Panel de vista previa editable */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="lg:sticky lg:top-6 h-fit"
      >
        <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl border border-dark-700/50 overflow-hidden">
          {/* Header con controles de export */}
          <div className="p-6 border-b border-dark-700/50 space-y-4">
            {/* Título */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-dark-100 flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Editor de Prompt
              </h2>
            </div>

            {/* Selector de Motor de IA y Botones de Acción */}
            <div className="flex items-center justify-between gap-4">
              {/* Selector de Motor de IA */}
              <div className="flex-1 max-w-md">
                <select 
                  value={config.aiEngine}
                  onChange={(e) => updateConfig('aiEngine', e.target.value)}
                  className="w-full px-4 py-2.5 bg-dark-700/50 border border-dark-600 rounded-lg text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                >
                  {promptOptions.aiEngines.map((engine) => (
                    <option key={engine.id} value={engine.id}>
                      {engine.name} - {engine.description}
                    </option>
                  ))}
                </select>
              </div>
              
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

                {/* Botón de exportar JSON */}
                <motion.button
                  onClick={exportAsJSON}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!hasContent}
                  className="p-2 bg-dark-700 hover:bg-dark-600 text-dark-300 hover:text-dark-100 rounded-lg transition-all duration-200 border border-dark-600 hover:border-dark-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Exportar como JSON"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                </motion.button>

                {/* Botón de exportar Markdown */}
                <motion.button
                  onClick={exportAsMarkdown}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!hasContent}
                  className="p-2 bg-dark-700 hover:bg-dark-600 text-dark-300 hover:text-dark-100 rounded-lg transition-all duration-200 border border-dark-600 hover:border-dark-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Exportar como Markdown"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </motion.button>

                {/* Botón de copiar */}
                <motion.button
                  onClick={copyToClipboard}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!hasContent}
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {copied ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                  <span className="text-sm font-medium">
                    {copied ? 'Copiado!' : 'Copiar'}
                  </span>
                </motion.button>

                {/* Botón de abrir chat IA */}
                <motion.button
                  onClick={() => {
                    const selectedEngine = promptOptions.aiEngines.find(e => e.id === config.aiEngine);
                    if (selectedEngine?.url) {
                      window.open(selectedEngine.url, '_blank');
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-lg transition-all duration-200"
                  title={`Abrir ${promptOptions.aiEngines.find(e => e.id === config.aiEngine)?.name}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span className="text-sm font-medium">Abrir Chat</span>
                </motion.button>
              </div>
            </div>

            {/* Estadísticas */}
            {showStats && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 space-y-4"
              >
                {/* Estadísticas numéricas */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-dark-700/30 rounded-lg">
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
                </div>
                
                {/* Información del motor */}
                {selectedEngine && (
                  <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                    <div className="flex items-center text-sm">
                      <svg className="w-4 h-4 mr-2 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-cyan-300 font-medium">{selectedEngine.name}</span>
                    </div>
                    <p className="text-xs text-cyan-400/80 mt-1 ml-6">{selectedEngine.description}</p>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Componente editor editable */}
          <div className="p-6">
            <EditablePromptViewer />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FunctionalPromptBuilder;