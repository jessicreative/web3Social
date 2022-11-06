import { EndUserErrorDisplay, ErrorCodes } from './types';
/**
 * Included in thrown exceptions to the client app when the process fails.
 */
export declare const ERROR_MESSAGES: Record<ErrorCodes, string>;
/**
 * Used to show user friendly errors in the UI (ErrorScene.tsx).
 */
export declare const END_USER_ERROR_MESSAGES: Partial<Record<ErrorCodes, EndUserErrorDisplay>>;
export declare const breakpoints: {
    sm: string;
};
