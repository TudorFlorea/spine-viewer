import { useState, useMemo } from "react";
import Select, { SingleValue } from 'react-select';
import events from "../../../events";
import { useSpineViewerStore } from "../../../store";
import Button from "../../base/Button";
import { uuid } from "../../../utils/numberUtils";
import "./Timeline.css";
import { TimelineEntry } from "../../../interfaces";


interface SelectOption {
    label: string;
    value: string;
}

const Timeline = () => {

    const [selectedAnimation, setSelectedAnimation] = useState<string>("");

    const { animations, timeline, setTimeline } = useSpineViewerStore(store => {
        return {
            animations: store.animations,
            timeline: store.timeline,
            setTimeline: store.setTimeline
        }
    });

    const selectOptions: SelectOption[] = useMemo(() => {
        return animations.map(animation => {
            return {
                label: animation,
                value: animation
            }
        });
    }, [animations]);

    const handleAnimationChange = (selectedOption: SingleValue<SelectOption>) => {
        if (selectedOption) {
            setSelectedAnimation(selectedOption.value);
        }
    };

    const handleAddToTimeline = () => {
        const newEntry = {
            id: uuid(),
            animation: selectedAnimation
        }
        setTimeline([...timeline, newEntry]);
    };

    const handleRemoveFromTimeline = (id: string) => {
        return () => {
            const newTimeline = timeline.filter(entry => entry.id !== id);

            setTimeline(newTimeline);
        }
    }

    const handlePlayTimeline = () => {
        const pixiTimeline = timeline.map(entry => entry.animation);

        events.dispatchers.timelinePlay(pixiTimeline);
    }


    return (
        <div className="action-panel-content">
            <h2 className="action-panel-heading">Timeline</h2>



            <div className="timeline-add">
                <Select
                    onChange={handleAnimationChange}
                    options={selectOptions}
                />

                <Button
                    className="timeline-add__button"
                    label="Add to timeline"
                    onClick={handleAddToTimeline}
                />
            </div>

            {timeline.length > 0 && (
                <>
                    <p className="timeline-heading">Timeline animations</p>
                    <div className="timeline-list">
                        {timeline.map(entry => {
                            return (
                                <div key={entry.id} className="timeline-list-item">
                                    <span className="timeline-list__text">{entry.animation}</span>
                                    <Button
                                        className="timeline-list__delete-button"
                                        label="X"
                                        onClick={handleRemoveFromTimeline(entry.id)}
                                    />
                                </div>
                            );
                        })}

                    </div>

                    <div className="timeline-play">
                        <Button
                            className="timeline-play__button"
                            label="Play timeline"
                            onClick={handlePlayTimeline}
                        />
                    </div>
                </>
            )}

        </div>
    )
}

export default Timeline;