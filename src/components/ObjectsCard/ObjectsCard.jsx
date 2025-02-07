// src/components/ObjectsCard/ObjectsCard.jsx
export default function ObjectsCard({ objects }) {
    const blobCount = objects.data[0]?.nftList.length || 0;
    const nftCount = objects.data[2]?.nftList.length || 0;
   
    return (
      <div className="card">
        <h2>Objects Overview</h2>
        <div className="objects-grid">
          <div>
            <h3>Total Objects</h3>
            <p>{objects.total}</p>
          </div>
          <div>
            <h3>Blobs</h3>
            <p>{blobCount}</p>
          </div>
          <div>
            <h3>NFTs</h3>
            <p>{nftCount}</p>
          </div>
        </div>
      </div>
    );
   }