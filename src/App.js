import React, {useState, useEffect} from 'react';
import M from 'materialize-css';

import DropZone from './components/DropZone';
import Button from './components/Button';
import TextInput from './components/TextInput';
import ColorPicker from './components/ColorPicker';
import SpineData from './components/SpineData';
import DebugOptions from './components/DebugOptions';
import Timeline from './components/Timeline';
import Mixins from './components/Mixins';

import {
  onSpineCreated,
  onCoordsChange,
  dispatchStartAnimation,
  dispatchSpineScaleChange,
  dispatchDebugOptionChange,
  dispatchCoordsChange,
  dispatchSetupPose,
  dispatchFilesLoaded,
  dispatchDestroyPixiApp,
  dispatchTimelinePlay,
  dispatchSkinChange,
  dispatchSetMixin,
  onSpineScaleChange,
  dispatchScaleRangeChange
} from './services/events';
import {getDemoSpine} from "./services/spineProvider";
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
  const [scaleRange, setScaleRange] = useState(canvasOptions.defaultScaleRange);
  const [spineLoaded, setSpineLoaded] = useState(false);
  const [spineData, setSpineData] = useState(null);

  useEffect(() => {
    onSpineCreated((data) => {
      const parsedSpineData = {};
      parsedSpineData.animations = data.animations.map(anim => anim.name);
      parsedSpineData.skins = data.skins.map(skin => skin.name);
      parsedSpineData.slots = data.slots.map(slot => slot.name);
      parsedSpineData.bones = data.bones.map(bone => bone.name);

      setSpineData(parsedSpineData);

    });

    onCoordsChange((c) => {
      setCoords(c);
    });

    onSpineScaleChange(val => {
      setSpineScale(val);
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

  useEffect(() => {
    if(spineData) {
      setSpineLoaded(true);
    } else {
      setSpineLoaded(false);
    }
  }, [spineData]);

  const handleAnimationClick = (anim) => {
    return () => {
      dispatchStartAnimation(anim, loopAnimations);
    }
  };

  const handleSetMixinClick = mixin => {
    dispatchSetMixin(mixin);
    M.toast({html: "Mixin set"});
  }

  const handleSkinClick = (skin) => {
    return () => {
      dispatchSkinChange(skin);
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
    }
  }

  const handleScaleRangeChange = (scale) => {
    return e => {
      const newScale = {
        ...scaleRange,
        [scale]: e.target.value
      }
      setScaleRange(newScale);
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

  const handleTimelinePlay = (timeline) => {
    return () => {
      dispatchTimelinePlay(timeline);
    }
  }

  const handleColorChange = color => {
    console.log(color);
    setCanvasBackground(color.hex);
  }


  const handleFilesLoaded = files => {
    setFiles(files);
  }

  const handleDemoSpineLoad = () => {
    getDemoSpine().then(files => {
      handleFilesLoaded(files);
    });
  };

  const handleDestroyPixiApp = () => {
    dispatchDestroyPixiApp();
    // setSpineLoaded(false);
    setSpineData(null);
  }
  
  const handleFilesLoadError = message => {
    M.toast({html: message, classes: "red darken-1 text-white"});
  };

  useEffect(() => {
    dispatchScaleRangeChange(scaleRange);
  }, [scaleRange]);

  useEffect(() => {
    dispatchCoordsChange(coords);
  }, [coords]);

  return (
    <div className="App container center-align">

      {spineLoaded ? (
        <>
          <SpineData 
            loopAnimations={loopAnimations}
            spineData={spineData}
            handleLoopAnimationsChange={handleLoopAnimationsChange}
            handleAnimationClick={handleAnimationClick}
            handleSkinClick={handleSkinClick}
            handleSetupPoseClick={handleSetupPoseClick}
          />

          <DebugOptions 
            debugSpine={debugSpine}
            handleDebugOptionChange={handleDebugOptionChange}
            spineScale={spineScale}
            handleScaleChange={handleScaleChange}
            coords={coords}
            handleCoordChange={handleCoordChange}
            scaleRange={scaleRange}
          />
          <Timeline 
            animations={spineData.animations}
            handleTimelinePlay={handleTimelinePlay}
          />
          <Mixins
            animations={spineData.animations}
            onAddMixin={handleSetMixinClick}
          />
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
          <Button 
            onClick={handleDemoSpineLoad}
            text="Load Spineboy pro demo"
            className="App--button"
          />
          <h4 className="App--heading">Or load a spine export (png, json and atlas files) in the box below</h4>
          <DropZone 
            onFilesLoaded={handleFilesLoaded}
            onError={handleFilesLoadError}
            />
          <h4 className="App--heading">Canvas dimensions</h4>
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
          <h4 className="App--heading">Scale range</h4>
          <div className="row">
            <div className="col s12 m6">
              <TextInput
                label="Min scale"
                value={scaleRange.min}
                onChange={handleScaleRangeChange("min")}
              />
            </div>
            <div className="col s12 m6">
              <TextInput
                label="Max scale"
                value={scaleRange.max}
                onChange={handleScaleRangeChange("max")}
              />
            </div>
          </div>
          <h4 className="App--heading">Canvas background</h4>
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
