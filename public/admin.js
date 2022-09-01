console.log('admin js');

// variables
const body = document.querySelector('body');
const content = document.getElementById('content');
const ticketList = document.getElementById('ticketList');
const pathName = document.getElementById('path'); 


// GLOBAL VARIABLES
// get currentQuery
const getCurrentQuery = async () => {       // variabile di sessione per dire alla pagina che ticket stampare
    const rawRes = await fetch('/admin/getCurrentQuery');
    const res = await rawRes.json();
    return res;
}
// set currentQuery
const setCurrentQuery = async (nQuery) => {
    const rawRes = await fetch('admin/setCurrentQuery', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            query: nQuery
        })
    });
    const res = await rawRes.json();
    return res;
}
// get stores list
const getStoresList = async () => {         // variabile presente su .env 
    const rawRes = await fetch('/admin/getStoresList');
    const res = await rawRes.json();
    return res;
}
// get subjects list
const getSubjectsList = async () => {       // variabile presente su .env
    const rawRes = await fetch('/admin/getSubjectsList');
    const res = await rawRes.json();
    return res;
}


// QUERY
// get all the tickets from DB
const getTicketList = async () => {
    const rawRes = await fetch('/admin/getTicketList');
    const res = await rawRes.json();
    return res;
}
// get priority:"high" tickets from DB
const getHighPriorityTickets = async () => {
    const rawRes = await fetch('/admin/getHighPriorityTickets');
    const res = await rawRes.json();
    return res;
}
// get priority:"medium" tickets from DB
const getMediumPriorityTickets = async () => {
    const rawRes = await fetch('/admin/getMediumPriorityTickets');
    const res = await rawRes.json();
    return res;
}
// get priority:"low" tickets from DB
const getLowPriorityTickets = async () => {
    const rawRes = await fetch('/admin/getLowPriorityTickets');
    const res = await rawRes.json();
    return res;
}
//get one ticket by ID
const getTicketByID = async (id) => {
    const rawRes = await fetch('/admin/'+id);
    const res = await rawRes.json();
    return res;
}


// REQUESTS
// add ticket
const addTicketReq = async (obj) => {
    const rawRes = await fetch('admin/addTicket', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            name: obj.name,
            lastName: obj.lastName,
            subject: obj.subject,
            store: obj.store,
            priority: obj.priority,
            title: obj.title,
            description: obj.description
        })
    });
    const res = await rawRes.json();
    return res;
};
// edit ticket
const editTicketReq = async (obj, currentTicketID) => {
    const rawRes = await fetch('/admin/'+currentTicketID, { 
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            name: obj.name,
            lastName: obj.lastName,
            subject: obj.subject,
            store: obj.store,
            priority: obj.priority,
            title: obj.title,
            description: obj.description
        })
    });
    const res = await rawRes.json();
    return res;
}


//  NODE MAKERS
// returns node div.popup-form-row (rows)
const formRowMaker = (classe) => {
    let row = document.createElement('div');
    row.classList.add(classe);
    return row;
}
const formSpanMaker = (classe, text) => {
    const span = document.createElement('span');
    span.classList.add(classe);
    span.innerText = text;
    return span;
}
//returns node label.text
const formLabelMaker = (classe, text) => {
    const label = document.createElement('label');
    label.classList.add(classe);
    label.innerText = text;
    return label;
}
// returns node input
const formInputMaker = (id, value = '') => {
    const input = document.createElement('input');
    input.id = id;
    input.setAttribute("type", "text");
    input.value = value;
    return input;
}
// returns node options
const formOptionMaker = (value, text) => { 
    const option = document.createElement('option');
    option.value = value;
    option.innerText = text;
    return option;
}
// returns node select
const formSelectMaker = (id, options, selected = 'Null') => {   // options == object: lista di valori da aggiungere al select  
                                                                // selected: per la selezione dell'opzione di default
    const select = document.createElement('select');
    select.id = id;
    for(const property in options){
        let newOption = formOptionMaker(property, options[property]);
        if(newOption.value == selected){    // se il nuovo nodo contiene il valore passato
            newOption.selected = true;      // allora lo imposto come default
        } 
        select.appendChild(newOption);
    }
    return select;
}
// return node textarea
const formTextareaMaker = (id, value = '', cols, rows) => {
    const textarea = document.createElement('textarea');
    textarea.id = id;
    textarea.placeholder = value;
    textarea.cols = cols;
    textarea.rows = rows;
    return textarea;
}
// return node button
const formButtonMaker = (id, classe='', name) => {
    const button = document.createElement('button');
    button.id = id;
    button.classList.add(classe);
    button.innerText = name;
    return button;
}

