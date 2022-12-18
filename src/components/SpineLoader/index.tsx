import { toast } from "react-toastify";
import { errorToast } from "../../config/toastsConfig";
import { FileEntry } from "../../interfaces";
import SpineProvider from "../../providers/SpineProvider";
import { useSpineViewerStore } from "../../store";
import DropZone from "./DropZone";
import LoadDefaultSpinButton from "./LoadDefaultSpinButton";
import "./SpineLoader.css";
import SpineLoaderInfoText from "./SpineLoaderInfoText";


const SpineLoader = () => {

    const { setLoadedFiles, setFilesLoading } = useSpineViewerStore(state => {
        return {
            setLoadedFiles: state.setLoadedFiles,
            setFilesLoading: state.setFilesLoading,
            setAnimations: state.setAnimations
        }
    });

    const onFilesLoaded = (files: FileEntry[]) => {
        console.log(files)
        setLoadedFiles(files);
        setFilesLoading(false);
    };

    const onStartLoadingFiles = () => {
        setFilesLoading(true);
    }

    const onLoadError = (message: string) => {
        console.log(message);
        toast(message, errorToast);
        setFilesLoading(false);
        setLoadedFiles([]);
    }

    const handleDefaultSpineLoad = () => {
        setFilesLoading(true);
        SpineProvider.getDemoSpine().then((fileEntries) => {
            setLoadedFiles(fileEntries as FileEntry[]);
            setFilesLoading(false);
        });
    }

    return (
        <div className="spine-loader">
            <LoadDefaultSpinButton onClick={handleDefaultSpineLoad} />
            <SpineLoaderInfoText text="Or load a spine export (png, json and atlas files) in the box below" />
            <DropZone onFilesLoaded={onFilesLoaded} onError={onLoadError} onStartLoadingFiles={onStartLoadingFiles} />
        </div>
    )
};

export default SpineLoader;