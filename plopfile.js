const viewTableGenerator = require('./plop-templates/view/table/prompt')
const viewFormGenerator = require('./plop-templates/view/form/prompt')
const componentGenerator = require('./plop-templates/component/prompt')
const ApiGenerator = require('./plop-templates/api/prompt')

module.exports = function(plop) {
  plop.setGenerator('view:table', viewTableGenerator)
  plop.setGenerator('view:form', viewFormGenerator)
  plop.setGenerator('component', componentGenerator)
  plop.setGenerator('api', ApiGenerator)
}
