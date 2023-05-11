var shoppingFormEl = $('#shopping-form');
var shoppingListEl = $('#shopping-list');

function handleFormSubmit(event) {
    event.preventDefault();

    var shoppingItem = $('input[name="shopping-input"]').val();

    if (!shoppingItem) {
        console.log('No shopping item filled out in form!');
        return;
    }

    var shoppingListItemEl = $(
        '<li class="flex-row justify-space-between align-center p-2 bg-light text-dark">'
    );
    shoppingListItemEl.text(shoppingItem);

    shoppingListItemEl.append(
        '<button class="btn btn-danger btn-small delete-item-btn">Remove</button>'
    );

    shoppingListEl.append(shoppingListItemEl);

    $('input[name="shopping-input"]').val('');

    var shoppingListItems = JSON.parse(localStorage.getItem('shoppingListItems')) || [];
    shoppingListItems.push(shoppingItem);
    localStorage.setItem('shoppingListItems', JSON.stringify(shoppingListItems));
}


shoppingListEl.on('click', '.delete-item-btn', function(event){
    var btnClicked = $(event.target);
    var shoppingItem = btnClicked.siblings('span').text();

    var shoppingListItems = JSON.parse(localStorage.getItem('shoppingListItems')) || [];
    var index = shoppingListItems.indexOf(shoppingItem);
    if (index > -1) {
        shoppingListItems.splice(index, 1);
        localStorage.setItem('shoppingListItems', JSON.stringify(shoppingListItems));
    }
    btnClicked.parent('li').remove();
})

shoppingFormEl.on('submit', handleFormSubmit);

$(document).ready(function() {
    var shoppingListItems = JSON.parse(localStorage.getItem('shoppingListItems')) || [];

    for (var i = 0; i < shoppingListItems.length; i++) {
       
    var shoppingListItemEl = $(
        '<li class="flex-row justify-space-between align-center p-2 bg-light text-dark">'
    );
    shoppingListItemEl.text(shoppingListItems[i]);

    shoppingListItemEl.append(
        '<button class="btn btn-danger btn-small delete-item-btn">Remove</button>'
    );

    shoppingListEl.append(shoppingListItemEl);
    }
});