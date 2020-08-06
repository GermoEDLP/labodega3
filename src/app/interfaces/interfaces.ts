export interface Product{
    id?: string,
    name: string,
    desc: string,
    longDesc?: string,
    stock: number,
    price: number,
    image?: any,
    sale: Sale[],
    sales?: string,
    order: boolean,
    cat: string[],
    show: boolean,
    date?: any,
    user?: string
}

export interface Sale{
    show: boolean | string,
    name: string,
    cant: number,
    off: number,
    desc: string
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
    sale?: Sale[],
    desc: string,
    img?: string;
    idF?: string;
    id?: string 
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

export interface TotalCart{
    total: number,
    subtotal: number,
    promo?: Promo[]
}

export interface subTotalCart{
    pesos: number, 
    promo?: Sale
}

export interface Promo{    
    subtotal: number,
    prod: cartProduct,
    sale?: Sale
}

export interface FilterCat{
    cat: string,
    id: string
}