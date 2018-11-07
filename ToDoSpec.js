describe("Testing DOM manipulation", function() {
  let Dom, item, todo
  beforeEach(function() {
    todo = new ToDo()
    Dom = new DomManipulation()
    item = {
      complete: false,
      id: 1,
      title: "some Title"
    }
  })
  //to initialize the DOM
  it("should initialise HTML", function() {
    const form = document.createElement("form")
    const input = document.createElement("input")
    const ul = document.createElement("ul")
    input.id = "AddItemInput"
    form.id = "addItemForm"
    form.appendChild(input)
    expect(Dom.init().form).toEqual(form)
    expect(Dom.init().ul).toEqual(ul)
  })
  /*When a user submits an item we want a list DOM element to be created. 
    Since this is testing the reaction of the element and not the form submition,
    we faked the data, pretending it came from the form (item is the object we created in beforeEach method)*/
  it("should create item", function() {
    const element = Dom.displayItem(item)
    const result = document.createElement("li")
    result.innerText = item.title
    expect(element).toEqual(result)
  })
  /* We create the form and a hard-coded input, which the user would otherwise add. 
    Then the form is injected to the DOM! That's the only way to trigger the event. 
    Then we run Dom.addTodoEvent passing it the form, the todo.addTodo method and an un ordered list.
    Finally we "fake" the form submition, and Remove the form from the DOM (otherwise it would be seen in the browser, 
    when loading SpecRunner.html).
    At the end, we expect an item to be added, with the same title we added to the form's input. */
  it("should trigger form and add item to todo array", function() {
    const form = document.createElement("form")
    form.innerHTML = `<input value="get milk" />
      <button type="submit" />`
    document.body.appendChild(form)
    const ul = document.createElement("ul")
    Dom.addTodoEvent(form, todo.addTodo.bind(todo), ul)
    form.getElementsByTagName("button")[0].click()
    document.body.removeChild(form)
    expect(todo.todo[0].title).toEqual("get milk")
  })
})
