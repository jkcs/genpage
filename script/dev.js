const spawn = require('cross-spawn')

// let target = process.argv[2]

spawn('lerna', ['run', 'dev', '--scope', 'aliment', '--stream'], { stdio: 'inherit' })
