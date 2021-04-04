class FileExplorer extends WindowsForm {
    static create(_taskbarItem) {
        return new FileExplorer({
            appId: 'file-explorer',
            taskbarItem: _taskbarItem,
            top: '15%',
            left: '25%',
            width: '50%',
            height: '60%'
        });
    }
}