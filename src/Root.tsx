import React from 'react';
import {Composition} from 'remotion';
import {Reel, reelSchemaDefaults, calcDuration, ReelProps} from './Reel';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="Reel"
    component={Reel}
    width={1080}
    height={1920}
    fps={30}
    durationInFrames={calcDuration(reelSchemaDefaults)}
    defaultProps={reelSchemaDefaults}
    calculateMetadata={({props}: {props: ReelProps}) => ({durationInFrames: calcDuration(props)})}
  />
);
