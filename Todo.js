function ToDo() {
  this.todo = []
}
ToDo.prototype.addTodo = function(item) {
  this.todo.push(item)
}
ToDo.prototype.getItems = function() {
  return this.todo
}
ToDo.prototype.delete = function(id) {
  this.todo = this.todo.filter(item => item.id !== id)
}
ToDo.prototype.complete = function(id) {
  this.todo.find(item => item.id == id).complete = true
}
function DomManipulation() {}
DomManipulation.prototype.init = function() {
  const form = document.createElement("form")
  const input = document.createElement("input")
  const ul = document.createElement("ul")
  input.id = "AddItemInput"
  form.id = "addItemForm"
  form.appendChild(input)
  return {
    form,
    ul
  }
}
/*Dom.displayItem should create the exact element we created in the test
    Here we're creating the method*/
DomManipulation.prototype.displayItem = function(item) {
  const li = document.createElement("li")
  li.innerText = item.title
  return li
}
/* The addTodoEvent processes the form. It requires the form, the method which processes the form's output
  and the DOM which should be changed.*/
DomManipulation.prototype.addTodoEvent = function(
  form,
  createTodo,
  unorderedList
) {
  const displayItem = this.displayItem
  const id = new Date().getUTCMilliseconds()
  form.addEventListener("submit", function(e) {
    e.preventDefault()
    const input = document.querySelector("input").value
    const item = { complete: false, id: id, title: input }
    createTodo(item)
    unorderedList.appendChild(displayItem(item))
  })
}
