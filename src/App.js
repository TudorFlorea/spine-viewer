import React, {useState, useEffect} from 'react';
import M from 'materialize-css';

import DropZone from './components/DropZone';
import Button from './components/Button';
import CheckBox from './components/CheckBox';
import TextInput from './components/TextInput';
import ColorPicker from './components/ColorPicker';
import {
  onSpineCreated,
  onCoordsChange,
  dispatchStartAnimation,
  dispatchSpineScaleChange,
  dispatchDebugOptionChange,
  dispatchCoordsChange,
  dispatchSetupPose,
  dispatchFilesLoaded,
  dispatchDestroyPixiApp
} from './services/events';
import debugOptions from './config/debugOptions';
import canvasOptions from './config/canvasOptions';

function App() {

  const [files, setFiles] = useState(null);
  const [canvasBackground, setCanvasBackground] = useState(canvasOptions.canvasBackground);
  const [dimensions, setDimmensions] = useState(canvasOptions.canvasDimensions);
  const [coords, setCoords] = useState(canvasOptions.defaultSpineCoords);
  const [debugSpine, setDebugSpine] = useState(debugOptions);
  const [loopAnimations, setLoopAnimations] = useState(true);
  const [spineScale, setSpineScale] = useState(1);
  const [spineLoaded, setSpineLoaded] = useState(false);
  const [animations, setAnimations] = useState([]);

  useEffect(() => {
    onSpineCreated((data) => {
        setAnimations(data.animations.map(anim => anim.name));
        setSpineLoaded(true);
    });

    onCoordsChange((c) => {
      setCoords(c);
    });

    M.updateTextFields();
    M.Range.init(document.getElementById("scale-range"));
  }, []);

  useEffect(() => {
    if(files) {
      dispatchFilesLoaded({
        files: files,
        width: dimensions.width,
        height: dimensions.height,
        background: canvasBackground
      });
      setFiles(null);
    }
  }, [files, dimensions, canvasBackground]);


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

      setDebugSpine(debugSpine.map(optObj => {
        if(optObj.prop === option) {
          return {
            ...optObj,
            value: e.target.checked
          }
        } else {
          return optObj;
        }
      }));
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

  const handleDimensionChange = (dimension) => {
    return e => {
      const newDimensions = {
        ...dimensions,
        [dimension]: e.target.value
      }
      setDimmensions(newDimensions);
    }
  }

  const handleColorChange = color => {
    console.log(color);
    setCanvasBackground(color.hex);
  }


  const handleFilesLoaded = files => {
    setFiles(files);
  }

  const handleDestroyPixiApp = () => {
    dispatchDestroyPixiApp();
    setSpineLoaded(false);
    setAnimations([]);
  }

  return (
    <div className="App container center-align">

      {spineLoaded ? (
        <>
          <h4>Spine scale {spineScale}</h4>
          <p className="range-field">
            <input type="range" id="scale-range" value={spineScale} min="0.2" max="2" step="0.1" onChange={handleScaleChange} />
          </p>

          <h4>Spine coordinates</h4>
          <div className="row">
            <div className="col s12 m6">
              <TextInput
                label="X coord"
                wrapperClassName="x-coord"
                value={parseFloat(coords.x).toFixed(2)}
                onChange={handleCoordChange("x")}
              />
            </div>
            <div className="col s12 m6">
              <TextInput
                label="Y coord"
                wrapperClassName="y-coord"
                value={parseFloat(coords.y).toFixed(2)}
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
                {debugSpine.map(option => {
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
          <div className="row">
              <div className="col s12">
                  <Button 
                    text="Load new spine"
                    onClick={handleDestroyPixiApp}
                    className="btn-large red darken-1"
                  />
              </div>
          </div>
        </>
      ) : (
        <>
          <DropZone 
            onFilesLoaded={handleFilesLoaded}
            
            />
          <h4>Canvas dimensions</h4>
          <div className="row">
            <div className="col s12 m6">
              <TextInput
                label="Canvas width"
                wrapperClassName="x-coord"
                value={dimensions.width}
                onChange={handleDimensionChange("width")}
              />
            </div>
            <div className="col s12 m6">
              <TextInput
                label="Canvas height"
                wrapperClassName="y-coord"
                value={dimensions.height}
                onChange={handleDimensionChange("height")}
              />
            </div>
          </div>
          <h4>Canvas background</h4>
          <ColorPicker 
            handleColorChange={handleColorChange}
            color={canvasBackground}
          />
        </>
      
      )}



    </div>
  );
}

export default App;
