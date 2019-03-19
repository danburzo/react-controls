import React from 'react';

if (process.env.NODE_ENV !== 'production') {
	// const { whyDidYouUpdate } = require('why-did-you-update');
	// whyDidYouUpdate(React);
}

import { configure } from '@storybook/react';

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.js$/);
function loadStories() {
	req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
