import { clientConfiguration } from 'universal-webpack'
import settings from './webpack-universal-settings'
import configuration from './webpack.config'

const __SERVER__ = false
export default clientConfiguration(configuration, settings)
