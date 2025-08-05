function pinMode(id, modes, storage, showToast, renderModeDropdown) {
  const index = modes.findIndex(m => m.id === id);

  if (index > 0) {
    // swap current mode with previous
    const temp = modes[index];
    modes[index] = modes[index - 1];
    modes[index - 1] = temp;

    storage.set({ modes }, function() {
      showToast('模式已上移');
      if (typeof renderModeDropdown === 'function') {
        renderModeDropdown();
      }
    });
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { pinMode };
} else {
  window.pinMode = pinMode;
}
