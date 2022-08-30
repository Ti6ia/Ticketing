console.log('admin js');

// variables
const body = document.querySelector('body');
const content = document.getElementById('content');
const ticketList = document.getElementById('ticketList');
const pathName = document.getElementById('path'); 

// get currentQuery
const getCurrentQuery = async () => {
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
const getStoresList = async () => {
    const rawRes = await fetch('/admin/getStoresList');
    const res = await rawRes.json();
    return res;
}
// get subjects list
const getSubjectsList = async () => {
    const rawRes = await fetch('/admin/getSubjectsList');
    const res = await rawRes.json();
    return res;
}


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
    console.log('New Ticket added correctly');
    return res;
};

// edit ticket
const editTicketReq = async (obj, currentTicketID) => {
    console.log(obj);
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
    console.log('Ticket updated correctly');
    return res;
}


//  DIV MAKERS
// returns div.popup-form-row (rows)
const formRowMaker = () => {
    let row = document.createElement('div');
    row.classList.add('popup-form-row');
    return row;
}
//returns label.text
const formLabelMaker = (name) => {
    const label = document.createElement('label');
    label.classList.add('text');
    label.innerText = name;
    return label;
}
// returns input
const formInputMaker = (id, value = '') => {
    const input = document.createElement('input');
    input.id = id;
    input.setAttribute("type", "text");
    input.value = value;
    return input;
}
// returns options
const formOptionMaker = (value, text) => {
    const option = document.createElement('option');
    option.value = value;
    option.innerText = text;
    return option;
}
// returns select
const formSelectMaker = (id, options, selected = 'culo') => {  // options === object
    const select = document.createElement('select');
    select.id = id;
    for(const property in options){
        let newOption = formOptionMaker(property, options[property]);
        if(newOption.value == selected){
            newOption.selected = true;
        }
        select.appendChild(newOption);
    }
    return select;
}
// return textarea
const formTextareaMaker = (id, value = '', cols, rows) => {
    const textarea = document.createElement('textarea');
    textarea.id = id;
    textarea.placeholder = value;
    textarea.cols = cols;
    textarea.rows = rows;
    return textarea;
}
// return button
const formButtonMaker = (id, name) => {
    const button = document.createElement('button');
    button.id = id;
    button.innerText = name;
    return button;
}



// return node ticketList's ticket to show
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
    priority.classList.add('priority');
    priority.innerText = newTicket.priority;
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

// return node popup for ADD a ticket
const addPopupMaker = async () => {
    console.log('popup maker');
    // popup
    const popup = document.createElement('div');
    popup.classList.add('popup');

    // h2
    const h2 = document.createElement('h2');
    h2.innerText = 'Aggiungi un nuovo ticket:';

    // form container (.popup-add-ticket)
    const formContainer = document.createElement('div');
    formContainer.classList.add('popup-add-ticket');
    // name
    const name = formRowMaker();
    name.appendChild(formLabelMaker('Name'));
    name.appendChild(formInputMaker('name'));
    // lastName
    const lastName = formRowMaker();
    lastName.appendChild(formLabelMaker('Last Name'));
    lastName.appendChild(formInputMaker('lastName'));
    // subjects
    const subject = formRowMaker();
    subject.appendChild(formLabelMaker('Subject'));
    subject.appendChild(formSelectMaker('subject', await getSubjectsList())); 
    // store
    const store = formRowMaker();
    store.appendChild(formLabelMaker('Store'));
    store.appendChild(formSelectMaker('store', await getStoresList())); 
    // priority
    const priority = formRowMaker();
    priority.appendChild(formLabelMaker('Priority'));
    priority.appendChild(formSelectMaker('priority', {
        high: "high",
        medium: "medium",
        low: "low"
    })); 
    // title
    const title = formRowMaker();
    title.appendChild(formLabelMaker('Title'));
    title.appendChild(formInputMaker('title'));
    // description
    const description = formRowMaker();
    description.appendChild(formLabelMaker('Description'));
    description.appendChild(formTextareaMaker('description', '', 30, 5));
    // buttons
    const buttonsRow = formRowMaker();
    buttonsRow.appendChild(formButtonMaker('addTicket', 'Aggiungi ticket'));
    buttonsRow.appendChild(formButtonMaker('cancel', 'Annulla'));

    formContainer.appendChild(name);
    formContainer.appendChild(lastName);
    formContainer.appendChild(subject);
    formContainer.appendChild(store);
    formContainer.appendChild(priority);
    formContainer.appendChild(title);
    formContainer.appendChild(description);
    formContainer.appendChild(buttonsRow);

    popup.appendChild(h2);
    popup.appendChild(formContainer);

    return popup;
}

