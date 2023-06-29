import { createContext } from "react";
import { accessTokenPayloadDTO } from "../models/auth";

export type ContextTokenType = {
    contextTokenPayload: accessTokenPayloadDTO | undefined;
    setContextTokenPayload: (accessTokenPayload: accessTokenPayloadDTO | undefined) => void;
    };
    export const ContextToken = createContext<ContextTokenType>({
    contextTokenPayload: undefined,
    setContextTokenPayload: () => {},
    });