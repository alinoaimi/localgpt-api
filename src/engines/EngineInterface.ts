import {EventEmitter} from "events";

const { spawn } = require('child_process');

export class EngineInterface {
    name: string;
    uniqueTempId: string;
    shell: any;
    messagesQueue: string[];
    state: string; // 'booting', 'online', 'busy'
    public updatesEmitter: EventEmitter;

    modelPath: string;

    currentComputerMessage: string;
    identificationEmits = {
        'start_typing_message': '{START_TYPING}',
        'end_typing_message': '{END_TYPING}',
    };

    constructor(name: string, modelPath: string) {
        this.name = name;
        this.modelPath = modelPath;

        this.uniqueTempId = 'hello'+Date.now(); // for testing and debugging purposes

        this.updatesEmitter = new EventEmitter();

        this.state = 'booting';
        this.loadEngine();

        this.messagesQueue = [];

    }

    async loadEngine() {
        this.state = 'booting';

        this.shell = spawn('bash');
        this.shell.stdin.write(`/Users/ghost/Documents/projects/offlinegpt/gpt4all/gpt4all/chat/gpt4all-lora-quantized-OSX-m1 -m '${this.modelPath}'\n`);
        this.updatesEmitter.emit('state', 'booting_engine');

        this.shell.stdout.on('data', (data) => {
            // console.log(`Shell data: ${data}`);
            this.updatesEmitter.emit('typing', this.currentComputerMessage);
            if(data.toString().includes('>')) {

                if(this.state == 'busy') {
                    this.updatesEmitter.emit('state', this.identificationEmits.end_typing_message);
                }
                console.log(`final message: ${this.currentComputerMessage}`);
                this.updatesEmitter.emit('final_message', this.currentComputerMessage);
                this.currentComputerMessage = '';
                this.state = 'online';
                this.updatesEmitter.emit('state', 'engine_booted');

                // shell.stdin.write('what is your favourite colour?\n');
                this.processQueue();
            } else {
                this.currentComputerMessage += data;
            }
        });

        this.shell.stderr.on('data', (data) => {
            console.error(`Shell stderr: ${data}`);
        });

    }

    async processQueue() {
        if(this.messagesQueue.length > 0) {
            this.state = 'busy';
            this.updatesEmitter.emit('state', this.identificationEmits.start_typing_message);
            this.currentComputerMessage = '';
            this.shell.stdin.write(this.messagesQueue[0]+'\n');
            this.messagesQueue.splice(0, 1);
            this.processQueue();
        }
    }

    async queueMessage(messageText) {
        this.messagesQueue.push(messageText);
        if(this.state == 'online') {
            this.processQueue();
        }
    }


}

