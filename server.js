import express from 'express'
import Joi from 'joi'

const app = express()
app.use(express.json())

// Give data to the server
const customers = [
    { id: 1, title: 'George'},
    { id: 2, title: 'Josh'},
    { id: 3, title: 'Tyler'},
    { id: 4, title: 'Alice'},
    { id: 5, title: 'Candice'}
]

/* READ Request Handlers */

// Display the message when the url consists of '/'
app.get('/', (req, res) => {
    res.send('Welcome to Edurekas REST API!');
});

// Display the list of customers when the url consists of api customers
app.get('/api/customers', (req,res) => {
    res.send(customers);
})

// Display the information of specific customer when you mention the id
app.get('/api/customers/:id', (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.id));

    // If there is no valid customer ID, then display an error message
    if (!customer) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Oops... Cant find what you are looking for!</h2>');
    res.send(customer);
});


/* CREATE Request Handler */
// Create new customer info
app.post('/api/customers', (req, res) => {
    //console.log(req.body)
    //const { error } = validateCustomer(req.body);
    /* if (error) {
        res.status(400).send(error.details[0].message)
        return;
    } */

    // Increment the customer id
    const customer = {
        id: customers.length + 1,
        title: req.body.title
    };
    customers.push(customer);
    res.send(customer);
});


/* UPDATE Request Handler */
// Update existing customer information
app.put('/api/customers/:id', (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.id));

    if (!customer) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Oops... Cant find what you are looking for!</h2>');

    /* const { error } = validateCustomer(req.body);
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    } */

    customer.title = req.body.title;
    res.send(customer);
    
});


/* DELETE Request Handler */
// Delete customer details
app.delete('/api/customers/:id', (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    if (!customer) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!</h2>');

    const index = customers.indexOf(customer);
    customers.splice(index, 1);

    res.send(customer);
});

/* Validate Information */
function validateCustomer(customer) { // TODO: fix bugs
    const schema = {
        title: Joi.string().min(3).required()
    };

    return Joi.valid(customer, schema);
    
}

/* PORT ENV VARIABLE */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});
