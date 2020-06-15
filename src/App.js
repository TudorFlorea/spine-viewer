import React, {useState, useEffect} from 'react';

import DropZone from './components/DropZone';
import {onSpineCreated, dispatchStartAnimation} from './services/events';

function App() {

  const [animations, setAnimations] = useState([]);

  useEffect(() => {
    // setApp(new new PIXI.Application(window.innerWidth, window.innerHeight));
    onSpineCreated((data) => {
        setAnimations(data.animations.map(anim => anim.name));
    });
  }, []);

  const handleAnimationClick = (anim) => {
    return () => {
      dispatchStartAnimation(anim);
    }
  }

  return (
    <div className="App">

      <DropZone />

    {animations.map(anim => {
      return <button key={anim} onClick={handleAnimationClick(anim)}>{anim}</button>
    })}

    </div>
  );
}

export default App;
