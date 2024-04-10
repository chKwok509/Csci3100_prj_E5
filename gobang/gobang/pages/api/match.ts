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
        } else {
            console.log('Player declined the match');
        }
    });
}

const waitingPlayers = new Queue();

export default function handlePVPQueue(player: any) {
    waitingPlayers.push(player);

    if (waitingPlayers.size() >= 2) {
        const player1 = waitingPlayers.pop();
        const player2 = waitingPlayers.pop();
        // Send confirmation to player1
        sendConfirmation(player1);

        // Send confirmation to player2
        sendConfirmation(player2);

        // Connect player1 and player2 to the same socket server
        // Your code here...
        const room = `${player1.id}-${player2.id}`;
    }
}