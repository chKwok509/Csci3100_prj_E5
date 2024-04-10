class Queue {
    private queue: any[] = [];

    public push(item: any) {
        this.queue.push(item);
    }

    public pop() {
        return this.queue.shift();
    }

    public size() {
        return this.queue.length;
    }
}

const sendConfirmation = (player: any) => {
    // Your code here...
    player.emit('You have been matched with another player!');
    player.on('confirmation', ({response}: {response:boolean}) => {
        if (response) {
            console.log('Player accepted the match');
            return true;
        } else {
            console.log('Player declined the match');
            return false;
        }
    });
    return false;
}

const waitingPlayers = new Queue();

export default function handlePVPQueue(player: any) {
    waitingPlayers.push(player);

    if (waitingPlayers.size() >= 2) {
        const player1 = waitingPlayers.pop();
        const player2 = waitingPlayers.pop();
        // Send confirmation to player1
        if(sendConfirmation(player1) && sendConfirmation(player2)){
            console.log('Players have been matched');
        }
        // Connect player1 and player2 to the same socket server
        // Your code here...
        const room1 = 'room1'; // Generate a unique room name
        const room2 = 'room2'; // Generate a unique room name
        let numberofClients = 0;

        if(numberofClients < 2){
            player1.join(room1);
            numberofClients++;
            player2.join(room1);
            numberofClients++;
            player1.emit('message', 'Welcome to the game room!');
            player2.emit('message', 'Welcome to the game room!');
        }
        console.log('Players have joined the room');
    }
}