// import AsyncStorage from '@react-native-async-storage/async-storage';
import { encode as btoa, decode as atob } from 'base-64';
import { getItem, removeItem, setItem } from '../storage/storage';

const TOKEN_KEY = 'auth_token';
const USER_EMAIL_KEY = 'user_email';

export interface AuthToken {
    email: string;
    exp: number;
    iat: number;
}

function base64Encode(str: string): string {
    const encodedString = btoa(str);
    return encodedString
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

function base64Decode(str: string): string {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) {
        str += '=';
    }
    const decoded = atob(str);
    return decodeURIComponent(
        decoded
            .split('')
            .map((c) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
    );
}

export function generateJWT(email: string): string {
    const header = {
        alg: 'HS256',
        typ: 'JWT',
    };

    const now = Math.floor(Date.now() / 1000);
    const payload: AuthToken = {
        email,
        iat: now,
        exp: now + 3600,
    };

    const encodedHeader = base64Encode(JSON.stringify(header));
    const encodedPayload = base64Encode(JSON.stringify(payload));
    const signature = base64Encode(`${encodedHeader}.${encodedPayload}.secret`);

    return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export function decodeJWT(token: string): AuthToken | null {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) {
            return null;
        }

        const payload = JSON.parse(base64Decode(parts[1]));
        return payload;
    } catch (error) {
        return null;
    }
}

export function isTokenExpired(token: string): boolean {
    const decoded = decodeJWT(token);
    if (!decoded) {
        return true;
    }

    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
}

export function saveAuthToken(token: string, email: string): void {
    try {
        setItem(TOKEN_KEY, token);
        setItem(USER_EMAIL_KEY, email);
    } catch (error) {
        throw new Error('Failed to save authentication token');
    }
}
export function getAuthToken(): string | null {
    try {
        const token = getItem(TOKEN_KEY);
        if (token && !isTokenExpired(token)) {
            return token;
        }
        clearAuthToken(); // kalau expired, hapus
        return null;
    } catch (error) {
        return null;
    }
}

export function getUserEmail(): string | null {
    try {
        return getItem(USER_EMAIL_KEY) ?? null;
    } catch (error) {
        return null;
    }
}
export function clearAuthToken(): void {
    try {
        removeItem(TOKEN_KEY);
        removeItem(USER_EMAIL_KEY);
    } catch (error) {
        throw new Error('Failed to clear authentication token');
    }
}

export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function validatePassword(password: string): boolean {
    return password.length >= 6;
}
