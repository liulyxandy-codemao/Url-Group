import './style.scss';
import React from 'react';
import { dashboard, DashboardState, IConfig } from "@lark-base-open/js-sdk";
import { Button } from '@douyinfe/semi-ui';
import { useState, useEffect, useRef } from 'react';
import { useConfig } from '../../hooks';
import classnames from 'classnames'
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next/typescript/t';
import { Item } from '../Item';
import { TypeSelector } from '../TypeSelector';
import { TableSelector } from '../TableSelector'
import { ViewSelector } from '../ViewSelector';
import { CategorySelector } from '../CategorySelector';
import { RowViewer } from '../RowViewer';
interface ICountDownConfig {
  type: 'grid' | 'row',
  table: string | null,
  view: string | null,
  titleRow: string | null,
  iconRow: string | null,
  linkRow: string | null
}



export default function CountDown() {

  const { t, i18n } = useTranslation();

  // create时的默认配置
  const [config, setConfig] = useState<ICountDownConfig>({
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
    const { customConfig } = res;
    if (customConfig) {
      setConfig(customConfig as any);
      timer.current = setTimeout(() => {
        //自动化发送截图。 预留3s给浏览器进行渲染，3s后告知服务端可以进行截图了（对域名进行了拦截，此功能仅上架部署后可用）。
        dashboard.setRendered();
      }, 3000);
    }

  }

  useConfig(updateConfig)

  return (
    <main className={classnames({
      'main-config': isConfig,
      'main': true,
    })}>
      <div className='content'>
        {
          config.type == "row" ?
          <RowViewer config={config} />
          :
          <RowViewer config={config} />
        }
      </div>
      {
        isConfig && <ConfigPanel t={t} config={config} setConfig={setConfig} />
      }
    </main>
  )
}



function ConfigPanel(props: {
  config: ICountDownConfig,
  setConfig: React.Dispatch<React.SetStateAction<ICountDownConfig>>,
  t: TFunction<"translation", undefined>,
}) {
  const { config, setConfig, t } = props;

  /**保存配置 */
  const onSaveConfig = () => {
    dashboard.saveConfig({
      customConfig: config,
      dataConditions: [],
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
          <TypeSelector
            onChange={(e) => {
              setConfig({
                ...config,
                type: e
              })
            }}
            trans={t}
            defaultSection={config.type}
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
          />
        </Item>
        <Item label={
          <div className='select-icon'>
            {t('label.display.select.icon')}
          </div>
        }>
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