import { motion } from 'framer-motion';
import { usePrompt } from '../hooks/usePrompt';
import type { PromptInputProps } from '../types';

/**
 * Componente de input dinámico para configurar prompts
 * Soporta text, select, textarea y range inputs
 */
const PromptInput: React.FC<PromptInputProps> = ({
  label,
  field,
  type,
  options = [],
  placeholder = ''
}) => {
  const { config, updateConfig } = usePrompt();
  const value = config[field];

  const handleChange = (newValue: string | number) => {
    updateConfig(field, newValue);
  };

  const baseInputClasses = `
    w-full px-4 py-3 bg-dark-700/50 border border-dark-600 rounded-lg
    text-dark-100 placeholder-dark-400 
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    transition-all duration-200 font-mono text-sm
    hover:border-dark-500 hover:bg-dark-700/70
  `;

  const labelClasses = `
    block text-sm font-medium text-dark-200 mb-2 
    flex items-center space-x-2
  `;

  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <motion.select
            value={value as string}
            onChange={(e) => handleChange(e.target.value)}
            className={baseInputClasses}
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <option value="" className="bg-dark-700 text-dark-300">
              {placeholder || `Selecciona ${label.toLowerCase()}`}
            </option>
            {options.map((option) => (
              <option key={option} value={option} className="bg-dark-700 text-dark-100">
                {option}
              </option>
            ))}
          </motion.select>
        );

      case 'textarea':
        return (
          <motion.textarea
            value={value as string}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={placeholder}
            rows={3}
            className={`${baseInputClasses} resize-none`}
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
        );

      case 'range': {
        const rangeValue = value as number;
        const detailLabels = ['Breve', 'Moderado', 'Detallado', 'Extenso'];
        
        return (
          <div className="space-y-3">
            <motion.input
              type="range"
              min={1}
              max={4}
              value={rangeValue}
              onChange={(e) => handleChange(parseInt(e.target.value))}
              className="w-full h-2 bg-dark-600 rounded-lg appearance-none cursor-pointer slider"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
            <div className="flex justify-between text-xs text-dark-400">
              {detailLabels.map((label, index) => (
                <span 
                  key={label}
                  className={`${
                    index + 1 === rangeValue 
                      ? 'text-blue-400 font-semibold' 
                      : 'text-dark-400'
                  } transition-colors duration-200`}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        );
      }

      case 'text':
      default:
        return (
          <motion.input
            type="text"
            value={value as string}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={placeholder}
            className={baseInputClasses}
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
        );
    }
  };

  const getIcon = () => {
    switch (field) {
      case 'theme':
        return (
          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        );
      case 'objective':
        return (
          <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        );
      case 'tone':
        return (
          <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v3M7 4H5a1 1 0 00-1 1v16a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1h-2m-8 0V2" />
          </svg>
        );
      case 'format':
        return (
          <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        );
      case 'detailLevel':
        return (
          <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'language':
        return (
          <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-2"
    >
      <label className={labelClasses}>
        {getIcon()}
        <span>{label}</span>
        {type === 'range' && (
          <span className="text-blue-400 font-mono text-xs">
            ({(value as number) || 2}/4)
          </span>
        )}
      </label>
      {renderInput()}
    </motion.div>
  );
};

export default PromptInput;