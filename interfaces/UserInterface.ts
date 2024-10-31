// models/User.ts
export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    picture: string;
    type: number;
    phone: number;
    __v: number;
}

// A function to create a new User object
export const createUser = (data: Partial<User>): User => ({
    _id: data._id || "",
    name: data.name || "",
    email: data.email || "",
    password: data.password || "",
    picture: data.picture || "http://via.placeholder.com/300x300",
    type: data.type ?? 1,
    phone: data.phone || 0,
    __v: data.__v || 0
});

// Function to check if an object is of type User
export const isUser = (obj: any): obj is User => {
    return (
        typeof obj._id === "string" &&
        typeof obj.name === "string" &&
        typeof obj.email === "string" &&
        typeof obj.password === "string" &&
        typeof obj.picture === "string" &&
        typeof obj.type === "number" &&
        typeof obj.phone === "number" &&
        typeof obj.__v === "number"
    );
};

// Function to update fields of an existing User
export const updateUser = (user: User, updates: Partial<User>): User => ({
    ...user,
    ...updates
});
