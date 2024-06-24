import { TFunction } from "i18next";
import { useEffect, useState } from "react";
import GridActive from "../Icons/grid_active.tsx"
import RowActive from "../Icons/row_active.tsx"
import GridInactive from "../Icons/grid_inactive.tsx"
import RowInactive from "../Icons/row_inactive.tsx"
import { Space } from "@douyinfe/semi-ui";
export function TypeSelector(props: {
    onChange: (type: "grid" | "row") => void,
    trans: TFunction<"translation", undefined>,
    defaultSection: "grid" | "row"
}) {
    const [type, setType] = useState<"grid" | "row">(props.defaultSection);
    useEffect(()=>{
        setType(props.defaultSection)
    },[props.defaultSection])
    function trigger(t: "grid" | "row") {
        setType(t); 
        props.onChange(t);
    }
    return (
        type == 'grid' ?
            <Space style={{ cursor: 'pointer' }}>
                <GridActive />
                <div onClick={() => { trigger('row') }}><RowInactive /></div>
            </Space>
            :
            <Space style={{ cursor: 'pointer' }}>
                <div onClick={() => { trigger('grid') }}><GridInactive /></div>
                <RowActive />
            </Space>
    )
}