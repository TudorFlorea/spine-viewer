import React, {useState, useEffect} from 'react';
import Draggable from 'react-draggable';
import {v4 as uuid} from 'uuid';
import M from 'materialize-css';

import Button from '../Button';

const Timeline = props => {
    const {
        animations,
        handleTimelinePlay
    } = props;

    const [currentAnimation, setCurrentAnimation] = useState("");
    const [selectedAnimations, setSelectedAnimations] = useState([]);
    const [showTimeline, setShowTimeline] = useState(false);

    const onShowTimelineToggle = () => {
        setShowTimeline(!showTimeline);
    };

    const addAnimationToTimeline = () => {
        if(currentAnimation) {
            setSelectedAnimations([
                ...selectedAnimations,
                {
                    id: uuid(),
                    name: currentAnimation
                }
            ])
        }
    };

    const handleAnimationChange = e => {
        setCurrentAnimation(e.target.value)
    }

    const handleAnimationDelete = id => {
        return () => {
            setSelectedAnimations(
                selectedAnimations.filter(anim => anim.id !== id)
            );
        };
    };

    useEffect(() => {
        showTimeline && M.FormSelect.init(document.querySelectorAll('select'));
    }, [showTimeline]);

    return (
        <Draggable>
            <div className="card timeline">
                {showTimeline ? (
                    <>
                        <Button 
                            text="Hide timeline"
                            onClick={onShowTimelineToggle}
                        />
                        <div className="row">
                            <div className="input-field col m8 s12">
                                <select value={currentAnimation} onChange={handleAnimationChange}>
                                    <option value="" disabled>Choose an animation</option>
                                    {animations && animations.map(anim => {
                                        return <option key={anim} value={anim}>{anim}</option>
                                    })}
                                </select>
                            </div>
                            <Button 
                                text="Add"
                                onClick={addAnimationToTimeline}
                                className="col m4 s12 timeline--add-btn"
                            />
                        </div>
                        {selectedAnimations.length > 0 && 
                            <>
                                <ul className="collection">
                                    {selectedAnimations.map(anim => {
                                        return (
                                            <li key={anim.id} className="collection-item">
                                                <div>
                                                    {anim.name}
                                                    <a href="#!" className="secondary-content">
                                                        <i onClick={handleAnimationDelete(anim.id)} className="material-icons red-text text-darken-1">delete</i>
                                                    </a>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                                <Button 
                                    text="Play animations"
                                    onClick={handleTimelinePlay(selectedAnimations.map(anim => anim.name))}
                                />
                            </>
                        }
                    </>
                ) : (
                    <Button 
                        text="Show timeline"
                        onClick={onShowTimelineToggle}
                    />
                )}

            </div>
        </Draggable>
    )
    
};

export default Timeline;