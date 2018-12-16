import Home from './pages/Home'
import Login from './pages/Login'
import Widgets from './pages/Widgets'
import Account from './pages/Account'
import { MockApi as mockApi } from './apis/mock'
import { Api as Api } from './apis/index'
import { NavigationStructure as navStructure } from './constants/navigation'

const Routes = [
  {
    path: navStructure.ITEMS.home.path,
    exact: true,
    component: Home
  },
  {
    path: navStructure.ITEMS.myApps.path,
    component: Widgets,
    fetchInitialData: () => new Promise((resolve, reject) => {
      const data = mockApi.load()
      return resolve(data)
    }),
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: navStructure.ITEMS.myAccount.path,
    component: Account,
  }
]

export {
  Routes
}
