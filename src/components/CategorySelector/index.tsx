import React, { useState, useEffect } from 'react';
import { Select } from '@douyinfe/semi-ui';
import { OptionProps } from '@douyinfe/semi-ui/lib/es/select';
import { base, FieldType } from '@lark-base-open/js-sdk';
import { useTranslation } from 'react-i18next';

interface CategorySelectorProps {
    onChange: (type: string) => void;
    defaultSection: string | null;
    tableId: string | null;
    viewId: string | null;
    availableFieldTypes?: FieldType[];
}

export function CategorySelector(props: CategorySelectorProps) {
    const [optionList, setOptionList] = useState<OptionProps[]>([]);
    let { t } = useTranslation();
    useEffect(() => {
        async function fetchCategoryData() {
            if (props.tableId == null || props.viewId == null) return;
            const categoryList = await (await (await base.getTableById(props.tableId)).getViewById(props.viewId)).getFieldMetaList();
            const options = categoryList.map(async (category) => {
                const name = category.name;
                console.log(name, props.availableFieldTypes && !props.availableFieldTypes.includes(category.type))
                if (name == 'ces' && (props.availableFieldTypes && !props.availableFieldTypes.includes(category.type)) == false) {
                    console.log(props.availableFieldTypes, props.availableFieldTypes?.includes(category.type), category.type)
                }
                if (props.availableFieldTypes && !props.availableFieldTypes.includes(category.type)) {
                    //console.log(category.type, props.availableFieldTypes)
                    return { value: category.id, label: name, disabled: true };
                }
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
    useEffect(() => {
        setSection(String(defaultSection))
    }, [defaultSection])
    function changeHandle(r: string | number | any[] | Record<string, any> | undefined) {
        r = r as string
        onChange(r)
    }
    defaultSection = defaultSection == null ? '' : defaultSection
    //console.log(optionList)
    return (
        <Select
            placeholder={t("label.display.select.category")}
            style={{ width: 300 }}
            optionList={optionList}
            onChange={changeHandle}
            value={section}
        />
    );
}