// src/services/api.js
const API_BASE_URL = 'https://internal.suivision.xyz/testnet/api';

const headers = {
  'X-Api-Timestamp': Math.floor(Date.now() / 1000),
  'X-App-Id': '3c9d9d50fb0f8c7a3ef7299b62417d84',
  'Accept': 'application/json',
  'Origin': 'https://testnet.suivision.xyz'
};

export const getBalances = async (address) => {
  const response = await fetch(
    `${API_BASE_URL}/account/coins?account=${address}`,
    { headers }
  );
  return response.json();
};

export const getObjects = async (address) => {
  const response = await fetch(
    `${API_BASE_URL}/account/nfts?account=${address}&pageSize=5&pageIndex=1&returnCollection=true&isUnknown=true`,
    { headers }
  );
  return response.json();
};