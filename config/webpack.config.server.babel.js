import { serverConfiguration } from 'universal-webpack'
import settings from './webpack-universal-settings'
import configuration from './webpack.config'

const __SERVER__ = true
export default serverConfiguration(configuration, settings)