// return node popup for EDIT a ticket
const editPopupMaker = async (id) => {
    console.log('appena dentro editPopupMaker')
    const givenTicket = await getTicketByID(id);
    console.log('givenTicket'); 
    console.log(givenTicket); 

    // popup
    const popup = document.createElement('div');
    popup.classList.add('popup');

    // h2
    const h2 = document.createElement('h2');
    h2.innerText = 'Modifica:';

    // form container (.popup-add-ticket)
    const formContainer = document.createElement('div');
    formContainer.classList.add('popup-add-ticket');
    // name
    const name = formRowMaker();
    name.appendChild(formLabelMaker('Name'));
    name.appendChild(formInputMaker('name', givenTicket.name));
    // lastName
    const lastName = formRowMaker();
    lastName.appendChild(formLabelMaker('Last Name'));
    lastName.appendChild(formInputMaker('lastName', givenTicket.lastName));
    // subjects
    const subject = formRowMaker();
    subject.appendChild(formLabelMaker('Subject'));
    subject.appendChild(formSelectMaker('subject', await getSubjectsList(), givenTicket.subject)); 
    // store
    const store = formRowMaker();
    store.appendChild(formLabelMaker('Store'));
    store.appendChild(formSelectMaker('store', await getStoresList(), givenTicket.store)); 
    // priority
    const priority = formRowMaker();
    priority.appendChild(formLabelMaker('Priority'));
    priority.appendChild(formSelectMaker('priority', {
        high: "high",
        medium: "medium",
        low: "low"
    }, givenTicket.priority)); 
    // title
    const title = formRowMaker();
    title.appendChild(formLabelMaker('Title'));
    title.appendChild(formInputMaker('title', givenTicket.title));
    // description
    const description = formRowMaker();
    description.appendChild(formLabelMaker('Description'));
    description.appendChild(formTextareaMaker('description', givenTicket.description, 30, 5));
    // btnAddTicket
    const buttonsRow = formRowMaker();
    buttonsRow.appendChild(formButtonMaker('buttonEditTicket', 'Aggiorna ticket'));
    buttonsRow.appendChild(formButtonMaker('buttonCancel', 'Annulla'));

    formContainer.appendChild(name);
    formContainer.appendChild(lastName);
    formContainer.appendChild(subject);
    formContainer.appendChild(store);
    formContainer.appendChild(priority);
    formContainer.appendChild(title);
    formContainer.appendChild(description);
    formContainer.appendChild(buttonsRow);

    popup.appendChild(h2);
    popup.appendChild(formContainer);

    return popup;
}

// return node popup for DELETE a ticket
const deletePopupMaker = async (id) => {
    const givenTicket = await getTicketByID(id);

    // popup
    const popup = document.createElement('div');
    popup.classList.add('popup');

    // h1
    const h2 = document.createElement('h2');
    h2.innerText = 'Sei sicuro di voler eliminare il ticket: ';

    //ticket div
    const popupTicket = document.createElement('div');
    popupTicket.classList.add('popup-show-ticket')
    // nameLabel
    const nameLabel = document.createElement('div');
    nameLabel.innerText = 'Name : ';
    // name
    const name = document.createElement('div');
    name.innerText = givenTicket.name;
    // lastNameLabel
    const lastNameLabel = document.createElement('div');
    lastNameLabel.innerText = 'Last name: ';
    // lastName
    const lastName = document.createElement('div');
    lastName.innerText = givenTicket.lastName;
    // subjectLabel
    const subjectLabel = document.createElement('div');
    subjectLabel.innerText = 'Subject: ';
    // subject
    const subject = document.createElement('div');
    subject.innerText = givenTicket.subject;
    // storeLabel
    const storeLabel = document.createElement('div');
    storeLabel.innerText = 'Store: ';
    // store
    const store = document.createElement('div');
    store.innerText = givenTicket.store;
    // priorityLabel
    const priorityLabel = document.createElement('div');
    priorityLabel.innerText = 'Priority: ';
    // priority
    const priority = document.createElement('div');
    priority.innerText = givenTicket.priority;
    // titleLabel
    const titleLabel = document.createElement('div');
    titleLabel.innerText = 'Title: ';
    // title
    const title = document.createElement('div');
    title.innerText = givenTicket.title;
    // descriptionLabel
    const descriptionLabel = document.createElement('div');
    descriptionLabel.innerText = 'Description: ';
    // description
    const description = document.createElement('div');
    description.innerText = givenTicket.description;

    //buttons
    const popupButtons = document.createElement('div');
    popupButtons.classList.add('popup-buttons')
    // si
    const btnYes = document.createElement('button');
    btnYes.id = 'btnYes';
    btnYes.innerText = 'SI';
    // no
    const btnNo = document.createElement('button');
    btnNo.id = 'btnNo';
    btnNo.innerText = 'NO';

    popupTicket.appendChild(nameLabel);
    popupTicket.appendChild(name);
    popupTicket.appendChild(lastNameLabel);
    popupTicket.appendChild(lastName);
    popupTicket.appendChild(subjectLabel);
    popupTicket.appendChild(subject);
    popupTicket.appendChild(storeLabel);
    popupTicket.appendChild(store);
    popupTicket.appendChild(priorityLabel);
    popupTicket.appendChild(priority);
    popupTicket.appendChild(titleLabel);
    popupTicket.appendChild(title);
    popupTicket.appendChild(descriptionLabel);
    popupTicket.appendChild(description);

    popupButtons.appendChild(btnYes);
    popupButtons.appendChild(btnNo);

    popup.appendChild(h2);
    popup.appendChild(popupTicket);
    popup.appendChild(popupButtons);

    return popup;
}


