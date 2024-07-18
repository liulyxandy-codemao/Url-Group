export function toNormalText(obj:
    {
        text: string,
        link?: string,
        [key: string]: any
    }[]
) {
    console.log(obj)

    let ans = ''
    if (!Array.isArray(obj)) {
        ans += "NULL"
    }
    else {
        for (let element of obj) {
            if (element.link) {
                ans += element.link
            }
            else {
                console.log(JSON.stringify(element))
                if (element.text) {
                    ans += element.text
                } else {
                    ans += "NULL"
                }
            }
        }
    }
    return ans
}

export function toMinText(size: number, text: string) {
    if (text.length <= size) {
        return text
    }
    return text.slice(0, size - 1) + '...'
}