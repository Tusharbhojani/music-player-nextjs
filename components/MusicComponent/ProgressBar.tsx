import React from "react";
import { progressProps } from "../MusicPlayer";

export default function ProgressBar({ progress }: { progress: progressProps }) {
  const progress_in_percentage =
    progress.totalDuration == 0
      ? 0
      : (progress.seek / progress.totalDuration) * 100;
  return (
    <div className="flex items-center gap-3 mt-4">
      <p className="text-xs w-8">{progress.seek.toFixed(2)}</p>
      <div className="flex items-center">
        <input
          type="range"
          className="w-full"
          readOnly
          min="0"
          max="100"
          value={progress_in_percentage}
        />
      </div>
      <p className="text-xs w-8">{progress.totalDuration.toFixed(2)}</p>
    </div>
  );
}
