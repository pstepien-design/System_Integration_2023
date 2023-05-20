const users = [
  {
    id: 1,
    email: "user@example.com",
    password: "123456",
  },
  {
    id: 2,
    email: "user2@example.com",
    password: "abcdef",
  },
];

const blogs = [
  {
    id: "1",
    title: "First blog",
    description: "Description of first blog",
    completed: true,
    ownerId: 1,
  },
  {
    id: "2",
    title: "My nice blog",
    description: "Description of the nice blog",
    completed: false,
    ownerId: 2,
  },
];

export const resolvers = {
  Query: {
    blogs: () => {
      return {
        error: [],
        blogs: blogs,
      };
    },

    blog: (_, args) => {
      return {
        error: [],
        blog: blogs.find((blog) => blog.id === args.blogId),
      };
    },
  },
  Mutation: {
    createBlog: (_, args) => {
      const newBlog = {
        id: blogs.length + 1,
        title: args.title,
        description: args.description,
        completed: false,
      };
      blogs.push(newBlog);
      return {
        error: [],
        id: newBlog.id,
      };
    },

    createUser: (_, args) => {
      const newUser = {
        id: users.length + 1,
        email: args.email,
        password: args.password,
      };
      users.push(newUser);
      return {
        error: [],
        id: newUser.id,
      };
    },
  },
};
