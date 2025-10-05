import { useState, useEffect, useCallback } from 'react';
import { User } from '../types/user';
import { fetchUsers } from '../services/userService';

interface UseUsersResult {
    data: User[] | null;
    loading: boolean;
    error: string | null;
    isRefreshing: boolean;
    refetch: () => void; // initial load / manual reload
    refresh: () => void;// pull-to-refresh
}

export function useUsers(): UseUsersResult {
    const [data, setData] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

    const fetchData = useCallback(async (isRefresh = false) => {
        if (isRefresh) setIsRefreshing(true);
        else setLoading(true);
        setError(null);
        try {
            const users = await fetchUsers();
            setData(users);
        } catch (err: any) {
            setError(err?.message || 'Failed to fetch users');
            setData([]);
        } finally {
            if (isRefresh) setIsRefreshing(false);
            else setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    const refetch = () => {
        fetchData();
    };
    const refresh = () => {
        fetchData(true);
    };
    return {
        data,
        loading,
        error,
        isRefreshing,
        refetch,
        refresh,
    };
}
