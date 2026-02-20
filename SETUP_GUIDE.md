# Project Setup Guide: TypeScript and shadcn

This guide provides instructions on how to transition the current React project to TypeScript and integrate shadcn.

## 1. Setup TypeScript

To add TypeScript support to your Vite project:

1.  **Install dependencies**:

    ```bash
    npm install -D typescript @types/react @types/react-dom @vitejs/plugin-react-swc
    ```

2.  **Initialize TypeScript**:
    Create a `tsconfig.json` in the root directory:

    ```json
    {
      "compilerOptions": {
        "target": "ESNext",
        "useDefineForClassFields": true,
        "lib": ["DOM", "DOM.Iterable", "ESNext"],
        "allowJs": true,
        "skipLibCheck": true,
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
        "strict": true,
        "forceConsistentCasingInFileNames": true,
        "module": "ESNext",
        "moduleResolution": "Node",
        "resolveJsonModule": true,
        "isolatedModules": true,
        "noEmit": true,
        "jsx": "react-jsx",
        "baseUrl": ".",
        "paths": {
          "@/*": ["./src/*"]
        }
      },
      "include": ["src"],
      "references": [{ "path": "./tsconfig.node.json" }]
    }
    ```

3.  **Rename Files**:
    Change `.jsx` files to `.tsx` and `.js` files to `.ts`.

## 2. Setup shadcn CLI

The current project already has some shadcn-like utilities (Radix, CVA, Tailwind Merge). To fully integrate with the shadcn CLI:

1.  **Run the init command**:

    ```bash
    npx shadcn-ui@latest init
    ```

2.  **Configuration**:
    When prompted, use the following recommended settings:
    - Style: New York
    - Base Color: Slate
    - CSS Variables: Yes
    - `components.json` path: root
    - `tailwind.config.js` path: `tailwind.config.js` (Note: You are using Tailwind v4 which handles configuration differently, often via CSS or the Vite plugin).

3.  **Adding Components**:
    You can now add components easily:
    ```bash
    npx shadcn-ui@latest add button
    npx shadcn-ui@latest add card
    ```

## 3. Tailwind CSS v4

Note: This project is using Tailwind CSS v4. Traditional `tailwind.config.js` is replaced by the CSS-first approach using `@theme` in your primary CSS file. Ensure your `src/index.css` is correctly configured.
