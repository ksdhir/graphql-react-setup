import { find, remove } from 'lodash'


const contactsArray = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
  },
  {
    id: '2',
    firstName: 'Karan',
    lastName: 'Dhir',
  },
  {
    id: '3',
    firstName: 'Jane',
    lastName: 'Eyre',
  }
];

const typeDefs = `
type Contact {
  id: String!
  firstName: String
  lastName: String
}

  type Query {
    contacts: [Contact]
    contact(id: String!): Contact
  }


  type Mutation {
    addContact(id: String!, firstName: String!, lastName: String!): Contact
    updateContact(id: String!, firstName: String, lastName: String): Contact
  }
`;


const resolvers = {
  Query: {
    contacts: () => contactsArray,
    contact: (root, args) => {
      return find(contactsArray, { id: args.id })
    }
  },
  Mutation: {
    addContact: (root, args) => {
      const newContact = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName
      }
      contactsArray.push(newContact)
      return newContact
    },
    updateContact: (root, args) => {
      const contact = find(contactsArray, { id: args.id })
      if (!contact) {
        throw new Error(`Couldn't find contact with id ${args.id}`)
      }
      contact.firstName = args.firstName
      contact.lastName = args.lastName
      return contact
    }
  }
};

export { typeDefs, resolvers }