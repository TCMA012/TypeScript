//8. Asynchronous Programming, Concurrency
import EventEmitter from 'events'

class SafeEmitter<
    Events extends Record<PropertyKey, unknown[]>
> {
    private emitter = new EventEmitter
    emit<K extends keyof Events>(
        channel: K,
        ...data: Events[K]
    ) {
        return this.emitter.emit(channel, ...data)
    }
    on<K extends keyof Events>(
        channel: K,
        listener: (...data: Events[K]) => void
    ) {
        return this.emitter.on(channel, listener)
    }
}

// WorkerScript.ts
type Commands = {
    sendMessageToThread: [ThreadID, Message]
    createThread: [Participants]
    addUserToThread: [ThreadID, UserID]
    removeUserFromThread: [ThreadID, UserID]
}

type Events = {
    receivedMessage: [ThreadID, UserID, Message]
    createThread: [ThreadID, Participants]
    addedUserToThread: [ThreadID, UserID]
    removedUserFromThread: [ThreadID, UserID]
}

// listen for events coming from the main thread
let commandEmitter = new SafeEmitter<Commands>()

// Emit events back to the main thread
let eventEmitter = new SafeEmitter<Events>()

// Wrap incoming commands from the main thread
// using our typesafe event emitter
onmessage = command =>
    commandEmitter.emit(
        command.data.type,
        ...command.data.data
    )

// Listen for events issued by the worker, and send them to the main thread
eventEmitter.on('receivedMessage', data =>
    postMessage({type: 'receivedMessage', data})
)
eventEmitter.on('createThread', data =>
    postMessage({type: 'createThread', data})
)
// etc.

// Respond to a sendMessageToThread command from the main thread
commandEmitter.on('sendMessageToThread', (threadID, message) =>
    console.log(`OK, I will send a message to threadID ${threadID}`)
)

// Send an event back to the main thread
eventEmitter.emit('createThread', 123, [456, 789])

// MainThread.ts
/*
type Commands = {

}
*/

let commandEmitter = new SafeEmitter<Commands>()
let eventEmitter = new SafeEmitter<Events>()

let worker = new Worker('WorkerScript.ts')

/*
Listen for events coming from our worker, and 
reemit them using our typesafe event emitter
*/
worker.onmessage = event =>
    eventEmitter.emit(
        event.data.type,
        ...event.data.data
    )

// Listen for commands issued by this thread, and send them to our worker
commandEmitter.on('sendMessageToThread', data =>
    worker.postMessage({type: 'sendMessageToThread', data})
)

commandEmitter.on('createThread', data =>
    worker.postMessage({type: 'createThread', data})
)
// etc

// Do something when the worker tells us a new thread was created
eventEmitter.on('createThread', (threadID, participants) =>
    console.log('Created a new chat thread!', threadID, participants)
)

// Send a command to our worker
eventEmitter.emit('createThread', [123, 456])