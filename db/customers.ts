export interface Customer {
    id: string;
    name: string;
    email: string; // Added a common field for customers
}

let customers: Customer[] = [
    {id: '101', name: 'Alice Johnson', email: 'alice@example.com'},
    {id: '102', name: 'Bob Smith', email: 'bob.s@provider.net'},
    {id: '103', name: 'Charlie Davis', email: 'charlie.d@webmail.com'}
];

export default customers;