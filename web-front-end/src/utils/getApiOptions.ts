
export function getApiOptions(method: string, b: Record<string, unknown>): RequestInit {
    const headers: HeadersInit = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    const body: BodyInit | null = b && Object.keys(b).length === 0 ? null : JSON.stringify(b);

    return {method , mode: 'cors', credentials: 'include', headers: headers, body};
}