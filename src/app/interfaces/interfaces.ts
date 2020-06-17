export interface Product{
    id: String,
    name: string,
    description: string,
    stock?: number,
    price?: number,
    image?: any,
    demand?: boolean
}

export interface User{
    uid?: String;
    name: String;
    born?: String;
    email: String;
    role: String;
    pass?: String;
}