export interface Partner {
    id: string         
    userId: string    
    name: string
    age: number
    likes: string[]
    dislikes: string[]
    notes?: string
    createdAt: Date
}