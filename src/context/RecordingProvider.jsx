import { useState } from 'react';
import { RecordingContext } from './RecordingContext';

export const RecordingProvider = ({ children }) => {
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  const showOverlay = () => setOverlayVisible(true);
  const hideOverlay = () => setOverlayVisible(false);

  return (
    <RecordingContext.Provider value={{ isOverlayVisible, showOverlay, hideOverlay }}>
      {children}
    </RecordingContext.Provider>
  );
};