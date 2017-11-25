var graphql = require('graphql');

// Here is some dummy data to make this piece of code simpler.
// It will be changeable after introducing mutation.

var TODOs = [{
    "id": 1445,
    "title": "Read emails",
    "completed": false
  },
  {
    "id": 1446,
    "title": "Buy orange",
    "completed": true
  }
];

var TodoType = new graphql.GraphQLObjectType({
  name: 'todo',
  fields: function () {
    return {
      id: {
        type: graphql.GraphQLInt
      },
      title: {
        type: graphql.GraphQLString
      },
      completed: {
        type: graphql.GraphQLBoolean
      },
    };
  },
});

var queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    todos: {
      type: new graphql.GraphQLList(TodoType),
      resolve: function () {
        return TODOs;
      }
    }
  }
});

var MutationAdd = {
  type: new graphql.GraphQLList(TodoType),
  description: 'Add todo',
  args: {
    title: {
      name: 'Todo title',
      type: new graphql.GraphQLNonNull(graphql.GraphQLString)
    }
  },
  resolve: (root, {
    title
  }) => {
    TODOs.push({
      id: (new Date().getTime()),
      title: title,
      completed: false
    });
    return TODOs;
  }
};

var MutationType = new graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    add: MutationAdd
  }
});

module.exports = new graphql.GraphQLSchema({
  query: queryType,
  mutation: MutationType
});
