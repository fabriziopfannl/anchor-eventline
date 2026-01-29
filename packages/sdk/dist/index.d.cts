type EventSchema = {
    name: string;
    version: number;
    discriminator: Uint8Array;
};
type DecodedEvent<T = unknown> = {
    name: string;
    version: number;
    data: T;
    raw: string;
};
type EventRegistry = Record<string, {
    version: number;
    decoder: (buf: Uint8Array) => unknown;
}>;

declare function decodeEventLogs(logs: string[], registry: EventRegistry): DecodedEvent[];

export { type DecodedEvent, type EventRegistry, type EventSchema, decodeEventLogs };
