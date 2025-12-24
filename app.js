// Waite for page to fully load
document.addEventListener('DOMContentLoaded',function(){
    // 1. Get Elements
    const itemInput = document.getElementById('itemInput');
    const addButton = document.getElementById('addButton');
    const itemList = document.getElementById('itemList');

    // 2. Load saved data
    let items = [];

        // Try to load from localStorage
        const savedItems = localStorage.getItem('myItems');
        if (savedItems){
            items = JSON.parse(savedItems);
            console.log('Loaded items:', items);
        }
    
    // 3. Display function
    function displayItems(){
        // Clear current list
        itemList.innerHTML='';

        // Check if empty
        if (items.length === 0){
            itemList.innerHTML = '<li style="color:#888, text-align: center;">No items yet. Add something!</li>';
            return;
        }

        // Add each item to the list
        items.forEach(function(item, index){
            const li=document.createElement('li');

            // Create text span
            const textSpan = document.createElement('span');
            textSpan.textContent = item.text;

            // Create delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn';

            // When delete button is clicked
            li.appendChild(textSpan);
            li.appendChild(deleteBtn);

            // Add list item to the list
            itemList.appendChild(li);
        });
    }

    // 4. Delete function
    function deleteItem(index){
        // Remove item from array
        items.splice(index, 1);

        // Save to localStorage
        localStorage.setItem('myItems',JSON.stringify(items));

        // Refresh display
        displayItems();
        console.log('Deleted item at index:', index);
    }

    // 5. Add new item
    function addNewItem(){
        // Get value from input
        const text = itemInput.ariaValueMax.trim();

        // Check if input is empty
        if (text === ''){
            alert('Please type something first.');
            return;
        }

        // Create new item object
        const newItem = {
            text: text,
            date: new Date().toLocaleString();
            id: Date.now() //Unique ID
        };

        // Add to array
        items.push(newItem);

        // Save to localStorage
        localStorage.setItem('myItems',JSON.stringify(items));

        // Clear input
        itemInput.value = '';

        // Focus back to input (read for next item)
        itemInput.focus();

        // Refresh display
        displayItems();

        console.log('Added:', newItem);
    
    }

    // 6. Event Listeners

        // When button is clicked
        addButton.addEventListener('click', addNewItem);

        // When enter key is presssed in input
        itemInput.addEventListener('keypress',function(event){
            if (event.key==='Enter'){
                addNewItem();
            }
        });

    // 7. Initial Display
    displayItems();

    console.log('App is ready! Try adding some items.');

});