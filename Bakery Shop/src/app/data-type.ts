export interface signUp {
    name:string,
    password:string,
    email:string
}

export interface login {
    email:string,
    password:string
}

export interface product {
    name: string,
    price: number,
    category: string,
    taste: string,
    description: string,
    image: string,
    id: number,
    categoryId:number,
    quantity: undefined | number,
    productId:undefined|number

}

export interface category {
    id: number,
    categoryName: string
}

export interface cart {
    name: string,
    price: number,
    category: string,
    taste: string,
    description: string,
    image: string,
    id: number | undefined,
    categoryId:number,
    quantity: undefined | number,
    productId: number,
    userId: number,

}

export interface priceSummary{
    price: number,
    discount: number,
    tax: number,
    delivery:number,
    total: number
}

export interface order{
    name:string,
    email:string,
    tel:string,
    address:string,
    city:string,
    district:string,
    totalPrice: number,
    userId:number | undefined
    shipMethod:string,
    payMethod: string,
    id:number|undefined
}

export interface localCart{
    category: string,
    categoryId: number,
    description: string,
    id: number,
    image: string,
    name: string,
    price:number,
    quantity:number,
    taste: string
}

export interface postnews{
    id:string,
    type:string,
    typeid:string,
    title:string,
    image:string,
    date:string,
    description:string,
    detail:string
}