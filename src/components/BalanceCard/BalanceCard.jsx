// src/components/BalanceCard/BalanceCard.jsx
import { formatBalance } from '../../utils/formatters';

export default function BalanceCard({ balances }) {
  return (
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
  );
}