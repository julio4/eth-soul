/* eslint-env node */
// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {}

// eslint-disable-next-line
const withTM = require('next-transpile-modules')(['@ethathon/contracts', 'react-apple-emojis']) // TODO

module.exports = withTM(nextConfig)
