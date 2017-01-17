import { server } from 'universal-webpack'
import settings from '../../config/webpack-universal-settings'
// `configuration.context` and `configuration.output.path` are used
import configuration from '../../config/webpack.config'

server(configuration, settings)
