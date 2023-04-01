const { spawn } = require('child_process');

// Spawn a shell process
const shell = spawn('bash');

// Listen for data events on the shell process's standard output and error streams
shell.stdout.on('data', (data) => {
    console.log(`Shell output: ${data}`);
    if(data.toString().includes('>')) {
        shell.stdin.write('what is your favourite colour?\n');
    }
});

shell.stderr.on('data', (data) => {
    console.error(`Shell error: ${data}`);
});

// Listen for the shell process to exit
shell.on('exit', (code, signal) => {
    console.log(`Shell process exited with code ${code} and signal ${signal}`);
});

// Send a command to the shell process's standard input
shell.stdin.write('/Users/ghost/Documents/projects/offlinegpt/gpt4all/gpt4all/chat/gpt4all-lora-quantized-OSX-m1 -m /Users/ghost/Documents/projects/offlinegpt/gpt4all/gpt4all/chat/gpt4all-lora-quantized.bin\n');
shell.stdin.write('echo hello\n');
