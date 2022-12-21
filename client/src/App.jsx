import {
  BrowserRouter, Route, Routes
} from "react-router-dom";
import { useState } from "react"
import { ethers } from "ethers"
import { Spinner } from "react-bootstrap"

import Users from "./contractsData/Users.json"
import UsersAddress from "./contractsData/Users-address.json"
import Market from "./contractsData/Market.json"
import MarketAddress from "./contractsData/Market-address.json"
import FProduct from "./contractsData/FProduct.json"
import FProductAddress from "./contractsData/FProduct-address.json"
import DProduct from "./contractsData/DProduct.json"
import DProductAddress from "./contractsData/DProduct-address.json"
import NavigationBar from "./components/NavigationBar"
import Home from "./components/Home";
import Profile from "./components/Profile";
import LoginPage from "./components/LoginPage";
import Register from "./components/Register";

function App() {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [users, setUsers] = useState(null)
  const [market, setMarket] = useState({})
  const [fProduct, setFProduct] = useState({})
  const [dProduct, setDProduct] = useState({})

  const [isUser, setIsUser] = useState(false)
  const [isDesigner, setIsDesigner] = useState(false)
  const [isManufacturer, setIsManufacturer] = useState(false)
  

  // Metamask connect
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0])
    // Get provider from metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // Set signer
    const signer = provider.getSigner()

    loadContracts(signer)
  }
  const loadContracts = (signer) => {
    // Get deployed copies of contracts
    const users1 = new ethers.Contract(UsersAddress.address, Users.abi, signer)
    setUsers(users1)
    const market1 = new ethers.Contract(MarketAddress.address, Market.abi, signer)
    setMarket(market1)
    const fProduct1 = new ethers.Contract(FProductAddress.address, FProduct.abi, signer)
    setFProduct(fProduct1)
    const dProduct1 = new ethers.Contract(DProductAddress.address, DProduct.abi, signer)
    setDProduct(dProduct1)

    setLoading(false)
  }

  const roleCheck = async () => {
    
  }

  return (
    <BrowserRouter>
      <div>
        {loading ? (
          <Routes>
            <Route path="/" element={
              <Home web3Handler={web3Handler} account={account}/>
            } />
          </Routes>
        ) : (
          <>
          <NavigationBar account={account} loading={loading} users={users}/>
          <Routes>
            <Route path="/" element={
              <Home web3Handler={web3Handler} account={account}/>
            } />
            <Route path="/profile" element={
              <Profile users={users} />
            } />
            <Route path="/loginPage" element={
              <LoginPage/>
            } />
            <Route path="/registerPage" element={
              <Register/>
            } />
            <Route path="/profile" element={
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <Spinner animation="border" style={{ display: 'flex' }} />
                <p className='mx-3 my-0'>Awaiting Metamask Connection...</p>
              </div>
            } />
          </Routes>
          </>
        )}
      </div>
    </BrowserRouter>
  )
}

export default App
