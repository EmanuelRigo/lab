# Laboratorio Clínico: Sistema de Gestión de Pacientes y Análisis

Este es un proyecto desarrollado con HTML, CSS y JavaScript, utilizando Firebase como backend para la gestión de datos en tiempo real y autenticación de usuarios. La aplicación permite a los usuarios interactuar con los servicios del laboratorio, ver resultados y gestionar su información personal.

## Características Principales

- **Gestión de Pacientes:** Funcionalidad para registrar y consultar información de pacientes.
- **Resultados de Análisis:** Permite a los usuarios consultar los resultados de sus análisis clínicos de forma segura.
- **Autenticación de Usuarios:** Sistema de registro y login para gestionar perfiles de pacientes.
- **Interfaz Amigable:** Interfaz de usuario intuitiva y fácil de usar construida con HTML y CSS.

## Tecnologías Utilizadas

### Frontend

- **Lenguaje:** [HTML](https://developer.mozilla.org/es/docs/Web/HTML), [CSS](https://developer.mozilla.org/es/docs/Web/CSS), [JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript)
- **Framework/Librerías:** No se utilizan frameworks principales, es un proyecto basado en tecnologías web estándar.

### Backend

- **Plataforma:** [Firebase](https://firebase.google.com/)
  - **Autenticación:** Firebase Authentication
  - **Base de Datos:** Firestore o Realtime Database (a través de `firebase.js`)

## Prerrequisitos

- Un navegador web moderno (Chrome, Firefox, Safari, etc.).
- Conexión a internet para acceder a los servicios de Firebase.

## Instalación

No se requiere un proceso de instalación complejo. Simplemente clona el repositorio y abre el archivo `index.html` en tu navegador.

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/EmanuelRigo/lab.git
    cd lab
    ```

## Configuración

1.  **Variables de Entorno de Firebase:**
    - Abre el archivo `js/firebase.js`.
    - Reemplaza la configuración de Firebase con las credenciales de tu propio proyecto de Firebase.
      ```javascript
      const firebaseConfig = {
        apiKey: "TU_API_KEY",
        authDomain: "TU_AUTH_DOMAIN",
        projectId: "TU_PROJECT_ID",
        storageBucket: "TU_STORAGE_BUCKET",
        messagingSenderId: "TU_MESSAGING_SENDER_ID",
        appId: "TU_APP_ID",
      };
      ```

## Cómo Ejecutar la Aplicación

1.  **Abrir la aplicación:**
    Simplemente abre el archivo `index.html` en tu navegador web.

    La aplicación se ejecutará localmente en tu navegador.

## Credenciales de Prueba

- **Usuario:** maira.lab
- **Contraseña:** 8787

## Estructura del Proyecto

```
.
├── css/                # Hojas de estilo
│   ├── acces.css
│   └── style.css
├── images/             # Imágenes y recursos gráficos
│   ├── celiaqia.jpg
│   ├── dengue.jpg
│   ├── embarazo.jpg
│   ├── laboratorio.ico
│   ├── laboratorio.jpg
│   ├── laboratorio1.jpg
│   ├── laboratorio2.jpg
│   └── personal.jpg
├── js/                 # Lógica de la aplicación
│   ├── firebase.js
│   ├── index.js
│   └── script.js
├── acces.html          # Página de acceso/login
├── analisis.json       # Posiblemente datos de ejemplo
├── index.html          # Página principal de la aplicación
├── prueba.jsx          # Archivo de prueba (posiblemente sin uso)
└── README.md           # Documentación del proyecto
```

- **`/css`**: Contiene los estilos para dar formato a la aplicación.
- **`/images`**: Almacena todas las imágenes utilizadas en la interfaz.
- **`/js`**: Contiene la lógica de la aplicación, incluyendo la configuración de Firebase y la interactividad de las páginas.
- **`index.html`**: Es el punto de entrada principal de la aplicación.
- **`acces.html`**: Página dedicada a la autenticación de usuarios.
