import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';
import * as BrandsIcons from '@fortawesome/free-brands-svg-icons';
import * as RegularIcons from '@fortawesome/free-regular-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import "../components/RandomIconComponent.css"
import { useRef } from 'react';

function getRandomId(array: string[]) {
  return Math.floor(Math.random() * array.length)
}

export default function RandomIconComponent() {

  const [countdown, setCountdown] = useState(3);
  const [iconRandom, setIconRandom] = useState<IconProp | undefined>(undefined);
  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const { prefix, far, fas, fab, ...allIcons } = {
    ...SolidIcons,
    ...BrandsIcons,
    ...RegularIcons,
  };
  const allIconsArr: Record<string, IconProp | undefined> = allIcons;
  const iconsKeysName = Object.keys(allIconsArr);

  const handleClick = () => {
    if (intervalId.current) clearInterval(intervalId.current);
    if (timeoutId.current) clearTimeout(timeoutId.current);

    setCountdown(3);
    intervalId.current = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    timeoutId.current = setTimeout(() => {
      if (intervalId.current) clearInterval(intervalId.current);
      const randomIndex = getRandomId(iconsKeysName);
      setIconRandom(allIconsArr[iconsKeysName[randomIndex]]);
    }, 3000);
  };

  return (
    <div className='wrapper'>
      <button className='button' onClick={handleClick}>Press button and wait {countdown} sec</button>
      {iconRandom && <FontAwesomeIcon icon={iconRandom} />}
    </div>
  );
};