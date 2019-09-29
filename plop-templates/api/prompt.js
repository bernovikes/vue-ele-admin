const { notEmpty } = require('../utils.js')
const fs = require('fs')
module.exports = {
  description: 'generate restful api function',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'api function please',
      validate: notEmpty('name')
    },
    {
      type: 'input',
      name: 'url',
      message: 'api url please',
      validate: notEmpty('url')
    },
    {
      type: 'input',
      name: 'method',
      message: 'api method please',
      validate: notEmpty('method')
    },
    {
      type: 'input',
      name: 'params',
      message: 'api params please',
      validate: notEmpty('params')
    },
    {
      type: 'input',
      name: 'file',
      message: 'api file please'
    }
  ],
  actions: (data, node, module) => {
    const name = '{{name}}'
    const url = '{{url}}'
    const params = '{{params}}'
    const file = data.file
    const basepath = arguments[2]['exports']['basePath']
    const method = '{{ lowerCase method }}'
    const filename = `src/api/${file}.js`
    const exist = fs.existsSync(`${basepath}/${filename}`)
    const template = {
      true: 'plop-templates/api/exist.hbs',
      false: 'plop-templates/api/index.hbs'
    }
    const actions = [
      {
        type: exist ? 'append' : 'add',
        path: filename,
        templateFile: template[exist],
        data: {
          name,
          exist,
          url,
          method,
          params
        }
      }
    ]
    return actions
  }
}
