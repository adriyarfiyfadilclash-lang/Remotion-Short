import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
// Server GitHub tidak punya kartu grafis: pakai renderer WebGL perangkat lunak untuk adegan 3D
Config.setChromiumOpenGlRenderer("swangle");
Config.setOverwriteOutput(true);
