import { bitable } from "@lark-base-open/js-sdk"
import "./selector.scss"

let isDark = false
bitable.bridge.getTheme().then((theme: string) => {
  isDark = theme.toLocaleLowerCase() == 'dark'
})

export function IconSelect({ optionList, onChange, value }: any) {
    return <>
      <div className="iconSelectContainer">
        {
          optionList.map((item: any) => {
            const prefix = isDark ? '/assets/dark_' : '/assets/'
            if (item.value === value)
              return (
                <div className="iconSelectItem selected" onClick={(e) => onChange(item.value)}>
                  <img className="iconSelectIcon" src={prefix + item.selectedIcon}></img>
                  <div className="iconSelectLabel">{item.label}</div>
                </div>
              )
            return (
              <div className="iconSelectItem" onClick={(e) => onChange(item.value)}>
                <img className="iconSelectIcon" src={prefix + item.icon}></img>
                <div className="iconSelectLabel">{item.label}</div>
              </div>
            )
          })
        }
      </div>
    </>
  }