// return NODE TICKET to show
const ticketMaker = ( newTicket ) => {
    // Ticket Container
    const ticketContainer = document.createElement('div');
    ticketContainer.classList.add('ticketContainer');
    // dropDownTicket
    const dropDownTicket = document.createElement('div');
    dropDownTicket.classList.add('dropDownTicket');
    // Ticket
    const ticket = document.createElement('div');
    ticket.classList.add('ticket');
    // drop
    const drop = document.createElement('i');
    drop.classList.add('drop', 'fa-solid', 'fa-caret-down');
    drop.setAttribute('data-opened', 'false');
    // name
    const name = document.createElement('div');
    name.classList.add('name');
    name.innerText = newTicket.name;
    // lastName
    const lastName = document.createElement('div');
    lastName.classList.add('lastName');
    lastName.innerText = newTicket.lastName;
    // subject
    const subject = document.createElement('div');
    subject.classList.add('subject');
    subject.innerText = newTicket.subject;
    // store
    const store = document.createElement('div');
    store.classList.add('store');
    store.innerText = newTicket.store;
    // priority
    const priority = document.createElement('div');
    priority.appendChild(formSpanMaker('priority', newTicket.priority));
    // title
    const title = document.createElement('div');
    title.classList.add('title');
    title.innerText = newTicket.title;
    // description
    const description = document.createElement('div');
    description.classList.add('description');
    description.innerText = newTicket.description;
    // editButtons
    const editButtons = document.createElement('div');
    editButtons.classList.add('editButtons');
    // editTicket
    const editTicket = document.createElement('i');
    editTicket.id = newTicket._id;
    editTicket.classList.add('edit', 'fas', 'fa-edit');
    // deleteTicket
    const deleteTicket = document.createElement('i');
    deleteTicket.id = newTicket._id;
    deleteTicket.classList.add('delete', 'fa-regular', 'fa-trash-can');

    editButtons.appendChild(editTicket);
    editButtons.appendChild(deleteTicket);

    ticket.appendChild(drop);
    ticket.appendChild(name);
    ticket.appendChild(lastName);
    ticket.appendChild(subject);
    ticket.appendChild(store);
    ticket.appendChild(priority);
    ticket.appendChild(editButtons);

    dropDownTicket.appendChild(title);
    dropDownTicket.appendChild(description);

    ticketContainer.appendChild(ticket);
    ticketContainer.appendChild(dropDownTicket);

    return ticketContainer;
} 
// return NODE POPUP for ADD a ticket
const addPopupMaker = async () => {
    // popup
    const popup = document.createElement('div');
    popup.classList.add('popup');

    // h2
    const h2 = document.createElement('h2');
    h2.innerText = 'Aggiungi un nuovo ticket:';

    // form container
    const formContainer = document.createElement('div');
    formContainer.classList.add('popup-form');
    // name
    const name = formRowMaker('popup-form-row');
    name.appendChild(formLabelMaker('label', 'Name'));
    name.appendChild(formInputMaker('name'));
    // lastName
    const lastName = formRowMaker('popup-form-row');
    lastName.appendChild(formLabelMaker('label', 'Last Name'));
    lastName.appendChild(formInputMaker('lastName'));
    // subjects
    const subject = formRowMaker('popup-form-row');
    subject.appendChild(formLabelMaker('label', 'Subject'));
    subject.appendChild(formSelectMaker('subject', await getSubjectsList())); 
    // store
    const store = formRowMaker('popup-form-row');
    store.appendChild(formLabelMaker('label', 'Store'));
    store.appendChild(formSelectMaker('store', await getStoresList())); 
    // priority
    const priority = formRowMaker('popup-form-row');
    priority.appendChild(formLabelMaker('label', 'Priority'));
    priority.appendChild(formSelectMaker('priority', {
        high: "high",
        medium: "medium",
        low: "low"
    })); 
    // title
    const title = formRowMaker('popup-form-row');
    title.appendChild(formLabelMaker('label', 'Title'));
    title.appendChild(formInputMaker('title'));
    // description
    const description = formRowMaker('popup-form-row');
    description.appendChild(formLabelMaker('label', 'Description'));
    description.appendChild(formTextareaMaker('description', '', 30, 5));
    // buttons
    const buttonsRow = formRowMaker('popup-buttons');
    buttonsRow.appendChild(formButtonMaker('addTicket', 'postive-popup-button', 'Aggiungi ticket'));
    buttonsRow.appendChild(formButtonMaker('cancel', 'negative-popup-button', 'Annulla'));

    formContainer.appendChild(name);
    formContainer.appendChild(lastName);
    formContainer.appendChild(subject);
    formContainer.appendChild(store);
    formContainer.appendChild(priority);
    formContainer.appendChild(title);
    formContainer.appendChild(description);

    popup.appendChild(h2);
    popup.appendChild(formContainer);
    popup.appendChild(buttonsRow);

    return popup;
}
// return NODE popup for EDIT a ticket
const editPopupMaker = async (id) => {
    const selectedTicket = await getTicketByID(id);

    // popup
    const popup = document.createElement('div');
    popup.classList.add('popup');

    // h2
    const h2 = document.createElement('h2');
    h2.innerText = 'Modifica:';

    // form container 
    const formContainer = document.createElement('div');
    formContainer.classList.add('popup-form');
    // name
    const name = formRowMaker('popup-form-row');
    name.appendChild(formLabelMaker('label', 'Name'));
    name.appendChild(formInputMaker('name', selectedTicket.name));
    // lastName
    const lastName = formRowMaker('popup-form-row');
    lastName.appendChild(formLabelMaker('label', 'Last Name'));
    lastName.appendChild(formInputMaker('lastName', selectedTicket.lastName));
    // subjects
    const subject = formRowMaker('popup-form-row');
    subject.appendChild(formLabelMaker('label', 'Subject'));
    subject.appendChild(formSelectMaker('subject', await getSubjectsList(), selectedTicket.subject)); 
    // store
    const store = formRowMaker('popup-form-row');
    store.appendChild(formLabelMaker('label', 'Store'));
    store.appendChild(formSelectMaker('store', await getStoresList(), selectedTicket.store)); 
    // priority
    const priority = formRowMaker('popup-form-row');
    priority.appendChild(formLabelMaker('label', 'Priority'));
    priority.appendChild(formSelectMaker('priority', {
        high: "high",
        medium: "medium",
        low: "low"
    }, selectedTicket.priority)); 
    // title
    const title = formRowMaker('popup-form-row');
    title.appendChild(formLabelMaker('label', 'Title'));
    title.appendChild(formInputMaker('title', selectedTicket.title));
    // description
    const description = formRowMaker('popup-form-row');
    description.appendChild(formLabelMaker('label', 'Description'));
    description.appendChild(formTextareaMaker('description', selectedTicket.description, 30, 5));
    // btnAddTicket
    const buttonsRow = formRowMaker('popup-buttons');
    buttonsRow.appendChild(formButtonMaker('buttonEditTicket','postive-popup-button', 'Aggiorna ticket'));
    buttonsRow.appendChild(formButtonMaker('cancel','negative-popup-button', 'Annulla'));

    formContainer.appendChild(name);
    formContainer.appendChild(lastName);
    formContainer.appendChild(subject);
    formContainer.appendChild(store);
    formContainer.appendChild(priority);
    formContainer.appendChild(title);
    formContainer.appendChild(description);

    popup.appendChild(h2);
    popup.appendChild(formContainer);
    popup.appendChild(buttonsRow);

    return popup;
}
// return NODE popup for DELETE a ticket
const deletePopupMaker = async (id) => {
    const selectedTicket = await getTicketByID(id);

    // popup
    const popup = document.createElement('div');
    popup.classList.add('popup');

    // h2
    const h2 = document.createElement('h2');
    h2.innerText = 'Sei sicuro di voler eliminare il ticket: ';

    // form container
    const formContainer = document.createElement('div');
    formContainer.classList.add('popup-list');

    //name
    const name = formRowMaker('popup-list-row');
    name.appendChild(formSpanMaker('label', 'Name'));
    name.appendChild(formSpanMaker('text', selectedTicket.name));
    //lastName
    const lastName = formRowMaker('popup-list-row');
    lastName.appendChild(formSpanMaker('label', 'Last name'));
    lastName.appendChild(formSpanMaker('text', selectedTicket.lastName));
    //subject
    const subject = formRowMaker('popup-list-row');
    subject.appendChild(formSpanMaker('label', 'Subject'));
    subject.appendChild(formSpanMaker('text', selectedTicket.subject));
    //store
    const store = formRowMaker('popup-list-row');
    store.appendChild(formSpanMaker('label', 'Store'));
    store.appendChild(formSpanMaker('text', selectedTicket.store));
    //priority
    const priority = formRowMaker('popup-list-row');
    priority.appendChild(formSpanMaker('label', 'Priority'));
    priority.appendChild(formSpanMaker('text', selectedTicket.priority));
    //title
    const title = formRowMaker('popup-list-row');
    title.appendChild(formSpanMaker('label', 'Title'));
    title.appendChild(formSpanMaker('text', selectedTicket.title));
    //description
    const description = formRowMaker('popup-list-row');
    description.appendChild(formSpanMaker('label', 'Description'));
    description.appendChild(formSpanMaker('text', selectedTicket.description));
    //buttons
    const buttonsRow = formRowMaker('popup-buttons');
    buttonsRow.appendChild(formButtonMaker('buttonDeleteTicket', 'postive-popup-button', 'Elimina ticket'));
    buttonsRow.appendChild(formButtonMaker('cancel', 'negative-popup-button', 'Annulla'));

    formContainer.appendChild(name);
    formContainer.appendChild(lastName);
    formContainer.appendChild(subject);
    formContainer.appendChild(store);
    formContainer.appendChild(priority);
    formContainer.appendChild(title);
    formContainer.appendChild(description);

    popup.appendChild(h2);
    popup.appendChild(formContainer);
    popup.appendChild(buttonsRow);

    return popup;
}


