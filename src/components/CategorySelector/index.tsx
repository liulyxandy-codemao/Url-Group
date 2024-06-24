import React, { useState, useEffect } from 'react';
import { Select } from '@douyinfe/semi-ui';
import { OptionProps } from '@douyinfe/semi-ui/lib/es/select';
import { base } from '@lark-base-open/js-sdk';

interface CategorySelectorProps {
    onChange: (type: string) => void;
    defaultSection: string | null;
    tableId: string | null;
    viewId: string | null;
}

export function CategorySelector(props: CategorySelectorProps) {
    const [optionList, setOptionList] = useState<OptionProps[]>([]);

    useEffect(() => {
        async function fetchCategoryData() {
            if(props.tableId == null || props.viewId == null) return;
            const categoryList = await (await (await base.getTableById(props.tableId)).getViewById(props.viewId)).getFieldMetaList();
            const options = categoryList.map(async (category) => {
                const name = category.name;
                return { value: category.id, label: name };
            });

            // 等待所有getName调用完成
            const resolvedOptions = await Promise.all(options);
            setOptionList(resolvedOptions);
        }

        fetchCategoryData();
    }, [props.tableId, props.viewId]); // 空依赖数组意味着这个effect只会在组件挂载后运行一次

    let { onChange, defaultSection } = props;
    const [section, setSection] = useState(String(defaultSection));
    useEffect(()=>{
        setSection(String(defaultSection))
    }, [defaultSection])
    function changeHandle(r: string | number | any[] | Record<string, any> | undefined){
        r = r as string
        onChange(r)
    }
    defaultSection = defaultSection == null ? '' : defaultSection
    return (
        <Select
            placeholder="请选择字段"
            style={{ width: 300 }}
            optionList={optionList}
            onChange={changeHandle}
            value={section}
        />
    );
}