export interface Product{
    id?: string,
    name: string,
    desc: string,
    stock: number,
    price: number[],
    image?: any,
    sale: number[],
    order: boolean,
    cat: string[],
    show: boolean

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