// TOOLS
// removes all the child from a node
const childRemover = (node) => {
    while( node.hasChildNodes() ){
        node.removeChild(node.lastChild);
    }
}
const nodelistClassRemover = (nodelist, classToRemove) => {
    nodelist.forEach((item) => {
        item.classList.remove(classToRemove);
    });
}


// EVENT LISTENERS
//setup add button
const setupAddButton = () => {
    const btnAddTicket = document.getElementById('btnAddTicket');
    btnAddTicket.addEventListener('click', async () => {
        const currentPopupAddTicket = await addPopupMaker();
        body.appendChild(currentPopupAddTicket);

        const addTicket = document.getElementById('addTicket');
        addTicket.addEventListener('click', () => {
            const newTicket = {
                name: document.getElementById("name").value,
                lastName: document.getElementById("lastName").value,
                subject: document.getElementById("subject").value,
                store: document.getElementById("store").value,
                priority: document.getElementById("priority").value,
                title: document.getElementById("title").value,
                description: document.getElementById("description").value
            }
            addTicketReq(newTicket);
            body.removeChild(currentPopupAddTicket);
            location.reload();
        })

        const cancel = document.getElementById('cancel');
        cancel.addEventListener('click', () => {
            body.removeChild(currentPopupAddTicket);
        })
    });
}
// setup edit buttons
const setupEditButtons = () => {
    const buttonsEditTicket = document.querySelectorAll('.edit');
    buttonsEditTicket.forEach((button) => {
        button.addEventListener('click', async (e) => {
            const currentTicketID = e.target.id;
            const currentPopupEditTicket = await editPopupMaker(currentTicketID);
            body.appendChild(currentPopupEditTicket);

            const buttonEditTicket = document.getElementById('buttonEditTicket');
            buttonEditTicket.addEventListener('click', async () => {
                const newTicket = {
                    name: document.getElementById("name").value,
                    lastName: document.getElementById("lastName").value,
                    subject: document.getElementById("subject").value,
                    store: document.getElementById("store").value,
                    priority: document.getElementById("priority").value,
                    title: document.getElementById("title").value,
                    description: document.getElementById("description").value
                }
                const res = await editTicketReq(newTicket, currentTicketID);
                // body.removeChild(currentPopupEditTicket);
                location.reload();
            })

            const buttonCancel = document.getElementById('cancel');
            buttonCancel.addEventListener('click', () => {
                body.removeChild(currentPopupEditTicket);
            })
        });
    });
}
// setup delete buttons
const setupDeleteButtons = () => {
    const buttonsDeleteTicket = document.querySelectorAll('.delete');
    buttonsDeleteTicket.forEach((button) => {
        button.addEventListener('click', async (e) => {
            const currentTicketID = e.target.id;
            let currentPopupDelete = await deletePopupMaker(currentTicketID);
            body.appendChild(currentPopupDelete);

            const btnYes = document.getElementById('buttonDeleteTicket');
            btnYes.addEventListener('click', async () => {
                const rawRes = await fetch('/admin/'+currentTicketID, { method: 'DELETE' });
                const res = await rawRes.json();
                console.log('delete res:');
                console.log(res);
                body.removeChild(currentPopupDelete);
                location.reload();
            })

            const btnNo = document.getElementById('cancel');
            btnNo.addEventListener('click', () => {
                body.removeChild(currentPopupDelete);
            })
        });
    });
}
// setup dropdown buttons
const setupDropdownButtons = () => {
    const buttonsDropdown = document.querySelectorAll('.drop');
    buttonsDropdown.forEach((button) => {
        button.addEventListener('click', (e) => {
            const drop = e.target;
            let isOpened = drop.attributes[1].value; // data-opened
            const node_father = e.path[2]; // move to the father
            const node_dropdown = node_father.lastChild; // to find the hidden div 
            if(isOpened == 'false'){ // if its close i'll open it
                drop.attributes[1].value = 'true';
                drop.classList.remove('fa-caret-down');
                drop.classList.add('fa-caret-up');
                node_dropdown.classList.add('showDropDownTicket');
            } else if(isOpened == 'true'){ // if its open i'll close it
                drop.attributes[1].value = 'false';
                drop.classList.remove('fa-caret-up');
                drop.classList.add('fa-caret-down');
                node_dropdown.classList.remove('showDropDownTicket');
            } else {
                console.log('Ci sono dei problemi in: "setupDropdownButtons"');
            }
        });
    });
}
// setup button open all dropdowns
const setupOpenAllDropdownsButton = () => {
    const openAllDropdownButton = document.getElementById('btnOpenAllDropdowns');
    openAllDropdownButton.addEventListener('click', () => {
        const dropdowns = document.querySelectorAll('.dropDownTicket');
        const dropdownButtons = document.querySelectorAll('.drop');
        let isOpened = openAllDropdownButton.attributes[1].value;
        if(isOpened == 'false'){
            openAllDropdownButton.attributes[1].value = 'true';
            for(let i = 0; i < dropdowns.length; i++){
                dropdownButtons[i].attributes[1].value = 'true';
                dropdownButtons[i].classList.remove('fa-caret-down');
                dropdownButtons[i].classList.add('fa-caret-up');
                dropdowns[i].classList.add('showDropDownTicket');
            }
        } else {
            openAllDropdownButton.attributes[1].value = 'false';
            for(let i = 0; i < dropdowns.length; i++){
                dropdownButtons[i].attributes[1].value = 'false';
                dropdownButtons[i].classList.remove('fa-caret-up');
                dropdownButtons[i].classList.add('fa-caret-down');
                dropdowns[i].classList.remove('showDropDownTicket');
            }
        }
        
    });
}
//setup Event Listeners
const setupEventListeners = () => {
    setupEditButtons();
    setupDeleteButtons();
    setupDropdownButtons();
}
setupOpenAllDropdownsButton();
setupAddButton();


