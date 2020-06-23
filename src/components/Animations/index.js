import React from 'react';
import Draggable from 'react-draggable';
import CheckBox from '../CheckBox';
import Button from '../Button';

const Animations = props => {

    const {
        animations,
        loopAnimations,
        handleLoopAnimationsChange,
        handleAnimationClick,
        handleSetupPoseClick
    } = props;
    

    return (
        <Draggable>
            <div className="animations card">
                <div className="card-content">
                <h4 className="animations--heading">Animations</h4>
                    <CheckBox 
                        checked={loopAnimations}
                        onChange={handleLoopAnimationsChange}
                        label="Loop animations"
                        
                    />
                    {animations.map(anim => {
                        return <Button key={anim} onClick={handleAnimationClick(anim)} text={anim} className="animations--button" />
                    })}

                    <Button onClick={handleSetupPoseClick} text="Setup pose" className="animations--button lime darken-2" />
                </div>

            </div>
        </Draggable>

    );
};

export default Animations;