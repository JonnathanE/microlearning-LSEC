import babel from '@rolldown/plugin-babel';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [
        react(),
        // twin.macro needs babel-plugin-macros, so the files in src/ go through Babel.
        // Temporary: twin.macro is removed in phase 5.
        babel({
            include: /\/src\/.*\.jsx?$/,
            plugins: [['babel-plugin-macros', { twin: { config: './tailwind.config.cjs' } }]],
        }),
    ],
    server: {
        port: 3000,
        strictPort: true,
    },
    preview: {
        port: 3000,
        strictPort: true,
    },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/setupTests.js',
        include: ['src/**/*.test.{js,jsx}'],
        css: true,
    },
});
