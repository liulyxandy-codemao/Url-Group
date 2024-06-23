import { Avatar, Button, ButtonGroup, List } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import { base, dashboard, bitable } from '@lark-base-open/js-sdk';
import { toNormalText } from "../../utils";

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
export function RowViewer(props: {
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
            dataSource={data}
            renderItem={item => (
                <List.Item
                    header={<Avatar src={item.icon}></Avatar>}
                    main={<p>{item.text}</p>}
                    extra={
                        <Button onClick={() => { window.open(item.link) }}>打开</Button>
                    }
                    align="center"
                />
            )}
        />
    )
}