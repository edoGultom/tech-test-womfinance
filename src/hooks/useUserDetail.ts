import { useCallback, useEffect, useState } from "react";
import { fetchUserDetail } from "../services/userService";
import { User } from "../types/user";

interface UseUserDetailResult {
    data: User | null;
    loading: boolean;
    error: string | null;
    refresh: () => void;
}

export function useUserDetail(userId: string): UseUserDetailResult {
    const [data, setData] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const loadUserDetail = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const user = await fetchUserDetail(userId);
            setData(user);
        } catch (err: any) {
            setError(err?.message || 'Failed to fetch user detail');
            setData(null);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        loadUserDetail();
    }, [loadUserDetail]);

    const refresh = () => {
        loadUserDetail();
    };

    return { data, loading, error, refresh };
}