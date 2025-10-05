// import AsyncStorage from '@react-native-async-storage/async-storage';
import { encode as btoa, decode as atob } from 'base-64';
import { getItem, removeItem, setItem } from '../storage/storage';

const TOKEN_KEY = 'auth_token';
const USER_EMAIL_KEY = 'user_email';

export interface AuthToken {
    email: string;
    exp: number;
    timestamp: number;
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
        timestamp: now,
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

export async function saveAuthToken(token: string, email: string): Promise<void> {
    try {
        await setItem(TOKEN_KEY, token);
        await setItem(USER_EMAIL_KEY, email);
    } catch (error) {
        throw new Error('Failed to save authentication token');
    }
}

export async function getAuthToken(): Promise<string | null> {
    try {
        const token = await getItem(TOKEN_KEY);
        if (token && !isTokenExpired(token)) {
            return token;
        }
        await clearAuthToken();
        return null;
    } catch (error) {
        return null;
    }
}
export async function getUserEmail(): Promise<string | null> {
    try {
        return await getItem(USER_EMAIL_KEY) ?? null;
    } catch (error) {
        return null;
    }
}

export async function clearAuthToken(): Promise<void> {
    try {
        await removeItem(TOKEN_KEY);
        await removeItem(USER_EMAIL_KEY);
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
