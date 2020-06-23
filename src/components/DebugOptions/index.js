import React from 'react';
import Draggable from 'react-draggable';
import CheckBox from '../CheckBox';
import TextInput from '../TextInput';

const DebugOptions = props => {
    const {
        debugSpine,
        handleDebugOptionChange,
        spineScale,
        handleScaleChange,
        coords,
        handleCoordChange,
        scaleRange
    } = props;

    return (
        <Draggable cancel=".range-field, .x-coord, .y-coord">
            <div className="debug card">
                <h4 className="debug--heading">Debug options</h4>
                <div className="debug--options-wrapper left-align">
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

                <h4 className="debug--heading">Spine scale {spineScale}</h4>
                <p className="range-field">
                    <input type="range" id="scale-range" value={spineScale} min={scaleRange.min} max={scaleRange.max} step="0.1" onChange={handleScaleChange} />
                </p>

                <h4 className="debug--heading">Spine coordinates</h4>
                <div>
                    <div>
                    <TextInput
                        label="X coord"
                        wrapperClassName="x-coord"
                        value={parseFloat(coords.x).toFixed(2)}
                        onChange={handleCoordChange("x")}
                    />
                    </div>
                    <div>
                    <TextInput
                        label="Y coord"
                        wrapperClassName="y-coord"
                        value={parseFloat(coords.y).toFixed(2)}
                        onChange={handleCoordChange("y")}
                    />
                    </div>
                </div>
            </div>
        </Draggable>
    );
};

export default DebugOptions;