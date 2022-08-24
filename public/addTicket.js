const addTicketReq = async (obj) => {
    const rawRes = await fetch('admin/addTicket', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            name: obj.name,
            secondName: obj.secondName,
            subject: obj.subject,
            store: obj.store,
            priority: obj.priority,
            title: obj.title,
            description: obj.description
         })
    });
    const res = await rawRes.json();
    console.log('New Ticket added correctly:');
    console.log(res);
    alert('New Ticket added correctly');
};

const submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    const newTicket = {
        name: document.getElementById("name").value,
        secondName: document.getElementById("secondName").value,
        subject: document.getElementById("subject").value,
        store: document.getElementById("store").value,
        priority: document.getElementById("priority").value,
        title: document.getElementById("title").value,
        description: document.getElementById("description").value
    }
    addTicketReq(newTicket);
});