console.log('admin js');

// variables
const body = document.querySelector('body');
const content = document.getElementById('content');
const ticketList = document.getElementById('ticketList');
const btnAddTicket = document.getElementById('btnAddTicket');
const pathName = document.getElementById('path');

// get stores list
const getStoresList = async () => {
    const rawRes = await fetch('/admin/getStoresList');
    const res = rawRes.json();
    return res;
}

// get subjects list
const getSubjectsList = async () => {
    const rawRes = await fetch('/admin/getSubjectsList');
    const res = rawRes.json();
    return res;
}

// get all the tickets from DB
const getTicketList = async () => {
    const rawRes = await fetch('/admin/getTicketList');
    const res = await rawRes.json();
    return res;
}

//get one ticket by ID
const getTicketByID = async (id) => {
    const rawRes = await fetch('/admin/'+id);
    const res = await rawRes.json();
    return res;
}


// give a ticket node for the DOM
const ticketMaker = (id, newName, newLastName, newSubject, newStore, newPriority, newTitle, newDescription) => {
    // Ticket
    const ticket = document.createElement('div');
    ticket.classList.add('ticket');
    // drop
    const drop = document.createElement('div');
    drop.classList.add('drop');
    drop.innerText = 'V';
    // name
    const name = document.createElement('div');
    name.classList.add('name');
    name.innerText = newName;
    // lastName
    const lastName = document.createElement('div');
    lastName.classList.add('lastName');
    lastName.innerText = newLastName;
    // subject
    const subject = document.createElement('div');
    subject.classList.add('subject');
    subject.innerText = newSubject;
    // store
    const store = document.createElement('div');
    store.classList.add('store');
    store.innerText = newStore;
    // priority
    const priority = document.createElement('div');
    priority.classList.add('priority');
    priority.innerText = newPriority;
    // title
    const title = document.createElement('div');
    title.classList.add('title');
    title.innerText = newTitle;
    // description
    const description = document.createElement('div');
    description.classList.add('description');
    description.innerText = newDescription;
    // editButtons
    const editButtons = document.createElement('div');
    editButtons.classList.add('editButtons');
    // editTicket
    const editTicket = document.createElement('button');
    editTicket.id = id;
    editTicket.classList.add('edit');
    editTicket.innerText = 'E';
    // deleteTicket
    const deleteTicket = document.createElement('button');
    deleteTicket.id = id;
    deleteTicket.classList.add('delete');
    deleteTicket.innerText = 'D';

    editButtons.appendChild(editTicket);
    editButtons.appendChild(deleteTicket);

    ticket.appendChild(drop);
    ticket.appendChild(name);
    ticket.appendChild(lastName);
    ticket.appendChild(subject);
    ticket.appendChild(store);
    ticket.appendChild(priority);
    ticket.appendChild(editButtons);

    return ticket;
} 

const deletePopupMaker = async (id) => {
    const givenTicket = await getTicketByID(id);

    // popup
    const popup = document.createElement('div');
    popup.classList.add('popup-delete');

    // h1
    const h2 = document.createElement('h2');
    h2.innerText = 'Sei sicuro di voler eliminare il ticket: ';

    //ticket div
    const popupTicket = document.createElement('div');
    popupTicket.classList.add('popup-ticket')
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

// when the page load show all the ticket from DB
window.onload = async () => {
    // get all tickets
    const tempTicketList = await getTicketList();
    console.log(tempTicketList);

    // print all tickets
    const ticketsToShow = [];
    for(let i = 0; i < tempTicketList.length; i++){
        ticketsToShow.push(ticketMaker(
            tempTicketList[i]._id, 
            tempTicketList[i].name, 
            tempTicketList[i].lastName,
            tempTicketList[i].subject,
            tempTicketList[i].store,
            tempTicketList[i].priority,
            tempTicketList[i].title,
            tempTicketList[i].description
        ));
        ticketList.appendChild(ticketsToShow[i]);
    }

    //setup add button
    const buttonAddTicket = document.getElementById('btnAddTicket');
    buttonAddTicket.addEventListener('click', () => {
        console.log('btnAddTicket');
    });

    // setup delete buttons
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
    })

    // setup edit buttons
    // const buttonsEditTicket = document.querySelectorAll('.edit');
    // buttonsEditTicket.forEach((button) => {
    //     button.addEventListener('click', async (e) => {
    //         console.log(e.target.id);
    //         const rawRes = await fetch('/admin/'+e.target.id, { 
    //             method: 'PATCH',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: { 
    //                 // da aggiungere voce da modificare
    //             }
    //         });
    //         const res = await rawRes.json();
    //         console.log('edit res:');
    //         console.log(res);
    //     });
    // });

};








