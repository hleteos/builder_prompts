# 🚀 Prompt Builder Pro

**Constructor profesional de prompts optimizados para IA con vista previa en tiempo real y optimización inteligente de texto.**

![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-cyan)

## ✨ Características Principales

### 🧠 **Optimización Inteligente de Texto**
- **Algoritmo de 6 pasos**: Normalización, estructura, contexto, redundancia, comprensión IA y formato
- **Mejora de coherencia**: Elimina lenguaje conversacional y optimiza para IA
- **Transformación automática**: "lo que quiero es que..." → texto profesional optimizado
- **Botón deshacer**: Recupera el texto original en cualquier momento

### 🎯 **Roles Profesionales Dinámicos**
- **80+ roles especializados**: Roles específicos para cada área temática
- **Selector dinámico**: Muestra solo roles relevantes según el tema seleccionado
- **Contexto profesional**: La IA responde desde la perspectiva del rol elegido
- **10 áreas temáticas**: Programación, Diseño, Marketing, Educación, Análisis de Datos, etc.

### 🤖 **Acceso Directo a Motores de IA**
- **8 plataformas integradas**: ChatGPT, Claude, Gemini, Perplexity, Groq, Hugging Face, Cohere, DeepSeek
- **Botón "Abrir Chat"**: Acceso directo a cada plataforma con un clic
- **Selector en editor**: Ubicado estratégicamente para fácil acceso

### 🎨 **Configuración Completa**
- **8 tonos de comunicación**: Profesional, casual, técnico, creativo, formal, amigable, académico, persuasivo
- **8 formatos de salida**: Párrafo, lista, tabla, código, esquema, informe, guión, email
- **4 niveles de detalle**: Básico, intermedio, detallado, exhaustivo
- **6 idiomas**: Español, inglés, francés, alemán, italiano, portugués

### ✏️ **Vista Previa y Edición**
- **Vista previa en tiempo real**: Visualiza el prompt mientras lo configuras
- **Editor integrado**: Modifica el prompt generado directamente
- **Sincronización automática**: Cambios reflejados instantáneamente
- **Copia rápida**: Botón para copiar al portapapeles

## 🛠️ Stack Tecnológico

- **Frontend**: React 18+ con TypeScript
- **Build Tool**: Vite
- **Estilos**: TailwindCSS con tema oscuro personalizado
- **Animaciones**: Framer Motion
- **Estado**: Context API
- **Tipografía**: JetBrains Mono (fuente monoespaciada)

## �️ Stack Tecnológico

- **React 19** - Framework UI moderno con hooks avanzados
- **TypeScript 5.9** - Tipado estático y seguridad de tipos
- **Vite** - Build tool ultrarrápido con HMR
- **Tailwind CSS 3.4** - Estilos utility-first responsivos
- **Framer Motion 12** - Animaciones fluidas y transiciones
- **Context API** - Gestión de estado global sin librerías externas

## �🚀 Instalación y Ejecución

### Prerrequisitos

- Node.js 18+ 
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/TU_USUARIO/builder_prompts.git
   cd builder_prompts
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   - La aplicación estará disponible en `http://localhost:5173`

