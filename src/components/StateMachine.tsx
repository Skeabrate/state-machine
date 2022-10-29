import { useState } from 'react';
import axios from 'axios';
import { getRandomId } from '../getRandomId';
import View from './view';

const StateMachine = () => {
  const states = {
    isEmpty: 'empty',
    isLoading: 'loading',
    hasLoaded: 'loaded',
    hasError: 'error',
  } as const;

  type StateKeys = keyof typeof states;
  type StateValues = typeof states[StateKeys];
  type Actions = 'FETCH_IMG' | 'FETCH_IMG_SUCCESS' | 'FETCH_IMG_ERROR';
  type Transtitions = {
    [P in StateValues]: {
      [K in Actions]?: StateValues;
    };
  };

  const [currentState, setCurrentState] = useState<StateValues>(states.isEmpty);
  const [imageSrc, setImageSrc] = useState(null);

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
    <View
      isEmpty={compareState(states.isEmpty)}
      isLoading={compareState(states.isLoading)}
      hasLoaded={compareState(states.hasLoaded)}
      hasError={compareState(states.hasError)}
      imageSrc={imageSrc}
      fetchImage={fetchImage}
    />
  );
};

export default StateMachine;
