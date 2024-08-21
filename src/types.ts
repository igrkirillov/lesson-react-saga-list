export type Item = {
    id: number,
    name: string
}

export type AppState = {
    searchText: string,
    loading: boolean,
    error: Error | null,
    items: Item[]
}