// removes all the child from a node
const childRemover = (node) => {
    while( node.hasChildNodes() ){
        node.removeChild(node.lastChild);
    }
}



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
            const tmp = addTicketReq(newTicket);
            console.log("Nuovo ticket aggiunto:");
            body.removeChild(currentPopupAddTicket);
            location.reload();
        })

        const cancel = document.getElementById('cancel');
        cancel.addEventListener('click', () => {
            console.log('cancel');
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

            const buttonCancel = document.getElementById('buttonCancel');
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

            const btnYes = document.getElementById('btnYes');
            btnYes.addEventListener('click', async () => {
                const rawRes = await fetch('/admin/'+currentTicketID, { method: 'DELETE' });
                const res = await rawRes.json();
                console.log('delete res:');
                console.log(res);
                body.removeChild(currentPopupDelete);
                location.reload();
            })

            const btnNo = document.getElementById('btnNo');
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
            let isOpened = drop.attributes[1].value;
            const node_father = e.path[2];
            const node_dropdown = node_father.lastChild;
            if(isOpened == 'false'){
                drop.attributes[1].value = 'true';
                drop.classList.remove('fa-caret-down');
                drop.classList.add('fa-caret-up');
                node_dropdown.classList.add('showDropDownTicket');
            } else if(isOpened == 'true'){
                drop.attributes[1].value = 'false';
                drop.classList.remove('fa-caret-up');
                drop.classList.add('fa-caret-down');
                node_dropdown.classList.remove('showDropDownTicket');
            } else {
                console.log('wuuuuutt');
            }
        });
    });
}
//setup Event Listeners
const setupEventListeners = () => {
    setupEditButtons();
    setupDeleteButtons();
    setupDropdownButtons();
}
setupAddButton();


