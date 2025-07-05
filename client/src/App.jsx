
import { Provider } from 'react-redux'
import './App.css'
import PagesRoute from './Routes/PagesRoute'
import { store } from './store/store'

function App() {
 

  return (
    <Provider store={store}>
     <PagesRoute/>
        
    </Provider>
  )
}

export default App
