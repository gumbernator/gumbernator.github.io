languageChange('EN');

const pinnedFile = new TaskbarItem('file-explorer', './vectors/icons8-folder.svg', 0, true, FileExplorer);

const testWindow1 = new WindowsForm({
    appId: 'test1',
    top: '25%',
    left: '25%',
    width: '50%',
    height: '50%',
    iconPath: './vectors/icons8-photos.svg'
});