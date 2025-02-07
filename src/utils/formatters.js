// src/utils/formatters.js
export const formatBalance = (balance, decimals) => {
    return (balance / Math.pow(10, decimals)).toLocaleString();
  };