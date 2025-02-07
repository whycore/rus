// src/components/AddressInput/AddressInput.jsx
import './AddressInput.css';

export default function AddressInput({ address, setAddress, onCheck, loading }) {
  return (
    <div className="search-box">
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter wallet address"
      />
      <button onClick={onCheck} disabled={loading}>
        {loading ? 'Loading...' : 'Check'}
      </button>
    </div>
  );
}