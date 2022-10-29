import { useState } from 'react';
import axios from 'axios';
import { getRandomId } from '../getRandomId';

function Flags() {
  const [isEmtpy, setIsEmtpy] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  const fetchImage = async () => {
    setIsLoading(true);
    setIsEmtpy(false);
    setHasError(false);

    try {
      const res = await axios.get(`https://rickandmortyapi.com/api/character/${getRandomId()}`);
      setImageSrc(res.data.image);
    } catch (err) {
      setHasError(true);
    }

    setIsLoading(false);
  };

  return (
    <section>
      <header>
        <h2>Flags</h2>
      </header>

      <article>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '300px',
            height: '300px',
            background: 'hsl(330, 60%,60%)',
            marginBottom: '20px',
          }}
        >
          {hasError && <p>Error occured</p>}
          {isLoading && <p>Loading...</p>}
          {imageSrc && !isLoading && (
            <img
              style={{ width: '100%', height: '100%' }}
              src={imageSrc}
              alt='rickandmorty'
            />
          )}
        </div>

        {isEmtpy && <p>Fetch your first image!</p>}

        <button onClick={fetchImage}>Fetch Image</button>
      </article>
    </section>
  );
}

export default Flags;
