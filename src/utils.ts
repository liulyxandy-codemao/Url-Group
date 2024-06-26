export function toNormalText(obj:
    {
        text: string,
        link?: string,
        [key: string]: any
    }[]
) {
    console.log(obj)
    let ans = ''
    for (let element of obj) {
        if (element.link) {
            ans += element.link
        }
        else { ans += element.text }
    }
    return ans
}

export function toMinText(size: number, text: string) {
    if (text.length <= size) {
        return text
    }
    return text.slice(0, size - 1) + '...'
}