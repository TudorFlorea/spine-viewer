import React, {useState, useEffect} from 'react';
import M from 'materialize-css';

import DropZone from './components/DropZone';
import Button from './components/Button';
import CheckBox from './components/CheckBox';
import TextInput from './components/TextInput';
import {
  onSpineCreated,
  onCoordsChange,
  dispatchStartAnimation,
  dispatchSpineScaleChange,
  dispatchDebugOptionChange,
  dispatchCoordsChange,
  dispatchSetupPose
} from './services/events';
import debugOptions from './config/debugOptions';

function App() {

  const [coords, setCoords] = useState({x: 0, y: 0});
  const [debugSpine, setDebugSpine] = useState(debugOptions);
  const [loopAnimations, setLoopAnimations] = useState(true);
  const [spineScale, setSpineScale] = useState(1);
  const [spineLoaded, setSpineLoaded] = useState(false);
  const [animations, setAnimations] = useState([]);

  useEffect(() => {
    // setApp(new new PIXI.Application(window.innerWidth, window.innerHeight));
    onSpineCreated((data) => {
        setAnimations(data.animations.map(anim => anim.name));
        setSpineLoaded(true);
    });

    onCoordsChange((c) => {
      setCoords(c);
    })

    M.updateTextFields();
    M.Range.init(document.getElementById("scale-range"));
  }, []);

  const handleAnimationClick = (anim) => {
    return () => {
      dispatchStartAnimation(anim, loopAnimations);
    }
  };

  const handleSetupPoseClick = () => {
    dispatchSetupPose();
  }

  const handleScaleChange = (e) => {
    const scale = parseFloat(e.target.value);
    setSpineScale(scale);
    dispatchSpineScaleChange(scale);
  }

  const handleLoopAnimationsChange = e => {
    setLoopAnimations(e.target.checked)
  }

  const handleDebugOptionChange = (option) => {
    return e => {
      setDebugSpine({
        ...debugSpine,
        [option]: e.target.checked
      });
      dispatchDebugOptionChange(option, e.target.checked);
    }
    
  }
 
  const handleCoordChange = (coord) => {
    return e => {
      const newCoords = {
        ...coords,
        [coord]: e.target.value
      }
      setCoords(newCoords);
      dispatchCoordsChange(newCoords);
    }
  }

  return (
    <div className="App container center-align">

      {spineLoaded ? (
        <>
          <h4>Spine scale {spineScale}</h4>
          <p className="range-field">
            <input type="range" id="scale-range" value={spineScale} min="0.2" max="2" step="0.1" onChange={handleScaleChange} />
          </p>

          <div className="row">
            <div className="col s12 m6">
              <TextInput
                label="X coord"
                wrapperClassName="x-coord"
                value={coords.x}
                onChange={handleCoordChange("x")}
              />
            </div>
            <div className="col s12 m6">
              <TextInput
                label="Y coord"
                wrapperClassName="y-coord"
                value={coords.y}
                onChange={handleCoordChange("y")}
              />
            </div>
          </div>

          <div className="row">
            <div className="col m6 s12">
              <h4>Animations</h4>
              <CheckBox 
                checked={loopAnimations}
                onChange={handleLoopAnimationsChange}
                label="Loop animations"
              />
              {animations.map(anim => {
                return <Button key={anim} onClick={handleAnimationClick(anim)} text={anim} className="animation-button" />
              })}

              <Button onClick={handleSetupPoseClick} text="Setup pose" className="animation-button lime darken-2" />
            </div>

            <div className="col m6 s12">
              <h4>Debug options</h4>
              <div className="left-align debug-options-wrapper">
                {debugOptions.map(option => {
                  return (
                    <CheckBox
                      checked={option.value}
                      label={option.label}
                      key={option.prop}
                      onChange={handleDebugOptionChange(option.prop)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </>
      ) : (<DropZone />)}



    </div>
  );
}

export default App;
