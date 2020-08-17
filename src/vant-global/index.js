import {
  Popup,
  Loading,
  Button,
  Cell,
  CellGroup,
  Icon,
  Image,
  Col,
  Row,
  Lazyload,
  Toast,
  Skeleton,
  Sticky
} from 'vant'
const vantCompanies = [
  Popup,
  Loading,
  Button,
  Cell,
  CellGroup,
  Icon,
  Image,
  Col,
  Row,
  Skeleton,
  Sticky
]
const vantUses = [Lazyload, Toast]
export default {
  install(Vue) {
    vantCompanies.forEach(component => {
      Vue.component(component.name, component)
    })
    vantUses.forEach(component => {
      Vue.use(component)
    })
  }
}
