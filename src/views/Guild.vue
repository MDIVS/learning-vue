<template>
  <div class="inventory-game">
    <h1>Inventory Game</h1>
    
    <div class="controls">
      <button @click="addItem('common')">Add Common Item</button>
      <!-- Show combine buttons if there are at least 4 items of the given type -->
      <button v-if="countItems('common') >= 4" @click="combineItems('common')">
        Combine 4 Common into 1 Rare
      </button>
      <button v-if="countItems('rare') >= 4" @click="combineItems('rare')">
        Combine 4 Rare into 1 Legendary
      </button>
    </div>
    
    <div class="inventory-grid">
      <div 
        class="slot" 
        v-for="(item, index) in inventory" 
        :key="index"
        @dragover.prevent
        @drop="handleDrop(index)"
      >
        <!-- If there is an item in the slot, render it as draggable -->
        <div v-if="item"
          class="item"
          draggable="true"
          @dragstart="handleDragStart(index, $event)"
        >
          {{ getIcon(item.type) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Cookie } from '@/helpers/cookie';

export default {
  name: 'InventoryGame',
  data() {
    return {
      // 16 inventory slots (initially empty)
      inventory: Cookie.get("inventory") === null ? Array(64).fill(null) : JSON.parse(Cookie.get("inventory")),
      draggedIndex: null,
      nextId: 1 // used for generating unique IDs for items
    };
  },
  methods: {
    /**
     * Returns an emoji based on the item type.
     */
    getIcon(type) {
      if (type === 'common') return '🟤';
      if (type === 'rare') return '🔵';
      if (type === 'legendary') return '🟡';
      return '';
    },

    /**
     * Generates a unique ID for each item.
     */
    generateId() {
      return this.nextId++;
    },

    /**
     * Adds an item of the given type to the first available slot.
     */
    addItem(type) {
      const index = this.inventory.findIndex(slot => slot === null);
      if (index !== -1) {
        this.inventory[index] = { id: this.generateId(), type };
        Cookie.put("inventory", JSON.stringify(this.inventory));
      } else {
        alert('No empty slots available!');
      }
    },

    /**
     * Handles the start of dragging an item.
     */
    handleDragStart(index, event) {
      this.draggedIndex = index;
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', index);
    },

    /**
     * Handles dropping an item into a slot.
     * This implementation swaps the dragged item with the target slot.
     */
    handleDrop(targetIndex) {
      if (this.draggedIndex === null || this.draggedIndex === targetIndex) {
        return;
      }
      const temp = this.inventory[targetIndex];
      this.inventory[targetIndex] = this.inventory[this.draggedIndex];
      this.inventory[this.draggedIndex] = temp;
      this.draggedIndex = null;
      Cookie.put("inventory", JSON.stringify(this.inventory));
    },

    /**
     * Counts how many items of the specified type exist in the inventory.
     */
    countItems(type) {
      return this.inventory.filter(item => item && item.type === type).length;
    },

    /**
     * Combines four items of a given type into one upgraded item.
     * - 4 common items become 1 rare.
     * - 4 rare items become 1 legendary.
     */
    combineItems(type) {
      if (this.countItems(type) < 4) {
        alert(`Not enough ${type} items to combine.`);
        return;
      }
      let newType;
      if (type === 'common') newType = 'rare';
      else if (type === 'rare') newType = 'legendary';
      else return; // no further combination for legendary

      // Remove 4 items of the specified type.
      let removed = 0;
      for (let i = 0; i < this.inventory.length && removed < 4; i++) {
        if (this.inventory[i] && this.inventory[i].type === type) {
          this.inventory[i] = null;
          removed++;
        }
      }

      // Add the upgraded item into the first available empty slot.
      const emptyIndex = this.inventory.findIndex(slot => slot === null);
      if (emptyIndex !== -1) {
        this.inventory[emptyIndex] = { id: this.generateId(), type: newType };
      } else {
        alert('No empty slot available for the upgraded item!');
        window.location.reload();
        return;
      }
      Cookie.put("inventory", JSON.stringify(this.inventory));
    }
  }
};
</script>

<style scoped>
.inventory-game {
  max-width: 600px;
  margin: 2rem auto;
  text-align: center;
  font-family: Arial, sans-serif;
}

.controls {
  margin-bottom: 1rem;
}

.controls button {
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}

.inventory-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 10px;
}

.slot {
  width: 100%;
  padding-top: 100%; /* Keep slots square */
  position: relative;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.slot .item {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  cursor: move;
  user-select: none;
}
</style>
