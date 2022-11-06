import { ErrorCodes } from './types';
export declare const initTelemetry: (enableTelemetry?: boolean | undefined) => void;
export declare const telemetryVerificationLaunched: () => void;
export declare const telemetryConnectionEstablished: (leadTimeSeconds?: number | undefined) => void;
export declare const telemetryVerificationSuccess: () => void;
export declare const telemetryVerificationFailed: (errorCode: ErrorCodes) => void;
export declare const telemetryException: (exception: unknown, stackTrace: unknown) => void;
