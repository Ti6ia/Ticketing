console.log('admin js');

// variables
const content = document.getElementById('content');
const ticketList = document.getElementById('ticketList');
const btnAddTicket = document.getElementById('btnAddTicket');
const pathName = document.getElementById('path');


// get all the tickets from DB
const getTicketList = async () => {
    const rawRes = await fetch('/admin/getTicketList');
    const res = await rawRes.json();
    return res;
}

// give a ticket node for the DOM
const ticketMaker = (newName, newLastName, newSubject, newStore, newPriority, newTitle, newDescription) => {
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
    const editTicket = document.createElement('div');
    editTicket.classList.add('edit');
    editTicket.innerText = 'E';
    // deleteTicket
    const deleteTicket = document.createElement('div');
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

// when the page load show all the ticket from DB
window.onload = async () => {
    const tempTicketList = await getTicketList();
    const ticketsToShow = [];
    for(let i = 0; i < tempTicketList.length; i++){
        ticketsToShow.push(ticketMaker(
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
};







