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
    name: string;
    born?: String;
    email: String;
    role: String;
    prov?: String;
    city?: String;
    adress?: String;
}

export interface cartProduct{
    name: string,
    cant: number,
    price: number,
    desc: string,
    sale: number,
    img?: string;
    id?: number;
}