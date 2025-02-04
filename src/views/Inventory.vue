<template>
  <div class="game-container">
    <h1>Reaction Timer Game</h1>
    
    <!-- Waiting state: instructions to start the game -->
    <div v-if="state === 'waiting'" class="message">
      <p>Click the button to start!</p>
      <button @click="startGame">Start</button>
    </div>

    <!-- Ready state: screen turns red, and user must wait -->
    <div
      v-if="state === 'ready'"
      class="game-area red"
      @click="recordClick"
    >
      <p>Wait for green...</p>
    </div>

    <!-- Go state: screen turns green, user must click as soon as possible -->
    <div
      v-if="state === 'go'"
      class="game-area"
      @click="recordClick"
    >
      <p>Click now!</p>
    </div>

    <!-- Result state: show reaction time -->
    <div v-if="state === 'result'" class="message">
      <p>Your reaction time was: {{ reactionTime }} ms</p>
      <button @click="resetGame">Try Again</button>
    </div>

    <!-- Too soon state: user clicked before green -->
    <div v-if="state === 'tooSoon'" class="message">
      <p>You clicked too soon!</p>
      <button @click="resetGame">Try Again</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReactionGame",
  data() {
    return {
      // Possible states: 'waiting', 'ready', 'go', 'result', 'tooSoon'
      state: 'waiting',
      startTime: null, // Time when the green screen appears
      reactionTime: null,
      timeoutId: null, // For the random delay timer
    };
  },
  methods: {
    startGame() {
      // Set the game state to 'ready' (red screen) and start a random timer
      this.state = 'ready';
      // Random delay between 2000 and 5000 milliseconds (2-5 seconds)
      const delay = Math.floor(Math.random() * 3000) + 2000;
      this.timeoutId = setTimeout(() => {
        this.state = 'go';
        this.startTime = new Date().getTime();
      }, delay);
    },
    recordClick() {
      // If user clicks while in the "ready" state, it's too soon.
      if (this.state === 'ready') {
        clearTimeout(this.timeoutId);
        this.state = 'tooSoon';
      }
      // If the user clicks during the "go" state, record reaction time.
      else if (this.state === 'go') {
        const endTime = new Date().getTime();
        this.reactionTime = endTime - this.startTime;
        this.state = 'result';
      }
    },
    resetGame() {
      // Reset the game to the initial state.
      this.state = 'waiting';
      this.startTime = null;
      this.reactionTime = null;
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
    }
  }
};
</script>

<style scoped>
.game-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 2px solid #ccc;
  border-radius: 8px;
  text-align: center;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

h1 {
  margin-bottom: 1rem;
}

.message {
  margin: 1rem 0;
}

button {
  font-size: 1rem;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
}

button:hover {
  background-color: #0056b3;
}

.game-area {
  width: 200px;
  height: 200px;
  margin: 2rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.red {
  background-color: #ff4d4d;
  color: #fff;
}
.game-area:not(.red) {
  background-color: #4caf50;
  color: #fff;
}
</style>
