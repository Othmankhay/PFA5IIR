import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react({
        babel: {
            plugins: ['react-native-reanimated/plugin'],
        },
    })],
    esbuild: {
        loader: 'jsx',
        include: /src\/.*\.js$/,
        exclude: [],
    },
    resolve: {
        alias: [
            { find: 'react-native/Libraries/Utilities/codegenNativeComponent', replacement: path.resolve(__dirname, './src/shim.js') },
            { find: 'react-native/Libraries/ReactNative/AppContainer', replacement: path.resolve(__dirname, './src/shim.js') },
            { find: 'react-native/Libraries/Utilities/codegenNativeCommands', replacement: path.resolve(__dirname, './src/shim.js') },
            { find: 'react-native', replacement: path.resolve(__dirname, './src/react-native-shim.js') },
            { find: 'react-native-reanimated', replacement: path.resolve(__dirname, 'node_modules/react-native-reanimated/lib/module/index.js') },
        ],
        extensions: ['.web.js', '.web.jsx', '.web.ts', '.web.tsx', '.js', '.jsx', '.ts', '.tsx'],
    },
    define: {
        global: 'window',
        __DEV__: 'true',
        'process.env': {},
    },
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                '.js': 'jsx',
            },
        },
    },
});
