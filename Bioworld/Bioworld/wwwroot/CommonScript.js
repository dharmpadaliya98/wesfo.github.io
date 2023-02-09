function HideNavMenu() {
    var menu = document.getElementsByClassName('mainNav')[0];
    if (hasClass(menu, 'current')) menu.classList.remove('current');
}

function hasClass(element, className) {
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
}


function ShowDeleteConfirmationModal() {
    $('#deleteConfirmationModal').modal('show');
}

function HideDeleteConfirmationModal() {
    $('#deleteConfirmationModal').modal('hide');
}