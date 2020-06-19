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
    uid?: string;
    name: String;
    born?: String;
    email: String;
    role: String;
    prov?: String;
    city?: String;
    adress?: String;
}