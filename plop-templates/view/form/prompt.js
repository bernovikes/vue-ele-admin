const { notEmpty } = require('../../utils.js')
module.exports = {
  description: 'generate a table view',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'view name please',
      validate: notEmpty('name')
    },
    {
      type: 'input',
      name: 'path',
      message: 'view file path  please',
      validate: notEmpty('path')
    },
    {
      type: 'input',
      name: 'api',
      message: 'table view model api file',
      validate: notEmpty('api')
    },
    {
      type: 'input',
      name: 'model',
      message: 'table view model',
      validate: notEmpty('model')
    }
  ],
  actions: data => {
    const path = '{{path}}'
    const name = '{{name}}'
    const api = '{{api}}'
    const model = '{{model}}'
    const actions = [
      {
        type: 'add',
        path: `src/views/${path}.vue`,
        templateFile: 'plop-templates/view/form/index.hbs',
        data: {
          name,
          api,
          model
        }
      }
    ]
    return actions
  }
}
