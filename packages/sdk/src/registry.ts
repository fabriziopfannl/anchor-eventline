export type EventSchema = {
  name: string;
  version: number;
  discriminator: Uint8Array;
};

export type DecodedEvent<T = unknown> = {
  name: string;
  version: number;
  data: T;
  raw: string;
};

export type EventRegistry = Record<
  string,
  {
    version: number;
    decoder: (buf: Uint8Array) => unknown;
  }
>;
