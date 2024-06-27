import React, { useState, useEffect } from 'react';
import { Select } from '@douyinfe/semi-ui';
import { OptionProps } from '@douyinfe/semi-ui/lib/es/select';
import { base } from '@lark-base-open/js-sdk';
import { useTranslation } from 'react-i18next';

interface ViewSelectorProps {
    onChange: (type: string) => void;
    defaultSection: string | null;
    tableId: string | null;
}

export function ViewSelector(props: ViewSelectorProps) {
    const [optionList, setOptionList] = useState<OptionProps[]>([]);
    let { t } = useTranslation();
    useEffect(() => {
        async function fetchViewData() {
            if(props.tableId == null) return
            const viewList = await (await base.getTableById(props.tableId)).getViewList()
            const options = viewList.map(async (view) => {
                const name = await view.getName();
                return { value: view.id, label: name };
            });

            // 等待所有getName调用完成
            const resolvedOptions = await Promise.all(options);
            setOptionList(resolvedOptions);
        }

        fetchViewData();
    }, [props.tableId]); // 空依赖数组意味着这个effect只会在组件挂载后运行一次

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
            placeholder={t("label.display.select.view")}
            style={{ width: 300 }}
            optionList={optionList}
            onChange={changeHandle}
            value={section}
        />
    );
}