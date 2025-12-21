import * as ReactNative from 'react-native-web';

export default ReactNative;
export * from 'react-native-web';

export const TurboModuleRegistry = {
    getEnforcing: (name) => {
        console.warn(`TurboModuleRegistry.getEnforcing("${name}") called in web shim`);
        return null;
    },
    get: (name) => {
        console.warn(`TurboModuleRegistry.get("${name}") called in web shim`);
        return null;
    },
};

// Add other missing exports as they appear
export const CodeGenNativeCommands = {};
