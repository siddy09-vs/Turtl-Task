const CONFIG = {
  MAX_NOTES: 8,
  TITLE_PREVIEW_LENGTH: 12,
  CONTENT_PREVIEW_LENGTH: 50,
  PLACEHOLDER_TEXT: '[blank]',
};

const { notes, buttonStates, titleElement, contentElement } =
  initializeNotesApp();
let currentNoteIndex = storage.getCurrentNoteIndex();

updateNotesText();
renderNavNotes();
attachEventListeners();

function initializeNotesApp() {
  // Object initialization from localStorage
  const notes = storage.getNotes();

  const buttonStates = storage.getButtonStates();

  // DOM element references
  const titleElement = document.querySelector('.title-text');
  const contentElement = document.querySelector('.notes-text');

  // Return objects that other functions need access to
  return {
    notes,
    buttonStates,
    titleElement,
    contentElement,
  };
}

function attachEventListeners() {
  titleElement.addEventListener('input', () => {
    saveTitle();
    renderNavNotes();
  });

  contentElement.addEventListener('input', () => {
    saveContent();
    renderNavNotes();
  });
}

function saveCurrentNoteIndex() {
  storage.saveCurrentNoteIndex(currentNoteIndex);
}

function createNewNote() {
  if (notes.length >= CONFIG.MAX_NOTES) return;

  const newNote = { title: '', content: '' };
  notes.push(newNote);

  currentNoteIndex = notes.length - 1;
  saveCurrentNoteIndex();
  saveNotesArray();

  updateNotesText();
  renderNavNotes();
}

function deleteNote(indexToDelete) {
  notes.splice(indexToDelete, 1);
  saveNotesArray();

  // Handle empty notes array
  if (notes.length === 0) {
    // TODO: Show empty state, this a temporary solution
    createNewNote();
    return;
  }

  updateCurrentNoteIndex(indexToDelete);

  updateNotesText();
  renderNavNotes();
}

function updateCurrentNoteIndex(deletedIndex) {
  if (deletedIndex < currentNoteIndex) {
    currentNoteIndex--;
  } else if (
    deletedIndex === currentNoteIndex &&
    currentNoteIndex >= notes.length
  ) {
    currentNoteIndex = notes.length - 1;
  }
  saveCurrentNoteIndex();
}

function checkPlaceholder(div) {
  if (div.textContent.trim() === '' || div.innerHTML === '<br>') {
    div.innerHTML = '';
  }
}

function updateNotesText() {
  if (!notes.length) {
    createNewNote();
    return;
  }

  if (currentNoteIndex >= notes.length || currentNoteIndex < 0) {
    currentNoteIndex = 0;
    saveCurrentNoteIndex();
  }

  titleElement.textContent = notes[currentNoteIndex].title;
  contentElement.textContent = notes[currentNoteIndex].content;
}

function saveNotesArray() {
  storage.saveNotes(notes);
}

function saveTitle() {
  const value = titleElement.textContent;
  notes[currentNoteIndex].title = value;

  saveNotesArray();
}

function saveContent() {
  const value = contentElement.textContent;
  notes[currentNoteIndex].content = value;

  saveNotesArray();
}

function changeTextColor(color) {
  if (color === 'black') {
    titleElement.classList.remove('title-text-red');
    titleElement.classList.remove('title-text-blue');

    contentElement.classList.remove('notes-text-red');
    contentElement.classList.remove('notes-text-blue');

    buttonStates.blackIsSelected = true;
    buttonStates.redIsSelected = false;
    buttonStates.blueIsSelected = false;
  } else if (color === 'red') {
    titleElement.classList.add('title-text-red');
    titleElement.classList.remove('title-text-blue');

    contentElement.classList.add('notes-text-red');
    contentElement.classList.remove('notes-text-blue');

    buttonStates.blackIsSelected = false;
    buttonStates.redIsSelected = true;
    buttonStates.blueIsSelected = false;
  } else if (color === 'blue') {
    titleElement.classList.remove('title-text-red');
    titleElement.classList.add('title-text-blue');

    contentElement.classList.remove('notes-text-red');
    contentElement.classList.add('notes-text-blue');

    buttonStates.blackIsSelected = false;
    buttonStates.redIsSelected = false;
    buttonStates.blueIsSelected = true;
  }

  storage.saveButtonStates(buttonStates);
}

function loadTextColors() {
  if (buttonStates.blackIsSelected) {
    blackTextButton.classList.toggle('individual-container-active');
    changeTextColor('black');
  } else if (buttonStates.redIsSelected) {
    redTextButton.classList.toggle('individual-container-active');
    changeTextColor('red');
  } else if (buttonStates.blueIsSelected) {
    blueTextButton.classList.toggle('individual-container-active');
    changeTextColor('blue');
  }
}

// TODO: Add placeholder text to navbar if it is empty, done
/* function addNavbarPlaceholder() {
  const navbar = document.querySelector('.navbar');
  navbar.innerHTML = `
      <div class='navbar-placeholder-container'>
        <p class='navbar-placeholder-text'>Save a note to see it here.</p>
      </div>
    `;
} ******NEED TO FIND A BETTER INTEGRATION********/

function renderNavNotes() {
  if (notes.length <= 8) {
    let navNotesHTML = '';

    notes.forEach((note, index) => {
      const titleTruncated = truncateText(
        note.title,
        CONFIG.TITLE_PREVIEW_LENGTH
      );
      const contentTruncated = truncateText(
        note.content,
        CONFIG.CONTENT_PREVIEW_LENGTH
      );
      const html = `
      <div class='navbox' data-index="${index}">
        <div class="top-navbox">
          <p class='nav-note-title'>${titleTruncated || '[blank]'}...</p>
          <button class="delete-navbox-button">X</button>
        </div>
        
        <p class='nav-note-excerpt'>
          ${contentTruncated || '[blank]'}...
        </p>
      </div>
    `;
      navNotesHTML += html;
    });

    document.querySelector('.navbar').innerHTML = navNotesHTML;

    document.querySelectorAll('.navbox').forEach((navbox) => {
      // TODO: Turn adding the active class into a function
      if (Number(navbox.dataset.index) === currentNoteIndex) {
        navbox.classList.add('navbox-active');
      }
      navbox.addEventListener('click', () => {
        document.querySelectorAll('.navbox').forEach((box) => {
          box.classList.remove('navbox-active');
        });

        navbox.classList.add('navbox-active');

        currentNoteIndex = Number(navbox.dataset.index);
        saveCurrentNoteIndex();
        updateNotesText();
      });
    });

    document
      .querySelectorAll('.delete-navbox-button')
      .forEach((deleteButton, index) => {
        deleteButton.addEventListener('click', (event) => {
          event.stopPropagation();

          deleteNote(index);
        });
      });
  }
}
