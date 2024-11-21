import './dropdown-item.scss'

import { inject } from 'vue'

export const dropdownItemProps = {
  action: null,
  icon: String,
  label: String
}

export function useDropdownItem (props) {
  const {
    hide: collapse,
    emitAction,
    emitItemClick
  } = inject('popup')

  function handleClick () {
    collapse()
    emitItemClick(props)

    if (props.action) {
      emitAction(props.action)
    }
  }

  return {
    handleClick
  }
}
