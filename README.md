# ProMan - APP FRONT

ProMan es una app pensada para la gestión de proyectos y tareas colaborativas, construido con una arquitectura modular, rutas protegidas, y manejo eficiente del estado y la obtención de datos

## 🎓 Tecnologías y Librerías Principales

* [React](https://reactjs.org/) - Biblioteca para construir interfaces de usuario
* [TypeScript](https://www.typescriptlang.org/) - Superset de JavaScript tipado
* [Vite](https://vitejs.dev/) - Empaquetador rápido para desarrollo
* [Tailwind CSS](https://tailwindcss.com/) - Framework de CSS utilitario
* [React Router DOM](https://reactrouter.com/) - Navegación entre vistas
* [TanStack React Query](https://tanstack.com/query) - Manejo de datos asíncronos y caché
* [React Query Devtools](https://tanstack.com/query/latest/docs/react/devtools) - Herramientas de depuración

---

## 🧱 Arquitectura y Buenas Prácticas

* **🔹 Modularización por Dominios**: Vistas organizadas por contexto funcional (`auth`, `projects`, `profile`), siguiendo principios inspirados en Domain-Driven Design.
* **🔹 Layouts Reutilizables**: Composición de páginas con `AppLayout`, `AuthLayout`, etc., para estructurar y reutilizar interfaces comunes como barras de navegación.
* **🔹 Rutas Anidadas con React Router**: Navegación declarativa con soporte para rutas protegidas y `Outlet` para render dinámico de contenidos.
* **🔹 React Query para Gestión de Datos**: Caché automática, sincronización del estado del servidor, revalidación en segundo plano y manejo de errores desacoplado de los componentes.
* **🔹 Robustez con TypeScript y Strict Mode**: Tipado estático y detección de patrones problemáticos de renderizado para una base de código más segura.

---

## URL BACK
https://github.com/Tomas-Martin-dev/PROMAN_back
