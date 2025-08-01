# Funcionalidades de Importación y Descarga de Plantilla para Guías

## Descripción General

Se han implementado dos nuevas funcionalidades para el módulo de Guías:

1. **Descarga de Plantilla**: Permite descargar un archivo Excel con el formato requerido para importar guías y sus preguntas.
2. **Importación de Guías**: Permite cargar un archivo Excel con datos de guías y preguntas para crearlas masivamente en el sistema.

## Archivos Modificados/Creados

### 1. GuideServices.ts

Se agregaron dos nuevas funciones:

- `downloadGuideTemplateServices()`: Descarga la plantilla Excel desde el API
- `importGuideServices(file: File)`: Envía el archivo Excel al API para procesar la importación

### 2. useGuide.ts

Se agregaron dos nuevos hooks:

- `downloadTemplate`: Maneja la descarga de la plantilla y la descarga automática del archivo
- `importGuide`: Maneja la importación del archivo Excel con validaciones y notificaciones

### 3. GuideImport.tsx (Nuevo)

Componente que proporciona la interfaz para:

- Descargar la plantilla Excel
- Seleccionar y validar archivos Excel para importar
- Realizar la importación con feedback visual

### 4. Guide.tsx

Se modificó para incluir:

- Botón "Importar Guías" en la barra de herramientas
- OffCanvas para mostrar el componente de importación

### 5. GuideImportModel.ts (Nuevo)

Define los modelos TypeScript para:

- `GuideImportModel`: Estructura de datos para guías con sus preguntas
- `GuideImportRowModel`: Estructura de cada fila en el archivo Excel

## Cómo usar las funcionalidades

### Descarga de Plantilla

1. Ir al módulo de Guías
2. Hacer clic en "Importar Guías"
3. En el panel lateral, hacer clic en "Descargar Plantilla"
4. El archivo Excel se descargará automáticamente con el nombre "plantilla-guias.xlsx"

### Importación de Guías

1. Completar la plantilla Excel descargada con los datos de las guías y preguntas
2. En el panel de importación, hacer clic en "Seleccionar archivo" y elegir el archivo Excel
3. Hacer clic en "Importar"
4. El sistema validará el archivo y procesará la importación
5. Se mostrarán notificaciones de éxito o error según corresponda

## Validaciones Implementadas

### Del archivo:

- Tamaño máximo: 5 MB
- Formato: Solo archivos .xlsx o .xls
- Tipo MIME: Debe ser un archivo Excel válido

### En el servidor (requerirá implementación del API):

- Validación de estructura de columnas
- Validación de datos requeridos
- Validación de integridad referencial

## Endpoints del API Requeridos

Para que estas funcionalidades trabajen completamente, el backend debe implementar:

1. `GET /api/guides/template` - Retorna la plantilla Excel
2. `POST /api/guides/import` - Procesa la importación del archivo Excel

## Estructura Esperada del Excel

La plantilla debe contener las siguientes columnas:

- **Nombre de la Guía**: Nombre descriptivo de la guía
- **Descripción de la Guía**: Descripción detallada
- **ID Escala**: Identificador de la escala asociada
- **Texto de la Pregunta**: Contenido de la pregunta
- **Orden de la Pregunta**: Número de orden de la pregunta dentro de la guía

## Características Técnicas

- **Framework**: React + TypeScript
- **Gestión de Estado**: TanStack Query (React Query)
- **Notificaciones**: React Toastify
- **Validación de Archivos**: Validación del lado cliente
- **Descarga de Archivos**: Usando URL.createObjectURL() y enlaces temporales
- **Subida de Archivos**: FormData con multipart/form-data

## Patrón de Diseño Utilizado

Se siguió el patrón establecido en el proyecto para la funcionalidad de importación de clientes (`ClientImport.tsx`), manteniendo:

- Estructura de servicios consistent
- Manejo de errores unificado
- UI/UX coherente con el resto del sistema
- Validaciones del lado cliente similares
