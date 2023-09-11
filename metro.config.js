const { getDefaultConfig } = require("@expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const defaultConfig = getDefaultConfig(__dirname); // eslint-disable-line no-undef
defaultConfig.resolver.sourceExts.push("cjs");

module.exports = defaultConfig;
