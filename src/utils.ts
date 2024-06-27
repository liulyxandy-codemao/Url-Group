export function toNormalText(obj:
    {
        text: string,
        link?: string,
        [key: string]: any
    }[]/*, way: string = 'normal',record:any=null*/
) {
    console.log(obj)

    let ans = ''
    for (let element of obj) {
        /*
        if (way == "icon") {
            if (element["type"].includes("image")) {
                ans += element.text
                console.log(record)
            } }else {
             */
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