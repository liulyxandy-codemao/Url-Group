import { Avatar, Button, ButtonGroup, List, Space } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import { base, dashboard, bitable } from '@lark-base-open/js-sdk';
import { toMinText, toNormalText } from "../../utils";
import './grid.scss'
import { TFunction } from "i18next";
interface IUrlGroupConfig {
    type: 'grid' | 'row',
    table: string | null,
    view: string | null,
    titleRow: string | null,
    iconRow: string | null,
    linkRow: string | null
}
interface IViewerData {
    text: string,
    icon: string,
    link: string
}
export function GridViewer(props: {
    config: IUrlGroupConfig,
    trans: TFunction<"translation", undefined>
}) {
    let [data, setData] = useState<IViewerData[]>([])
    let [light, setIsLight] = useState(document.body.getAttribute('theme-mode') != 'dark')
    useEffect(() => {
        let theme = document.body.getAttribute('theme-mode')
        if (theme == 'dark') {
            setIsLight(false)
        }
        else {
            setIsLight(true)
        }
        bitable.bridge.onThemeChange((e) => {
            setIsLight(e.data.theme.toLocaleLowerCase() != 'dark')
        })
    }, [document.body.getAttribute('theme-mode')])
    useEffect(() => {
        async function fetchData() {
            let data: IViewerData[] = []
            let recordList = await (await bitable.base.getTableById(props.config.table!)).getRecordList()
            for (const record of recordList) {
                const title_cell = await record.getCellByField(props.config.titleRow!)
                const title = await title_cell.getValue();
                const icon_cell = await record.getCellByField(props.config.iconRow!)
                const icon = await icon_cell.getValue();
                const link_cell = await record.getCellByField(props.config.linkRow!)
                const link = await link_cell.getValue();
                data.push({
                    text: toNormalText(title),
                    icon: toNormalText(icon/*,"icon"*/),
                    link: toNormalText(link)
                })
            }
            setData(data)
        }

        fetchData();
    }, [props]); // 空依赖数组意味着这个effect只会在组件挂载后运行一次
    return (
        <List
            style={{ width: "100%" }}
            emptyContent={<svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M76.5398 70.0795L76.3244 69.9809L61.8551 81.0316C60.6664 81.9395 59.0704 82.1082 57.718 81.4691L7.71587 57.8358C6.35492 57.1926 6.16559 55.3331 7.36895 54.4288L21.0564 44.1424L42.1377 7.61167C43.1786 5.80802 45.4291 5.1047 47.3118 5.99472L98.6743 30.2764C99.0294 30.4442 99.3578 30.6635 99.649 30.9271L114.426 44.3024C115.823 45.5669 116.148 47.6347 115.206 49.2668L111.83 55.1195L93.7987 86.3444L90.9535 102.279C90.6774 103.825 88.8092 104.465 87.6439 103.412L74.3133 91.37C73.269 90.4267 72.7973 89.004 73.0711 87.6236L76.5488 70.0882L76.5398 70.0795Z" fill="#BBBFC4" fill-opacity="0.45" />
                <path d="M99.1065 30.5555C98.8669 30.4182 98.5614 30.5011 98.4241 30.7407L76.3241 69.3007C76.1868 69.5403 76.2697 69.8458 76.5093 69.9831C76.7489 70.1205 77.0544 70.0375 77.1917 69.798L99.2917 31.238C99.429 30.9984 99.3461 30.6929 99.1065 30.5555Z" fill="#8F959E" />
                <path d="M22.6481 44.609C22.7643 44.3585 23.0616 44.2497 23.3121 44.3659L74.1821 67.9659C74.4326 68.0821 74.5415 68.3794 74.4253 68.6299C74.309 68.8804 74.0118 68.9892 73.7613 68.873L22.8913 45.273C22.6408 45.1568 22.5319 44.8595 22.6481 44.609Z" fill="#8F959E" />
                <path d="M78.5841 70.7157C78.7794 70.5205 79.096 70.5206 79.2912 70.7159L92.9212 84.3559C93.1164 84.5512 93.1163 84.8678 92.9209 85.063C92.7256 85.2582 92.409 85.2581 92.2138 85.0628L78.5838 71.4228C78.3886 71.2274 78.3887 70.9108 78.5841 70.7157Z" fill="#8F959E" />
                <path d="M11.7937 85.0758C11.8897 85.3407 12.1753 85.4857 12.4317 85.3997L26.4222 80.7052C26.6785 80.6192 26.8085 80.3347 26.7125 80.0698C26.6165 79.8049 26.3309 79.6598 26.0745 79.7458L12.0841 84.4403C11.8277 84.5263 11.6977 84.8108 11.7937 85.0758Z" fill="#002270" />
                <path d="M28.6513 93.1365C28.891 93.2817 29.1925 93.2068 29.3247 92.9691L32.8992 86.5435C33.0314 86.3058 32.9443 85.9954 32.7046 85.8502C32.465 85.705 32.1635 85.7799 32.0313 86.0176L28.4568 92.4431C28.3246 92.6808 28.4117 92.9912 28.6513 93.1365Z" fill="#002270" />
                <path d="M40.3447 98.3544C40.6097 98.436 40.8801 98.2863 40.9486 98.0199L42.7017 91.2039C42.7702 90.9376 42.6109 90.6556 42.3459 90.574C42.0809 90.4924 41.8105 90.6421 41.742 90.9084L39.9889 97.7245C39.9204 97.9908 40.0797 98.2728 40.3447 98.3544Z" fill="#002270" />
                <path d="M21.5402 15.2369C21.3033 15.9701 20.0256 20.0796 18.8906 26.224C21.0629 16.8434 30.7318 16.1999 37.7471 15.2661L41.6523 8.44622C28.5366 6.83319 22.6956 12.7542 21.5402 15.2369Z" fill="#002270" />
                <path d="M20.4186 22.5347C20.547 23.0541 20.7079 23.5665 20.9009 24.0727C21.991 26.9319 24.071 29.5086 26.8705 31.9806C32.0025 36.5122 39.808 40.9009 49.1218 46.1376C49.5771 46.3936 50.036 46.6516 50.4983 46.9117L46.7326 51.6058C36.2983 45.6411 28.8315 41.0762 24.2868 36.9181C21.9702 34.7986 20.4819 32.8446 19.7295 30.935C18.9893 29.0563 18.9358 27.1569 19.6067 25.0658L20.4186 22.5347ZM18.6545 24.7603C15.7062 33.9506 25.3809 40.5791 46.9783 52.8976L52.0156 46.6184C51.7197 46.4517 51.4254 46.286 51.1325 46.1211C50.6342 45.8407 50.1402 45.5629 49.6508 45.2877C33.2102 36.0426 21.8575 29.6586 21.0867 20.4522C20.9434 18.7409 21.1658 16.9321 21.7891 14.9893L18.6545 24.7603Z" fill="#002270" />
                <path d="M114.729 86.0665C114.289 83.8931 107.517 74.6118 101.773 72.5762L104.911 67.1211C110.58 69.772 114.704 74.3925 114.71 77.1715C114.717 80.033 114.774 83.5659 114.729 86.0665Z" fill="#002270" />
                <path d="M83.1567 91.9654L83.1406 85.1843C89.2278 86.0039 94.7322 86.9841 102.989 86.429C111.332 85.8682 114.714 81.8932 114.705 77.8652L114.725 86.394C114.296 88.8997 110.394 92.9466 103.44 93.2258C96.4862 93.5049 90.0825 93.0806 83.1567 91.9654Z" fill="#33D6C0" />
                <path d="M66.1588 105.195C62.0069 103.955 59.0885 102.772 57.0679 101.783L56.9297 94.708C59.883 96.514 63.3637 97.5406 66.8032 98.4525C70.3094 99.3823 75.3291 100.663 80.5686 101.913L80.5847 108.73C75.3268 107.597 70.0132 106.347 66.1588 105.195Z" fill="#336DF4" />
                <path d="M84.6957 109.546L84.6797 102.765C90.7669 103.585 96.2712 104.565 104.528 104.01C112.871 103.449 116.254 99.4743 116.244 95.4463L116.264 103.975C115.835 106.481 111.933 110.528 104.979 110.807C98.0253 111.086 91.6216 110.662 84.6957 109.546Z" fill="#336DF4" />
            </svg>}
            grid={{
            }}
            dataSource={data}
            renderItem={item => (
                <List.Item onClick={() => { window.open(item.link) }} style={{ width: "100%", display: "grid", justifyItems: "center" }}>
                    <Space vertical style={{ cursor: "pointer", width: "100%", display: "grid", justifyItems: "center" }}>
                        <Avatar shape="square" style={{ borderRadius: 12 }} src={item.icon}></Avatar>
                        <p style={{ color: light ? 'black' : 'white' }}>{toMinText(8, item.text)}</p>
                    </Space>
                </List.Item>
            )}
        />
    )
}