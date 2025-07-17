const STORAGE_KEYS = {
  NOTES: 'notes',
  BUTTON_STATES: 'buttonStates',
  CURRENT_NOTE_INDEX: 'currentNoteIndex',
};

const storage = {
  // Generic get/set methods
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage for key "${key}":`, error);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving to localStorage for key "${key}":`, error);
    }
  },

  // Specific methods for app
  getNotes() {
    return this.get(STORAGE_KEYS.NOTES, [
      {
        title: '',
        content: '',
      },
    ]);
  },

  saveNotes(notes) {
    this.set(STORAGE_KEYS.NOTES, notes);
  },

  getButtonStates() {
    return this.get(STORAGE_KEYS.BUTTON_STATES, {
      blackIsSelected: true,
      redIsSelected: false,
      blueIsSelected: false,
    });
  },

  saveButtonStates(buttonStates) {
    this.set(STORAGE_KEYS.BUTTON_STATES, buttonStates);
  },

  getCurrentNoteIndex() {
    return this.get(STORAGE_KEYS.CURRENT_NOTE_INDEX, 0);
  },

  saveCurrentNoteIndex(index) {
    this.set(STORAGE_KEYS.CURRENT_NOTE_INDEX, index);
  },

  // Utility methods
  clear() {
    localStorage.clear();
  },

  remove(key) {
    localStorage.removeItem(key);
  },
};
