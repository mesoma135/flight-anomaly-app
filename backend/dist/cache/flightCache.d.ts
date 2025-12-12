export declare const saveLiveFlight: (flightId: string, data: any) => Promise<void>;
export declare const getLiveFlight: (flightId: string) => Promise<{
    [x: string]: string;
}>;
export declare const addActiveFlight: (flightId: string) => Promise<void>;
export declare const getActiveFlights: () => Promise<string[]>;
export declare const removeActiveFlight: (flightId: string) => Promise<void>;
//# sourceMappingURL=flightCache.d.ts.map