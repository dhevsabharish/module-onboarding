export type Category = {
  name: string;
  values: string[];
}

export type ModuleSchema = {
  moduleName: string;
  moduleUrl: string;
  protocol: string;
  categories: Category[];
}

export const moduleData = [
  {
    moduleName: 'Module 1',
    moduleUrl: 'https://example.com/module1',
    protocol: 'HTTP',
    categories: [
      {
        name: 'Category 1',
        values: ['Value 1', 'Value 2', 'Value 3'],
      },
      {
        name: 'Category 2',
        values: ['Value 4', 'Value 5', 'Value 6'],
      },
    ],
  },
  {
    moduleName: 'Module 2',
    moduleUrl: 'https://example.com/module2',
    protocol: 'HTTPS',
    categories: [
      {
        name: 'Category 1',
        values: ['Value 7', 'Value 8', 'Value 9'],
      },
      {
        name: 'Category 2',
        values: ['Value 10', 'Value 11', 'Value 12'],
      },
    ],
  },
];

export default moduleData;