### Scripts disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Construye la aplicación para producción
npm run preview  # Vista previa de la build de producción
npm run lint     # Ejecuta el linter de código
```

## 📁 Estructura del Proyecto

```
builder_prompts/
├── src/
│   ├── components/          # Componentes React
│   │   ├── FunctionalPromptBuilder.tsx  # Constructor principal
│   │   ├── PromptPreview.tsx           # Vista previa del prompt
│   │   ├── EditablePromptViewer.tsx    # Editor de prompts
│   │   ├── PromptInput.tsx             # Input de objetivo
│   │   └── AIHelper.tsx                # Ayuda contextual
│   ├── context/            # Context API
│   │   ├── PromptContext.tsx           # Provider y lógica
│   │   └── PromptContextDefinition.tsx # Definiciones de tipos
│   ├── hooks/              # Custom hooks
│   │   └── usePrompt.ts                # Hook principal
│   ├── utils/              # Utilidades
│   │   └── promptTemplates.ts          # Generación y optimización
│   ├── types/              # Definiciones TypeScript
│   │   └── index.ts                    # Interfaces y tipos
│   ├── constants/          # Constantes y configuración
│   │   └── promptOptions.ts            # Opciones y roles
│   └── assets/             # Recursos estáticos
├── public/                 # Archivos públicos
├── docs/                   # Documentación adicional
└── examples/               # Ejemplos de transformaciones
```

## 🎯 Ejemplo de Uso

### Caso 1: Optimización de texto conversacional

**Input original:**
```
lo que quiero es que me hagas una funcion que pueda exportar excel
```

**Texto optimizado (automático):**
```
Crear función que exporte datos a formato Excel (.xlsx) con toda la información.
```

**Prompt generado:**
```
PROMPT ARQUITECTO - CONFIGURACIÓN PROFESIONAL

═══════════════════════════════════════════════════════════════
ÁREA DE ESPECIALIZACIÓN: Programación y desarrollo
ROL PROFESIONAL: Desarrollador Full Stack

Actúa como Desarrollador Full Stack especializado en programación y desarrollo 
con amplia experiencia práctica. Adapta tu enfoque a las mejores prácticas, 
terminología y estándares de este campo desde la perspectiva de este rol profesional.

OBJETIVO PRINCIPAL:
Crear función que exporte datos a formato Excel (.xlsx) con toda la información.

CONFIGURACIÓN DE RESPUESTA:

ESTILO DE COMUNICACIÓN: TÉCNICO
   → Lenguaje preciso con terminología especializada y conceptos avanzados

FORMATO DE PRESENTACIÓN: CÓDIGO
   → Incluye bloques de código con sintaxis apropiada y comentarios explicativos

NIVEL DE PROFUNDIDAD: Detallado - Análisis profundo con ejemplos prácticos

IDIOMA DE RESPUESTA: ESPAÑOL
...
```

### Caso 2: Diseño UX/UI

**Configuración:**
- Área: Diseño y creatividad
- Rol: Diseñador UX/UI
- Objetivo: Sistema de diseño escalable para aplicación web
- Tono: Profesional
- Formato: Esquema

El sistema genera un prompt estructurado con terminología de diseño, mejores prácticas de UX/UI y consideraciones de accesibilidad.

## 🔧 Algoritmo de Optimización

El sistema aplica 6 pasos de optimización al texto del objetivo:

1. **Normalización y limpieza**: Elimina "lo que quiero es que", "me gustaría", etc.
2. **Mejora de estructura**: Sustituye verbos débiles por verbos de acción precisos
3. **Optimización por contexto**: Adapta según área (programación, diseño, escritura)
4. **Eliminación de redundancia**: Remueve palabras de relleno y mejora coherencia
5. **Optimización para IA**: Añade especificidad y términos técnicos relevantes
6. **Formato final**: Ajusta puntuación y capitalización

## 🎨 Roles Profesionales por Área

- **Programación**: Desarrollador Full Stack, Arquitecto de Software, DevOps Engineer, etc.
- **Diseño**: Diseñador UX/UI, Director de Arte, Motion Designer, etc.
- **Marketing**: Estratega Digital, Content Manager, SEO Specialist, etc.
- **Análisis de Datos**: Data Scientist, Analista de BI, Machine Learning Engineer, etc.
- **10 áreas más** con 8 roles cada una (80+ roles totales)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:


1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/NuevaCaracteristica`)
3. Commit tus cambios (`git commit -m 'Añade nueva característica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

## 👨‍💻 Autor

**Hugo**

## 🌟 Roadmap

- [ ] Exportación a PDF
- [ ] Historial de prompts generados
- [ ] Templates personalizados guardables
- [ ] Integración con APIs de IA para testing directo
- [ ] Modo colaborativo multi-usuario
- [ ] Biblioteca de prompts de la comunidad

---

⭐ Si este proyecto te resulta útil, considera darle una estrella en GitHub


```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
