function truncateText(text, maxLength) {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

function getDisplayText(text) {
  return text.trim() || CONFIG.PLACEHOLDER_TEXT;
}
