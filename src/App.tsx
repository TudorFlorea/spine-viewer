import { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import './App.css';
import ActionBar from './components/ActionBar';
import Overlay from './components/base/Overlay';
import Spinner from './components/base/Spinner';
import Header from './components/Header';
import SpineLoader from './components/SpineLoader';
import { useSettingsStore, useSpineViewerStore } from "./store";
import events from './events';
import { SpineData } from './interfaces';
import "react-toastify/dist/ReactToastify.css";
import Reset from './components/Reset';
import { spineEventToast } from './config/toastsConfig';

function App() {

  const { filesLoading, loadedFiles, setMultiple } = useSpineViewerStore(store => ({
    filesLoading: store.filesLoading,
    loadedFiles: store.loadedFiles,
    setMultiple: store.setMultiple
  }));

  const canvasBackground = useSettingsStore(store => store.canvasBackground);
  const hasLoadedFiles = loadedFiles.length > 0;

  useEffect(() => {
    if (hasLoadedFiles) {
      import("./services/PixiService").then(module => {
        const PixiService = module.default;
        const service = new PixiService();
        service.init();
        events.dispatchers.filesLoaded({
          files: loadedFiles,
          canvasBackground: canvasBackground
        });
      });
      document.getElementById("canvas-wrapper")!.style.display = "block";
    }
  }, [loadedFiles]);

  useEffect(() => {
    events.dispatchers.setCanvasBackground(canvasBackground);
  }, [canvasBackground]);

  useEffect(() => {
    events.handlers.onSpineCreated((spineData: SpineData) => {
      setMultiple({
        animations: spineData.animations,
        skins: spineData.skins
      });
    });

    events.handlers.onSpineEvent((spineEventName: string) => {
      toast(spineEventName, spineEventToast);
    });
  }, []);

  return (
    <div className="app">
      <Header />
      <div id="canvas-wrapper"></div>
      {filesLoading ? (
        <Overlay>
          <Spinner />
        </Overlay>
      ) : (
        <>
          {hasLoadedFiles ? (
            <>
              <ActionBar />
              <Reset />
            </>

          ) : (
            <SpineLoader />
          )}
        </>

      )}

      <ToastContainer />
    </div>
  )
}

export default App
