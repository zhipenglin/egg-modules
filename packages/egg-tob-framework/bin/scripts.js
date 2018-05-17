#!/usr/bin/env node
const spawn = require('cross-spawn');
const args = process.argv.slice(2);
const path = require('path');
const moduleName = process.env.NODE_TARGET || '';

const scriptIndex = args.findIndex(
    x => x === 'build' || x === 'start'
);
const script = scriptIndex === -1 ? args[0] : args[scriptIndex];
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];

switch (script) {
    case 'build':
        spawn.sync('cross-env', ['NODE_ENV=production', 'node', require.resolve('../scripts/build')], {
            stdio: 'inherit',
            cwd: process.cwd()
        });
        break;
    case 'start':
        spawn('webpack-dev-server', ['--config', path.join(__dirname, '../webpack.config.js')], {
            stdio: 'inherit',
            cwd: process.cwd()
        });
        spawn.sync('cross-env', [`NODE_TARGET=${moduleName}`, 'egg-bin', 'dev'], {stdio: 'inherit', cwd: process.cwd()});
        break;
    default:
        console.log('Unknown script "' + script + '".');
        console.log('Perhaps you need to update egg-tob-framework?');
        break;
}
