import './style.scss';
import React from 'react';
import { bitable, dashboard, DashboardState, FieldType, IConfig } from "@lark-base-open/js-sdk";
import { Button } from '@douyinfe/semi-ui';
import { useState, useEffect, useRef } from 'react';
import { useConfig } from '../../hooks';
import classnames from 'classnames'
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next/typescript/t';
import { Item } from '../Item';
import { IconSelect } from '../TypeSelector';
import { TableSelector } from '../TableSelector'
import { ViewSelector } from '../ViewSelector';
import { CategorySelector } from '../CategorySelector';
import { RowViewer } from '../RowViewer';
import { GridViewer } from '../GridViewer';
interface IUrlGroupConfig {
  type: 'grid' | 'row',
  table: string | null,
  view: string | null,
  titleRow: string | null,
  iconRow: string | null,
  linkRow: string | null
}



export default function UrlGroup() {

  const { t, i18n } = useTranslation();

  // create时的默认配置
  const [config, setConfig] = useState<IUrlGroupConfig>({
    type: 'grid',
    table: null,
    view: null,
    titleRow: null,
    iconRow: null,
    linkRow: null
  })


  const isCreate = dashboard.state === DashboardState.Create

  useEffect(() => {
    if (isCreate) {
      setConfig({
        type: 'grid',
        table: null,
        view: null,
        titleRow: null,
        iconRow: null,
        linkRow: null
      })
    }
  }, [i18n.language, isCreate])

  /** 是否配置/创建模式下 */
  const isConfig = dashboard.state === DashboardState.Config || isCreate;

  const timer = useRef<any>()

  /** 配置用户配置 */
  const updateConfig = (res: IConfig) => {
    if (timer.current) {
      clearTimeout(timer.current)
    }
    const { dataConditions } = res;
    if (dataConditions) {
      setConfig(dataConditions as any);
      timer.current = setTimeout(() => {
        //自动化发送截图。 预留3s给浏览器进行渲染，3s后告知服务端可以进行截图了（对域名进行了拦截，此功能仅上架部署后可用）。
        dashboard.setRendered();
      }, 3000);
    }

  }

  useConfig(updateConfig)

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

  return (
    <main className={classnames({
      'main-config': isConfig,
      'main': true,
    })}>
      <div className='content' style={light ? {} : {
        scrollbarColor: "#333 #222"
      }}>
        {
          config.type == "row" ?
            <RowViewer config={config} trans={t} />
            :
            <GridViewer config={config} trans={t} />
        }
      </div>
      {
        isConfig && <ConfigPanel t={t} config={config} setConfig={setConfig} />
      }
    </main>
  )
}



function ConfigPanel(props: {
  config: IUrlGroupConfig,
  setConfig: React.Dispatch<React.SetStateAction<IUrlGroupConfig>>,
  t: TFunction<"translation", undefined>,
}) {
  const { config, setConfig, t } = props;

  /**保存配置 */
  const onSaveConfig = () => {
    dashboard.saveConfig({
      customConfig: config,
      dataConditions: config,
    } as any)
  }

  return (
    <div className='config-panel'>
      <div className='form'>

        <Item label={
          <div className='view-type'>
            {t('label.display.viewtype')}
          </div>
        }>
          <IconSelect
            onChange={(e: 'grid' | 'row') => {
              setConfig({
                ...config,
                type: e
              })
            }}
            optionList={[
              {
                label: t('label.display.viewtype.grid'),
                value: 'grid',
                icon: 'grid_inactive.svg',
                selectedIcon: 'grid_active.svg',
              },
              {
                label: t('label.display.viewtype.row'),
                value: 'row',
                icon: 'row_inactive.svg',
                selectedIcon: 'row_active.svg',
              }
            ]}
            value={config.type}
          />
        </Item>
        <Item label={
          <div className='select-table'>
            {t('label.display.select.table')}
          </div>
        }>
          <TableSelector
            onChange={(e) => {
              setConfig({
                ...config,
                table: e
              })
            }}
            defaultSection={config.table}
          />
        </Item>
        <Item label={
          <div className='select-view'>
            {t('label.display.select.view')}
          </div>
        }>
          <ViewSelector
            onChange={(e) => {
              setConfig({
                ...config,
                view: e
              })
            }}
            defaultSection={config.view}
            tableId={config.table}
          />
        </Item>
        <Item label={
          <div className='select-title'>
            {t('label.display.select.title')}
          </div>
        }>
          <CategorySelector
            onChange={(e) => {
              setConfig({
                ...config,
                titleRow: e
              })
            }}
            defaultSection={config.titleRow}
            tableId={config.table}
            viewId={config.view}
            availableFieldTypes={[FieldType.Text, FieldType.SingleSelect, FieldType.Formula]}
          />
        </Item >
        <Item label={
          <div className='select-icon'>
            {t('label.display.select.icon')}
          </div>
        } >
          <CategorySelector
            onChange={(e) => {
              setConfig({
                ...config,
                iconRow: e
              })
            }}
            defaultSection={config.iconRow}
            tableId={config.table}
            viewId={config.view}
            availableFieldTypes={[FieldType.Text, FieldType.Url, FieldType.Attachment, FieldType.Formula]}
          />
        </Item>
        <Item label={
          <div className='select-link'>
            {t('label.display.select.link')}
          </div>
        }>
          <CategorySelector
            onChange={(e) => {
              setConfig({
                ...config,
                linkRow: e
              })
            }}
            defaultSection={config.linkRow}
            tableId={config.table}
            viewId={config.view}
            availableFieldTypes={[FieldType.Text, FieldType.Url, FieldType.Attachment, FieldType.Formula]}
          />
        </Item>
      </div>

      <Button
        className='btn'
        theme='solid'
        onClick={onSaveConfig}
      >
        {t('confirm')}
      </Button>
    </div>
  )
}