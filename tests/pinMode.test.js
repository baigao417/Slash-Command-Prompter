const { pinMode } = require('../pin');
const chrome = require('jest-chrome');

describe('pinMode', () => {
  beforeEach(() => {
    chrome.storage.local.set.mockClear();
  });

  test('moves mode up, writes to storage and shows toast', () => {
    const modes = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
    const showToast = jest.fn();
    const renderModeDropdown = jest.fn();

    pinMode('b', modes, chrome.storage.local, showToast, renderModeDropdown);

    expect(modes).toEqual([{ id: 'b' }, { id: 'a' }, { id: 'c' }]);
    expect(chrome.storage.local.set).toHaveBeenCalled();
    const callback = chrome.storage.local.set.mock.calls[0][1];
    callback();
    expect(chrome.storage.local.set).toHaveBeenCalledWith({ modes }, expect.any(Function));
    expect(showToast).toHaveBeenCalledWith('模式已上移');
  });
});
