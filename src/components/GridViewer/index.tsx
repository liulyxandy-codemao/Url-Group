import { Avatar, Button, ButtonGroup, List, Space } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import { base, dashboard, bitable } from '@lark-base-open/js-sdk';
import { toMinText, toNormalText } from "../../utils";

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
    config: IUrlGroupConfig
}) {
    let [data, setData] = useState<IViewerData[]>([])
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
                    icon: toNormalText(icon),
                    link: toNormalText(link)
                })
            }
            setData(data)
        }

        fetchData();
    }, [props]); // 空依赖数组意味着这个effect只会在组件挂载后运行一次
    return (
        <List
            grid={{
                gutter: 64,
                span: 8,
            }}
            dataSource={data}
            renderItem={item => (
                <List.Item onClick={() => { window.open(item.link) }}>
                    <Space vertical style={{ cursor: "pointer" }}>
                        <Avatar src={item.icon}></Avatar>
                        <p>{toMinText(6, item.text)}</p>
                    </Space>
                </List.Item>
            )}
        />
    )
}