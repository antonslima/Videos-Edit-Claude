import {Config} from '@remotion/cli/config';
import fs from 'fs';

Config.setVideoImageFormat('jpeg');

// Na nuvem do Claude Code já existe um Chromium instalado: use-o.
const chromiumNuvem = '/opt/pw-browsers/chromium';
if (fs.existsSync(chromiumNuvem)) {
  Config.setBrowserExecutable(chromiumNuvem);
}
