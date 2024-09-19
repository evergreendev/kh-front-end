export type BaseField = {
    name: string,
    label?: string | null,
    width?: number | null,
    required?: boolean | null,
    id?: string | null,
}

export type Errors = {
        message: string, fieldName
            :
            string
    }
    |
    null
