import { useState } from 'react';
import axios from 'axios';
import { getRandomId } from '../getRandomId';

const StateMachine = () => {
  const states = {
    isEmpty: 'empty',
    isLoading: 'loading',
    hasLoaded: 'loaded',
    hasError: 'error',
  } as const;

  type StateKeys = keyof typeof states;
  type StateValues = typeof states[StateKeys];

  const [currentState, setCurrentState] = useState<StateValues>(states.isEmpty);
  const [imageSrc, setImageSrc] = useState(null);

  type Actions = 'FETCH_IMG' | 'FETCH_IMG_SUCCESS' | 'FETCH_IMG_ERROR';
  type Transtitions = {
    [P in StateValues]: {
      [K in Actions]?: StateValues;
    };
  };

  const transitions: Transtitions = {
    [states.isEmpty]: {
      FETCH_IMG: states.isLoading,
    },
    [states.isLoading]: {
      FETCH_IMG_SUCCESS: states.hasLoaded,
      FETCH_IMG_ERROR: states.hasError,
    },
    [states.hasLoaded]: {
      FETCH_IMG: states.isLoading,
    },
    [states.hasError]: {
      FETCH_IMG: states.isLoading,
    },
  };

  const updateState = (action: Actions) =>
    setCurrentState((currentState) => transitions[currentState][action] || currentState);

  const compareState = (state: StateValues) => currentState === state;

  const fetchImage = async () => {
    updateState('FETCH_IMG');

    try {
      const res = await axios.get(`https://rickandmortyapi.com/api/character/${getRandomId()}`);
      setImageSrc(res.data.image);
      updateState('FETCH_IMG_SUCCESS');
    } catch (err) {
      updateState('FETCH_IMG_ERROR');
    }
  };

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
          {compareState(states.hasError) && <p>Error occured</p>}
          {compareState(states.isLoading) && <p>Loading...</p>}
          {compareState(states.hasLoaded) && (
            <img
              style={{ width: '100%', height: '100%' }}
              src={imageSrc!}
              alt='rickandmorty'
            />
          )}
        </div>

        {compareState(states.isEmpty) && <p>Fetch your first image!</p>}

        <button onClick={fetchImage}>Fetch Image</button>
      </article>
    </section>
  );
};

export default StateMachine;
