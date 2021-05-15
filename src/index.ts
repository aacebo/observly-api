import 'reflect-metadata';
import debug from 'debug';

import pkg from '../package.json';

import { router } from './api';

const log = debug('observly-api');
const port = process.env.PORT || 3000;

log(`   ____  __                         __
  / __ \\/ /_  ________  ______   __/ /_  __
 / / / / __ \\/ ___/ _ \\/ ___/ | / / / / / /
/ /_/ / /_/ (__  )  __/ /   | |/ / / /_/ /
\\____/_.___/____/\\___/_/    |___/_/\\__, /
                                  /____/`);

log(`version: ${pkg.version}`);

router().listen(port, () => {
	log(`listening on port ${port}...`);
});
