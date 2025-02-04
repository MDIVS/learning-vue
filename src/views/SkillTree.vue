<template>
  <div class="bird-sort-game">
    <h1>Bird Sorting Game</h1>
    <!-- Game win message -->
    <p v-if="gameCompleted" class="win-message">
      Congratulations! All branches are sorted by color!
    </p>
    <div class="branches">
      <div
        class="branch"
        v-for="(branch, branchIndex) in branches"
        :key="branchIndex"
        @dragover.prevent
        @drop="handleDrop($event, branchIndex)"
      >
        <div class="branch-title">
          Branch {{ branchIndex + 1 }} ({{ branch.length }}/5)
        </div>
        <div class="birds">
          <div
            class="bird"
            v-for="(bird, birdIndex) in branch"
            :key="bird.id"
            draggable="true"
            @dragstart="handleDragStart($event, branchIndex, birdIndex)"
          >
            {{ getBirdEmoji(bird.color) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BirdSortGame",
  data() {
    return {
      // 6 branches; each branch is an array of bird objects.
      branches: [[], [], [], [], [], []],
      // For drag & drop: holds info on the currently dragged bird.
      draggedBird: null, // { branchIndex, birdIndex }
      // The colors available in the game.
      colors: ["red", "green", "blue", "yellow", "brown"],
    };
  },
  computed: {
    // The game is complete when every branch is either empty or contains birds all of the same color.
    gameCompleted() {
      return this.branches.every(branch => {
        if (branch.length === 0) return true;
        const firstColor = branch[0].color;
        return branch.every(bird => bird.color === firstColor);
      });
    },
  },
  created() {
    // Create 25 bird objects (5 of each color) with unique IDs.
    const birds = [];
    let idCounter = 1;
    this.colors.forEach(color => {
      for (let i = 0; i < 5; i++) {
        birds.push({ id: idCounter++, color });
      }
    });

    // Shuffle the birds array.
    for (let i = birds.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [birds[i], birds[j]] = [birds[j], birds[i]];
    }

    // Distribute birds into the 6 branches.
    // Each branch has a maximum capacity of 5. Since 6 * 5 = 30 and we have 25 birds,
    // all birds can be placed without exceeding branch capacity.
    let branchIndex = 0;
    birds.forEach(bird => {
      // Find the next branch that is not full.
      while (this.branches[branchIndex].length >= 5) {
        branchIndex = (branchIndex + 1) % this.branches.length;
      }
      this.branches[branchIndex].push(bird);
      branchIndex = (branchIndex + 1) % this.branches.length;
    });
  },
  methods: {
    /**
     * Returns an emoji representing the bird color.
     */
    getBirdEmoji(color) {
      const mapping = {
        red: "🔴",
        green: "🟢",
        blue: "🔵",
        yellow: "🟡",
        brown: "🟤",
      };
      return mapping[color] || "🐦";
    },
    /**
     * Called when a bird drag is started.
     * Records the source branch index and the bird's index.
     */
    handleDragStart(event, branchIndex, birdIndex) {
      this.draggedBird = { branchIndex, birdIndex };
      event.dataTransfer.effectAllowed = "move";
      // (Optional) You can set data here if needed.
      // event.dataTransfer.setData("text/plain", JSON.stringify({ branchIndex, birdIndex }));
    },
    /**
     * Called when a bird is dropped onto a branch.
     * Checks if the target branch has capacity before moving the bird.
     */
    handleDrop(event, targetBranchIndex) {
      if (!this.draggedBird) return;
      // Prevent dropping into a branch that is at capacity.
      if (this.branches[targetBranchIndex].length >= 5) {
        // Optionally, provide feedback (alert or visual) that the branch is full.
        return;
      }
      const { branchIndex: sourceIndex, birdIndex } = this.draggedBird;
      // Remove the bird from its source branch.
      const [bird] = this.branches[sourceIndex].splice(birdIndex, 1);
      // Add the bird to the target branch.
      this.branches[targetBranchIndex].push(bird);
      this.draggedBird = null;
    },
  },
};
</script>

<style scoped>
.bird-sort-game {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  font-family: Arial, sans-serif;
}
.branches {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}
.branch {
  border: 2px dashed #ccc;
  border-radius: 8px;
  width: 150px;
  min-height: 200px;
  padding: 0.5rem;
  background-color: #f9f9f9;
}
.branch-title {
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.birds {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
}
.bird {
  font-size: 2rem;
  cursor: grab;
  user-select: none;
}
.win-message {
  color: green;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
</style>
