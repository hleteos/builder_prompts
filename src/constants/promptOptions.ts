import type { PromptOptions } from '../types';

// Mapeo de roles por tema
export const rolesByTheme: Record<string, string[]> = {
  'Programación y desarrollo': [
    'Desarrollador Full Stack',
    'Arquitecto de Software',
    'DevOps Engineer',
    'Ingeniero de Machine Learning',
    'Especialista en Seguridad',
    'Developer Advocate',
    'Tech Lead',
    'QA Engineer'
  ],
  'Diseño y creatividad': [
    'Diseñador UX/UI',
    'Director de Arte',
    'Diseñador Gráfico',
    'Motion Designer',
    'Diseñador de Producto',
    'Brand Designer',
    'Ilustrador Digital',
    'Director Creativo'
  ],
  'Redacción y comunicación': [
    'Copywriter',
    'Content Strategist',
    'Editor de Contenidos',
    'Periodista',
    'Ghostwriter',
    'Guionista',
    'Content Manager',
    'Redactor Técnico'
  ],
  'Investigación y análisis': [
    'Analista de Datos',
    'Investigador Científico',
    'Data Scientist',
    'Analista de Negocios',
    'Investigador de Mercado',
    'Consultor Estratégico',
    'Analista Financiero',
    'Research Manager'
  ],
  'Marketing y ventas': [
    'Growth Hacker',
    'Marketing Manager',
    'Social Media Manager',
    'SEO Specialist',
    'Account Manager',
    'Director Comercial',
    'Email Marketing Specialist',
    'Performance Marketer'
  ],
  'Educación y formación': [
    'Instructor',
    'Diseñador Instruccional',
    'Tutor Online',
    'Coach Educativo',
    'Capacitador Corporativo',
    'Pedagogo Digital',
    'Creador de Cursos',
    'Mentor Profesional'
  ],
  'Ciencia y tecnología': [
    'Científico de Datos',
    'Investigador en IA',
    'Ingeniero de Investigación',
    'Bioinformático',
    'Físico Computacional',
    'Químico Analítico',
    'Ingeniero Biomédico',
    'Especialista en IoT'
  ],
  'Arte y cultura': [
    'Curador de Arte',
    'Crítico Cultural',
    'Historiador del Arte',
    'Productor Cultural',
    'Gestor de Museos',
    'Artista Multimedia',
    'Director de Galería',
    'Conservador de Patrimonio'
  ],
  'Negocios y estrategia': [
    'Consultor de Negocios',
    'Strategy Manager',
    'Product Manager',
    'Business Analyst',
    'Emprendedor',
    'CEO/Founder',
    'Innovation Manager',
    'Consultor de Transformación Digital'
  ],
  'Salud y bienestar': [
    'Nutricionista',
    'Entrenador Personal',
    'Coach de Salud',
    'Terapeuta',
    'Especialista en Wellness',
    'Médico Deportivo',
    'Psicólogo Clínico',
    'Consultor de Bienestar Corporativo'
  ]
};

// Opciones disponibles para cada campo
export const promptOptions: PromptOptions & { aiEngines: Array<{id: string, name: string, description: string, url: string, icon: string}> } = {
  themes: [
    'Programación y desarrollo',
    'Diseño y creatividad',
    'Redacción y comunicación',
    'Investigación y análisis',
    'Marketing y ventas',
    'Educación y formación',
    'Ciencia y tecnología',
    'Arte y cultura',
    'Negocios y estrategia',
    'Salud y bienestar'
  ],
  aiEngines: [
    { 
      id: 'groq', 
      name: 'Groq (Llama)', 
      description: 'Ultra rápido - Ideal para iteración',
      url: 'https://groq.com',
      icon: '⚡'
    },
    { 
      id: 'openai', 
      name: 'OpenAI GPT-4', 
      description: 'Más preciso - Mejor para tareas complejas',
      url: 'https://chat.openai.com',
      icon: '🤖'
    },
    { 
      id: 'claude', 
      name: 'Anthropic Claude', 
      description: 'Más reflexivo - Excelente para análisis',
      url: 'https://claude.ai',
      icon: '🧠'
    },
    { 
      id: 'gemini', 
      name: 'Google Gemini', 
      description: 'Multimodal - Integra texto e imágenes',
      url: 'https://gemini.google.com',
      icon: '✨'
    },
    { 
      id: 'huggingface', 
      name: 'Hugging Face', 
      description: 'Open Source - Modelos especializados',
      url: 'https://huggingface.co/chat',
      icon: '🤗'
    },
    { 
      id: 'cohere', 
      name: 'Cohere', 
      description: 'Empresarial - Optimizado para negocios',
      url: 'https://coral.cohere.com',
      icon: '💼'
    }
  ],
  tones: [
    'profesional',
    'creativo',
    'técnico',
    'amigable',
    'formal',
    'casual',
    'persuasivo',
    'educativo',
    'inspirador',
    'analítico'
  ],
  formats: [
    'párrafo',
    'lista con viñetas',
    'lista numerada',
    'diálogo',
    'código',
    'tabla',
    'esquema',
    'informe',
    'guión',
    'email'
  ],
  languages: [
    'español',
    'inglés',
    'francés',
    'portugués',
    'italiano',
    'alemán',
    'japonés',
    'coreano',
    'chino mandarín',
    'árabe'
  ]
};