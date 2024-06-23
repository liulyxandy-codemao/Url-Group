export function toNormalText(obj:
    {
        text: string,
        [key: string]: any
    }[]
) {
    let ans = ''
    for (let element of obj) {
        ans += element.text
    }
    return ans
}

export function toMinText(size: number, text: string){
    if (text.length <= size) {
        return text
    }
    return text.slice(0, size-1) + '...'
}