import swaggerJSDoc, { OAS3Definition, OAS3Options } from 'swagger-jsdoc';

//OAS3 = Open Api Standard 3

const swaggerDefinition: OAS3Definition = {
  openapi: '3.0.0',
  info: {
    title: 'Documentation of MyExpenses API',
    version: '1.0',
  },
  servers: [
    {
      url: 'https://my-expenses-api.adaptable.app',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
    schemas: {
      user: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
          },
          username: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          accounts: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          my_categories: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          createdAt: {
            type: 'string',
          },
          updatedAt: {
            type: 'string',
          },
        },
      },
      transaction: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          value: { type: 'number' },
          account: { type: 'string' },
          created_by: { type: 'string' },
          category: { type: 'string' },
          comment: { type: 'string' },
          transaction_date: { type: 'string' },
          type: { type: 'string' },
          createdAt: { type: 'string' },
          updatedAt: { type: 'string' },
        },
      },
      account: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string' },
          balance: { type: 'number' },
          total_expenses: { type: 'number' },
          total_income: { type: 'number' },
          initial_balance: { type: 'number' },
          currency: { type: 'string' },
          type: { type: 'string' },
          tags: {
            type: 'array',
            nullable: true,
            items: {
              type: 'string',
            },
          },
          color: { type: 'string' },
          created_by: { type: 'string' },
          shared_with: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          transactions: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/transaction',
            },
          },
          createdAt: { type: 'string' },
          updatedAt: { type: 'string' },
        },
      },
    },
  },
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts'],
};

export default swaggerJSDoc(swaggerOptions);
