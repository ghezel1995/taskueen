export interface Task {
    id: number;
    title: string;
    completed: boolean;
    createdAt: number;
}

export type Filter = 'all' | 'active' | 'completed';
