
// components
import Dashboard from './Dashboard/Dashboard'
import DarkVariantExample from "./DarkVariantExample"
import PackingSolutionleft from './PackagingSolutionleft'
import PackingSolutions from './PackingSolutions'
import Footer from './Footer'
import AjirDetails from '../Components/productDetails/AjirDetails'
const Home = () => {



  return (
    <div className="home">
      <Dashboard />
      {/* <AjirDetails /> */}
      <DarkVariantExample />
      <PackingSolutionleft />
      <PackingSolutions />
      <Footer />
      
    
     
      
   

    </div>
  )
}

export default Home