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
    show: boolean,
    date?: any,
    user?: string
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

export interface Category{
    id?: string,
    name: string,
    subs: string[]
}

export interface Slider{
    id?: string,
    title: string,
    subtitle: string,
    url: string
}