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