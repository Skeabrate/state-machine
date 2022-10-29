type View = {
  isEmpty: boolean;
  isLoading: boolean;
  hasLoaded: boolean;
  hasError: boolean;
  imageSrc: string | null;
  fetchImage: () => void;
};

const View = ({ isEmpty, isLoading, hasLoaded, hasError, imageSrc, fetchImage }: View) => {
  return (
    <section>
      <header>
        <h2>Finite State Machine</h2>
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
          {hasLoaded && imageSrc && (
            <img
              style={{ width: '100%', height: '100%' }}
              src={imageSrc}
              alt='rickandmorty'
            />
          )}
        </div>

        {isEmpty && <p>Fetch your first image!</p>}

        <button onClick={fetchImage}>Fetch Image</button>
      </article>
    </section>
  );
};

export default View;
