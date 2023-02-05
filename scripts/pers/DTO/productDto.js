export default class ProductDto {
    constructor({ id, title, price, thumbnail, time, desc, inv, code}) {
        this.id = id
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
        this.time = time
        this.desc = desc
        this.inv = inv
        this.code = code
    }
}

export function asDto(pers) {
    if (Array.isArray(pers))
        return pers.map(p => new ProductDto(p))
    else
        return new ProductDto(pers)
}