// MAIN 
// when the page loads:
window.onload = async () => {
    let currentQuery = await getCurrentQuery(); // 0: All Tickets, 1: High Priority Tickets, 2: Medium Priority Tickets, 3: Low Priority Tickets 

    // get querys
    const tempTicketList = await getTicketList();
    const tempHighPriorityTicketList = await getHighPriorityTickets();
    const tempMediumPriorityTicketList = await getMediumPriorityTickets();
    const tempLowPriorityTicketList = await getLowPriorityTickets();

    const sidebarItems = document.querySelectorAll('.sidebarItem');

    // print ticketList
    switch(currentQuery){
        case 0:
            pathName.innerText = 'All Tickets';
            childRemover(ticketList);
            for (let i = 0; i < tempTicketList.length; i++) {
                ticketList.appendChild(ticketMaker(tempTicketList[i]));
            }
            setupEventListeners();
            break;
        case 1:
            pathName.innerText = 'High Priority Tickets';
            childRemover(ticketList);
            for(let i = 0; i < tempHighPriorityTicketList.length; i++){
                ticketList.appendChild(ticketMaker(tempHighPriorityTicketList[i]));
            }
            setupEventListeners();
            break;
        case 2:
            pathName.innerText = 'Medium Priority Tickets';
            childRemover(ticketList);
            for(let i = 0; i < tempMediumPriorityTicketList.length; i++){
                ticketList.appendChild(ticketMaker(tempMediumPriorityTicketList[i]));
            }
            setupEventListeners();
            break;
        case 3:
            pathName.innerText = 'Low Priority Tickets';
            childRemover(ticketList);
            for(let i = 0; i < tempLowPriorityTicketList.length; i++){
                ticketList.appendChild(ticketMaker(tempLowPriorityTicketList[i]));
            }
            setupEventListeners();
            break;
        default:
            alert('Qualcosa è andato storto..');
    }

    // setup logo to home button
    const logo = document.getElementById('logo');
    logo.addEventListener('click', async () => {
        nodelistClassRemover(sidebarItems, 'clicked');
        await setCurrentQuery(0);
        pathName.innerText = 'All Tickets';
        childRemover(ticketList);
        for (let i = 0; i < tempTicketList.length; i++) {
            ticketList.appendChild(ticketMaker(tempTicketList[i]));
        }
        setupEventListeners();
    });

    // setup All Tickets button
    const btnAllTickets = document.getElementById('allTickets');
    btnAllTickets.addEventListener('click', async (e) => {
        nodelistClassRemover(sidebarItems, 'clicked');
        e.target.classList.add('clicked');
        await setCurrentQuery(0);
        pathName.innerText = 'All Tickets';
        childRemover(ticketList);
        for(let i = 0; i < tempTicketList.length; i++){
            ticketList.appendChild(ticketMaker(tempTicketList[i]));
        }
        setupEventListeners();
    });

    // setup Priority:high button
    const btnHighPriority = document.getElementById('highPriority'); 
    btnHighPriority.addEventListener('click', async (e) => {
        nodelistClassRemover(sidebarItems, 'clicked');
        e.target.classList.add('clicked');
        await setCurrentQuery(1);
        pathName.innerText = 'High Priority Tickets';
        childRemover(ticketList);
        for(let i = 0; i < tempHighPriorityTicketList.length; i++){
            ticketList.appendChild(ticketMaker(tempHighPriorityTicketList[i]));
        }
        setupEventListeners();
    });

    // setup Priority:medium button
    const btnMediumPriority = document.getElementById('mediumPriority'); 
    btnMediumPriority.addEventListener('click', async (e) => {
        nodelistClassRemover(sidebarItems, 'clicked');
        e.target.classList.add('clicked');
        await setCurrentQuery(2);
        pathName.innerText = 'Medium Priority Tickets';
        childRemover(ticketList);
        for(let i = 0; i < tempMediumPriorityTicketList.length; i++){
            ticketList.appendChild(ticketMaker(tempMediumPriorityTicketList[i]));
        }
        setupEventListeners();
    });

    // setup Priority:low button
    const btnLowPriority = document.getElementById('lowPriority'); 
    btnLowPriority.addEventListener('click', async (e) => {
        nodelistClassRemover(sidebarItems, 'clicked');
        e.target.classList.add('clicked');
        await setCurrentQuery(3);
        pathName.innerText = 'Low Priority Tickets';
        childRemover(ticketList);
        for(let i = 0; i < tempLowPriorityTicketList.length; i++){
            ticketList.appendChild(ticketMaker(tempLowPriorityTicketList[i]));
        }
        setupEventListeners();
    });
    
};

