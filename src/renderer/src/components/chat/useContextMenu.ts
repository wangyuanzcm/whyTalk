import { reactive, defineComponent, h } from 'vue'
import { NDropdown } from 'naive-ui'
import { IDropdown, IDropdownOption, IChatItem } from './types.ts'

export function useContextMenu(contextMenuHandle: (key: string) => void) {
  const dropdown: IDropdown = reactive({
    options: [] as IDropdownOption[],
    show: false,
    x: 0,
    y: 0,
    item: {} as IChatItem
  })

  const close = () => {
    dropdown.show = false
    dropdown.item = {} as IChatItem
  }

  const show = (e: MouseEvent, options: IDropdownOption[], item: IChatItem) => {
    dropdown.item = item
    dropdown.options = [...options]
    dropdown.x = e.clientX
    dropdown.y = e.clientY
    dropdown.show = true
  }

  const getItem = () => dropdown.item

  const handleSelect = (key: string) => {
    contextMenuHandle(key)
    close()
  }

  const handleClickOutside = () => {
    close()
  }

  const ContextMenuElement = defineComponent({
    name: 'ContextMenuElement',
    render() {
      return h(NDropdown, {
        options: dropdown.options,
        x: dropdown.x,
        y: dropdown.y,
        show: dropdown.show,
        onSelect: handleSelect,
        onClickoutside: handleClickOutside
      } as any)
    }
  })

  return { menu: { close, show, getItem }, ContextMenuElement }
}
