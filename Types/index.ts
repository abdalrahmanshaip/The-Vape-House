export interface TypeDispo {
  _id: string
  productName: string
  img: Img
  price: number
  flavor: string
  quantity: number
  topDispo: string
  __v: number
}

export interface TypeTanks {
  _id: string
  productName: string
  img: Img
  price: number
  quantity: number
  __v: number
}

export interface TypePodSystem {
  _id: string
  productName: string
  img: Img
  price: number
  quantity: number
  colors: string
  __v: number
}
export interface TypeMod {
  _id: string
  productName: string
  img: Img
  price: number
  quantity: number
  colors: string
  __v: number
}
export interface TypeLiquid {
  _id: string
  productName: string
  img: Img
  line: string
  variations: TypeVariation[]
  __v: number
}

export interface TypeVariation {
  _id: string
  size: string
  nicotineType: string
  nicotine: string
  price: number
  quantity: number
}

export interface TypeCoildsCartidge {
  _id: string
  productName: string
  img: Img
  price: number
  quantity: number
  resistance: string
}

export interface Img {
  data: string
  contentType: string
}
