import { TFunction, use } from "i18next";
import { RadioGroup, Radio } from '@douyinfe/semi-ui';
import { useState } from "react";

export function TypeSelector(props: {
    onChange: (type: "grid" | "row") => void,
    trans: TFunction<"translation", undefined>,
    defaultSection: "grid" | "row"
}) {
    const [type, setType] = useState<"grid" | "row">(props.defaultSection);
    function trigger(){
        props.onChange(type);
    }
    return (
        <RadioGroup type='pureCard' defaultValue={"grid"} direction='horizontal' aria-label="单选组合示例" onChange={(value) => {setType(value.target.value);trigger()}}>
            <Radio value={"grid"} extra={
                type === "grid" ? 
                <img src="/grid.svg" width={104}/>
                :
                <img src="/grid_inactive.svg" width={104}/>
            } style={{ width: 138 }}>
                网格
            </Radio>
            <Radio value={"row"} extra={
                type === "row" ? 
                <img src="/row.svg" width={104}/>
                :
                <img src="/row_inactive.svg" width={104}/>
            } style={{ width: 138 }}>
                列表
            </Radio>
        </RadioGroup>
    )
}