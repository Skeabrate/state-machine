import { useState } from 'react';
import axios from 'axios';
import { getRandomId } from '../getRandomId';
import View from './view';

function Flags() {
  const [isEmtpy, setIsEmtpy] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  const fetchImage = async () => {
    setIsLoading(true);
    setIsEmtpy(false);
    setHasError(false);
    setHasLoaded(false);

    try {
      const res = await axios.get(`https://rickandmortyapi.com/api/character/${getRandomId()}`);
      setImageSrc(res.data.image);
      setHasLoaded(true);
    } catch (err) {
      setHasError(true);
    }

    setIsLoading(false);
  };

  return (
    <View
      isEmpty={isEmtpy}
      isLoading={isLoading}
      hasLoaded={hasLoaded}
      hasError={hasError}
      imageSrc={imageSrc}
      fetchImage={fetchImage}
    />
  );
}

export default Flags;
