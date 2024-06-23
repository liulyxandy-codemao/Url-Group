import React, { useState, useEffect } from 'react';
import { Select } from '@douyinfe/semi-ui';
import { OptionProps } from '@douyinfe/semi-ui/lib/es/select';
import { base } from '@lark-base-open/js-sdk';

interface TableSelectorProps {
    onChange: (type: string) => void;
    defaultSection: string | null;
}

export function TableSelector(props: TableSelectorProps) {
    const [optionList, setOptionList] = useState<OptionProps[]>([]);

    useEffect(() => {
        async function fetchTableData() {
            const tableList = await base.getTableList();
            const options = tableList.map(async (table) => {
                const name = await table.getName();
                return { value: table.id, label: name };
            });

            // 等待所有getName调用完成
            const resolvedOptions = await Promise.all(options);
            setOptionList(resolvedOptions);
        }

        fetchTableData();
    }, []); // 空依赖数组意味着这个effect只会在组件挂载后运行一次

    let { onChange, defaultSection } = props;

    function changeHandle(r: string | number | any[] | Record<string, any> | undefined){
        r = r as string
        onChange(r)
    }
    defaultSection = defaultSection == null ? '' : defaultSection
    return (
        <Select
            placeholder="请选择数据表"
            style={{ width: 300 }}
            optionList={optionList}
            onChange={changeHandle}
            defaultValue={defaultSection}
        />
    );
}