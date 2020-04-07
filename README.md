# input-proxy
A tool to relay keyboard input through a basic web API -- provide a simple json mapping file, and key input can be configure through endpoints to the local machine.

## map.json
Configuration is done through a very basic json file, `map.json`. Each key is used as the name of the route, and the resulting key that is pressed is the value.

This service uses RobotJS -- https://github.com/octalmage/robotjs -- and so the keys used map to RobotJS configuration.
A list of available keys can be found here: https://robotjs.io/docs/syntax#keys
