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
    uid?: string,
    name: string,
    born?: string,
    email: string,
    role: string,
    prov?: string,
    city?: string,
    adress?: string,
    phone?: string,
    dni?: string,
    avatar?: string,
    created_at?: any,
    update_at?: any
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
    url?: UrlSlider,
    img?: string,
    show?: boolean 
}

export interface UrlSlider{
    url?: string,
    name?: string
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

export interface Comment{
    id?: string,
    user: CommentUser,
    date?: Date,
    content: string,
    show: boolean,
    product: CommentProd,
    rate: number
}

interface CommentUser{
    id: string,
    name: string
}

interface CommentProd{
    id: string,
    name: string
}

export interface Venta{
    id?: string,
    code?: string;
    state?: string,
    expire: number,
    payMethod?: string,
    shipp: boolean,
    shippData?: ShippData,
    userComplete: User,
    products?: TotalCart,
    date?: any,
    dateConf?: any,
    dateFinal?: any
}

export interface ShippData{
    adress: string,
    city: string,
    prov: string,
    dpto: string,
    numero: number,
    infoAdd: string
}


export interface Options {
    bussnessName: string;
    buyAdress: string;
    buyBankAcount: string;
    bussnessPhone: string;
    buyCBU: string;
    buyCUIL: string;
    buyEmailCount: string;
    buyEmailPass: string;
    buyRazonSocial: string;
    buySchedule: string;
    deliverySchedule: string;
    whatsappLink: string;
    afipLink: string;
  }
  
