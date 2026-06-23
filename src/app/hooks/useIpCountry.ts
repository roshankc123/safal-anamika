import { useEffect, useState } from "react";

export type CountryBucket = "nepal" | "outside-nepal";

interface IpCountryState {
    loading: boolean;
    countryCode: string | null;
    bucket: CountryBucket;
}

const CACHE_KEY = "ip-country-code";
const CACHE_TTL_MS = 1000 * 60 * 60 * 24; // 24h

function readCache(): string | null {
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as { code: string; ts: number };
        if (!parsed?.code || !parsed?.ts) return null;
        if (Date.now() - parsed.ts > CACHE_TTL_MS) return null;
        return parsed.code;
    } catch {
        return null;
    }
}

function writeCache(code: string) {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ code, ts: Date.now() }));
    } catch {
        // ignore storage failures
    }
}

async function fetchCountryCodeByIp(): Promise<string | null> {
    const providers: Array<() => Promise<string | null>> = [
        async () => {
            const res = await fetch("https://ipapi.co/json/");
            if (!res.ok) return null;
            const data = (await res.json()) as { country_code?: string };
            return data.country_code?.toUpperCase() ?? null;
        },
        async () => {
            const res = await fetch("https://ipwho.is/");
            if (!res.ok) return null;
            const data = (await res.json()) as { success?: boolean; country_code?: string };
            if (data.success === false) return null;
            return data.country_code?.toUpperCase() ?? null;
        },
    ];

    for (const provider of providers) {
        try {
            const code = await provider();
            if (code) return code;
        } catch {
            // try next provider
        }
    }

    return null;
}

function bucketFromCode(code: string | null): CountryBucket {
    return code === "NP" ? "nepal" : "outside-nepal";
}

export function useIpCountry(): IpCountryState {
    const [countryCode, setCountryCode] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const cached = readCache();
        if (cached) {
            setCountryCode(cached);
            setLoading(false);
            return;
        }

        (async () => {
            const code = await fetchCountryCodeByIp();
            if (cancelled) return;

            if (code) {
                setCountryCode(code);
                writeCache(code);
            }

            setLoading(false);
        })();

        return () => {
            cancelled = true;
        };
    }, []);

    return {
        loading,
        countryCode,
        bucket: bucketFromCode(countryCode),
    };
}
