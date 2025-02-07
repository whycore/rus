import { useState } from 'react';
import './App.css';

function App() {
 const [address, setAddress] = useState('');
 const [balances, setBalances] = useState(null);
 const [objects, setObjects] = useState(null);
 const [loading, setLoading] = useState(false);

 const getBalances = async (address) => {
   const headers = {
     'X-Api-Timestamp': Math.floor(Date.now() / 1000),
     'X-App-Id': '3c9d9d50fb0f8c7a3ef7299b62417d84',
     'Accept': 'application/json',
     'Origin': 'https://testnet.suivision.xyz'
   };

   const response = await fetch(
     `https://internal.suivision.xyz/testnet/api/account/coins?account=${address}`,
     { headers }
   );
   return response.json();
 };

 const getObjects = async (address) => {
   const headers = {
     'X-Api-Timestamp': Math.floor(Date.now() / 1000),
     'X-App-Id': '3c9d9d50fb0f8c7a3ef7299b62417d84',
     'Accept': 'application/json', 
     'Origin': 'https://testnet.suivision.xyz'
   };

   const response = await fetch(
     `https://internal.suivision.xyz/testnet/api/account/nfts?account=${address}&pageSize=5&pageIndex=1&returnCollection=true&isUnknown=true`,
     { headers }
   );
   return response.json();
 };

 const handleCheck = async () => {
   if(!address) return;
   
   setLoading(true);
   try {
     const [balanceData, objectsData] = await Promise.all([
       getBalances(address),
       getObjects(address)
     ]);
     
     setBalances(balanceData.result.coins);
     setObjects(objectsData.result);
   } catch (error) {
     console.error(error);
   }
   setLoading(false);
 };

 const formatBalance = (balance, decimals) => {
   return (balance / Math.pow(10, decimals)).toLocaleString();
 };

 return (
   <div className="container">
     <h1>Walrus Protocol Activity</h1>
     <div className="search-box">
       <input
         type="text" 
         value={address}
         onChange={(e) => setAddress(e.target.value)}
         placeholder="Enter wallet address"
       />
       <button onClick={handleCheck} disabled={loading}>
         {loading ? 'Loading...' : 'Check'}
       </button>
     </div>

     {balances && (
       <div className="card">
         <h2>Token Balances</h2>
         {balances.map(coin => (
           <div key={coin.coinType} className="balance-item">
             {coin.logo && <img src={coin.logo} alt={coin.symbol} />}
             <div>
               <h3>{coin.symbol}</h3>
               <p>{formatBalance(coin.balance, coin.decimals)} {coin.symbol}</p>
             </div>
           </div>
         ))}
       </div>
     )}

     {objects && (
       <div className="card">
         <h2>Objects Overview</h2>
         <div className="objects-grid">
           <div>
             <h3>Total Objects</h3>
             <p>{objects.total}</p>
           </div>
           <div>
             <h3>Blobs</h3>
             <p>{objects.data[0]?.nftList.length || 0}</p>
           </div>
           <div>
             <h3>NFTs</h3>
             <p>{objects.data[2]?.nftList.length || 0}</p>
           </div>
         </div>
       </div>
     )}
   </div>
 );
}

export default App;