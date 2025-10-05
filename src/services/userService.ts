import axios, { AxiosError } from "axios";
import apiClient, { ApiError } from "../api/api";
import { User } from "../types/user";

export async function fetchUsers(): Promise<User[]> {
    try {
        const response = await apiClient.get<User[]>('/users');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            throw {
                message: axiosError.response?.data || axiosError.message || 'Failed to fetch users',
                statusCode: axiosError.response?.status,
            } as ApiError;
        }
        throw {
            message: 'An unexpected error occurred',
        } as ApiError;
    }
}