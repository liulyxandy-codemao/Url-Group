import { Avatar, Button, ButtonGroup, List, Skeleton } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import { base, dashboard, bitable, FieldType, IField, IOpenAttachment, IAttachmentField } from '@lark-base-open/js-sdk';
import { toMinText, toNormalText } from "../../utils";
import './row.scss'
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
export function RowViewer(props: {
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
    async function fetchData() {
        let data: IViewerData[] = []
        if(props.config.table == null){
            return
        }
        let recordList = await (await bitable.base.getTableById(props.config.table!)).getRecordList()
        for (const record of recordList) {
            
            const title_cell = await record.getCellByField(props.config.titleRow!)
            const title = await title_cell.getValue();
            const icon_cell = await record.getCellByField(props.config.iconRow!)
            let icon_field = await (
                await bitable.base.getTableById(props.config.table!)
            ).getFieldById(props.config.iconRow!)
            let icon_type = await (
                icon_field
            ).getType()
            let icon = [{
                text: ""
            }]
            if (icon_type == FieldType.Attachment){
                try {
                    let urls = await (icon_field as IAttachmentField).getAttachmentUrls(record.id)
                    icon = [{
                        text: urls[0]
                    }]
                } catch (e) {
                    console.warn("Failed to fetch icon")
                }
            }
            else{
                icon = await icon_cell.getValue();
            }
            
            if (!Array.isArray(icon) && !Array.isArray(title)){
                continue
            }
            const link_cell = await record.getCellByField(props.config.linkRow!)
            let link_field = await (
                await bitable.base.getTableById(props.config.table!)
            ).getFieldById(props.config.linkRow!)
            let link_type = await (
                link_field
            ).getType()
            let link = [{
                text: ""
            }]
            if(link_type == FieldType.Attachment){
                try {
                    let urls = await (link_field as IAttachmentField).getAttachmentUrls(record.id)
                    link = [{
                        text: urls[0]
                    }]
                } catch (e) {
                    console.warn("Failed to fetch link")
                }
            }
            else{
                link = await link_cell.getValue();
            }
            data.push({
                text: toNormalText(title),
                icon: toNormalText(icon),
                link: toNormalText(link)
            })
        }
        setData(data)
    }
    useEffect(() => {


        fetchData();


    }, [props]); // 空依赖数组意味着这个effect只会在组件挂载后运行一次
    useEffect(() => {
        const update = dashboard.onConfigChange(() => {
            fetchData()
        });
        return () => {
            update();
        }
    }, []);
    const placeholder = (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'center', rowGap: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'center', columnGap: '30px' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'start',
                    justifyItems: "center",
                    columnGap: '10px'
                }}>
                    <Skeleton.Avatar style={{ borderRadius: "10px" }} />
                    <Skeleton.Title style={{ width: 80, marginBottom: 12, marginTop: 12 }} />
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'start',
                    justifyItems: "center",
                    columnGap: '10px'
                }}>
                    <Skeleton.Avatar style={{ borderRadius: "10px" }} />
                    <Skeleton.Title style={{ width: 80, marginBottom: 12, marginTop: 12 }} />
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'start',
                    justifyItems: "center",
                    columnGap: '10px'
                }}>
                    <Skeleton.Avatar style={{ borderRadius: "10px" }} />
                    <Skeleton.Title style={{ width: 80, marginBottom: 12, marginTop: 12 }} />
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'start',
                    justifyItems: "center",
                    columnGap: '10px'
                }}>
                    <Skeleton.Avatar style={{ borderRadius: "10px" }} />
                    <Skeleton.Title style={{ width: 80, marginBottom: 12, marginTop: 12 }} />
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'center', columnGap: '30px' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'start',
                    justifyItems: "center",
                    columnGap: '10px'
                }}>
                    <Skeleton.Avatar style={{ borderRadius: "10px" }} />
                    <Skeleton.Title style={{ width: 80, marginBottom: 12, marginTop: 12 }} />
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'start',
                    justifyItems: "center",
                    columnGap: '10px'
                }}>
                    <Skeleton.Avatar style={{ borderRadius: "10px" }} />
                    <Skeleton.Title style={{ width: 80, marginBottom: 12, marginTop: 12 }} />
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'start',
                    justifyItems: "center",
                    columnGap: '10px'
                }}>
                    <Skeleton.Avatar style={{ borderRadius: "10px" }} />
                    <Skeleton.Title style={{ width: 80, marginBottom: 12, marginTop: 12 }} />
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'start',
                    justifyItems: "center",
                    columnGap: '10px'
                }}>
                    <Skeleton.Avatar style={{ borderRadius: "10px" }} />
                    <Skeleton.Title style={{ width: 80, marginBottom: 12, marginTop: 12 }} />
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'center', columnGap: '30px' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'start',
                    justifyItems: "center",
                    columnGap: '10px'
                }}>
                    <Skeleton.Avatar style={{ borderRadius: "10px" }} />
                    <Skeleton.Title style={{ width: 80, marginBottom: 12, marginTop: 12 }} />
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'start',
                    justifyItems: "center",
                    columnGap: '10px'
                }}>
                    <Skeleton.Avatar style={{ borderRadius: "10px" }} />
                    <Skeleton.Title style={{ width: 80, marginBottom: 12, marginTop: 12 }} />
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'start',
                    justifyItems: "center",
                    columnGap: '10px'
                }}>
                    <Skeleton.Avatar style={{ borderRadius: "10px" }} />
                    <Skeleton.Title style={{ width: 80, marginBottom: 12, marginTop: 12 }} />
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'start',
                    justifyItems: "center",
                    columnGap: '10px'
                }}>
                    <Skeleton.Avatar style={{ borderRadius: "10px" }} />
                    <Skeleton.Title style={{ width: 80, marginBottom: 12, marginTop: 12 }} />
                </div>
            </div>
        </div>
    );

    return (
        <List
            style={{ width: "100%" }}
            emptyContent={<Skeleton placeholder={placeholder} loading={true} active></Skeleton>}
            dataSource={data}
            renderItem={item => (
                <List.Item
                    style={{ width: "100%" }}
                    header={<Avatar shape="square" style={{ borderRadius: 12 }} src={item.icon}></Avatar>}
                    main={<p style={{
                        color: light ? 'black' : 'white'
                    }}>{toMinText(12, item.text)}</p>}
                    extra={
                        <Button theme='solid' size='small' type='primary' onClick={() => { window.open(item.link) }}>打开</Button>
                    }
                    align="center"
                />
            )}
        />
    )
}