// src/utils/debug.ts

export function debugLog(...args: any[]) {
    // This check ensures console logs are stripped out in production builds.
    if (process.env.NODE_ENV === 'development') {
        console.log(...args);
    }
}