// (MAIN) when the page loads:
window.onload = async () => {
    let currentQuery = await getCurrentQuery(); // 0: AllTickets, 1: HighPriorityTickets, 2: MediumPriorityTickets, 3: LowPriorityTickets 

    // get querys
    const tempTicketList = await getTicketList();
    const tempHighPriorityTicketList = await getHighPriorityTickets();
    const tempMediumPriorityTicketList = await getMediumPriorityTickets();
    const tempLowPriorityTicketList = await getLowPriorityTickets();

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
        console.log(await setCurrentQuery(0));
        pathName.innerText = 'All Tickets';
        childRemover(ticketList);
        for (let i = 0; i < tempTicketList.length; i++) {
            ticketList.appendChild(ticketMaker(tempTicketList[i]));
        }
        setupEventListeners();
    });

    // setup All Tickets button
    const btnAllTickets = document.getElementById('allTickets');
    btnAllTickets.addEventListener('click', async () => {
        console.log(await setCurrentQuery(0));
        pathName.innerText = 'All Tickets';
        childRemover(ticketList);
        for(let i = 0; i < tempTicketList.length; i++){
            ticketList.appendChild(ticketMaker(tempTicketList[i]));
        }
        setupEventListeners();
    });

    // setup Priority:high button
    const btnHighPriority = document.getElementById('highPriority'); 
    btnHighPriority.addEventListener('click', async () => {
        console.log(await setCurrentQuery(1));
        pathName.innerText = 'High Priority Tickets';
        childRemover(ticketList);
        for(let i = 0; i < tempHighPriorityTicketList.length; i++){
            ticketList.appendChild(ticketMaker(tempHighPriorityTicketList[i]));
        }
        setupEventListeners();
    });

    // setup Priority:medium button
    const btnMediumPriority = document.getElementById('mediumPriority'); 
    btnMediumPriority.addEventListener('click', async () => {
        console.log(await setCurrentQuery(2));
        pathName.innerText = 'Medium Priority Tickets';
        childRemover(ticketList);
        for(let i = 0; i < tempMediumPriorityTicketList.length; i++){
            ticketList.appendChild(ticketMaker(tempMediumPriorityTicketList[i]));
        }
        setupEventListeners();
    });

    // setup Priority:low button
    const btnLowPriority = document.getElementById('lowPriority'); 
    btnLowPriority.addEventListener('click', async () => {
        console.log(await setCurrentQuery(3));
        pathName.innerText = 'Low Priority Tickets';
        childRemover(ticketList);
        for(let i = 0; i < tempLowPriorityTicketList.length; i++){
            ticketList.appendChild(ticketMaker(tempLowPriorityTicketList[i]));
        }
        setupEventListeners();
    });
    
};













// return node ticketList's ticket to show
// const ticketMaker = (id, newName, newLastName, newSubject, newStore, newPriority, newTitle, newDescription) => {
//     // Ticket Container
//     const ticketContainer = document.createElement('div');
//     ticketContainer.classList.add('ticketContainer');
//     // dropDownTicket
//     const dropDownTicket = document.createElement('div');
//     dropDownTicket.classList.add('dropDownTicket');
//     // Ticket
//     const ticket = document.createElement('div');
//     ticket.classList.add('ticket');
//     // drop
//     const drop = document.createElement('i');
//     drop.classList.add('drop', 'fa-solid', 'fa-caret-down');
//     drop.setAttribute('data-opened', 'false');
//     // name
//     const name = document.createElement('div');
//     name.classList.add('name');
//     name.innerText = newName;
//     // lastName
//     const lastName = document.createElement('div');
//     lastName.classList.add('lastName');
//     lastName.innerText = newLastName;
//     // subject
//     const subject = document.createElement('div');
//     subject.classList.add('subject');
//     subject.innerText = newSubject;
//     // store
//     const store = document.createElement('div');
//     store.classList.add('store');
//     store.innerText = newStore;
//     // priority
//     const priority = document.createElement('div');
//     priority.classList.add('priority');
//     priority.innerText = newPriority;
//     // title
//     const title = document.createElement('div');
//     title.classList.add('title');
//     title.innerText = newTitle;
//     // description
//     const description = document.createElement('div');
//     description.classList.add('description');
//     description.innerText = newDescription;
//     // editButtons
//     const editButtons = document.createElement('div');
//     editButtons.classList.add('editButtons');
//     // editTicket
//     const editTicket = document.createElement('i');
//     editTicket.id = id;
//     editTicket.classList.add('edit', 'fas', 'fa-edit');
//     // deleteTicket
//     const deleteTicket = document.createElement('i');
//     deleteTicket.id = id;
//     deleteTicket.classList.add('delete', 'fa-regular', 'fa-trash-can');

//     editButtons.appendChild(editTicket);
//     editButtons.appendChild(deleteTicket);

//     ticket.appendChild(drop);
//     ticket.appendChild(name);
//     ticket.appendChild(lastName);
//     ticket.appendChild(subject);
//     ticket.appendChild(store);
//     ticket.appendChild(priority);
//     ticket.appendChild(editButtons);

//     dropDownTicket.appendChild(title);
//     dropDownTicket.appendChild(description);

//     ticketContainer.appendChild(ticket);
//     ticketContainer.appendChild(dropDownTicket);

//     return ticketContainer;
// } 


// ticketsToShow.push( ticketMaker(
//     tempTicketList[i]._id,
//     tempTicketList[i].name,
//     tempTicketList[i].lastName,
//     tempTicketList[i].subject,
//     tempTicketList[i].store,
//     tempTicketList[i].priority,
//     tempTicketList[i].title,
//     tempTicketList[i].description
// ));