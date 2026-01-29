import './App.css'
import Banner from './components/Banner/Banner'
import BestSelling from './components/BestSelling/BestSelling'
import Category from './components/Category/Category'
import ExploreProduct from './components/ExploreProducts/ExploreProduct'
import Footer from './components/Footer/Footer'
import Navber from './components/Navber/Navber'
import NewArrival from './components/NewArrival/NewArrival'

function App() {
 

  return (
    <>
    <Banner></Banner>
    <NewArrival></NewArrival>
    <Category></Category>
    <BestSelling></BestSelling>
    <ExploreProduct></ExploreProduct>
    </>
  )
}

export default App
