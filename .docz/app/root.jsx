import React from 'react'
import { hot } from 'react-hot-loader'
import Theme from 'docz-theme-default'

import config from './config.json'
import entries from './entries.json'

const Root = ({ imports }) => (
  <Theme imports={imports} config={config} entries={entries} />
)

export default hot(module)(Root)
