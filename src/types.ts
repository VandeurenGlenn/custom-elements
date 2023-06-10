export declare type propertyTypes = String | Array<any> | Object | Boolean | Number | Uint8Array

export declare type propertyConfig = {
  observer?: Function
  type: propertyTypes
  attribute?: boolean
  reflect?: boolean
  renders?: boolean
  attributeName?: string,
  value?: any
}

export declare type attributeConfig = {
  name: string
  type: propertyTypes
}


export declare type propertiesConfig = {
  [index: string]: propertyConfig
} 