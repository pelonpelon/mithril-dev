'use strict'

var Employees = [
  { name: 'Bertha',
    sex: 'female',
    position: 'Board of Directors',
    salary: 1000000
  },
  {
    name: 'John',
    sex: 'male',
    position: 'CEO',
    salary: 200000
  },
  {   
    name: 'Bob',
    sex: 'male',
    position: 'HR',
    salary: 100000
  },
  {
    name: 'Mary',
    sex: 'female',
    position: 'HR',
    salary: 40000
  },
  {
    name: 'Linda',
    sex: 'female',
    position: 'Marketing',
    salary: 30000
  }
]

const App = {}

App.controller = function(){
  this.setMinimum = function(value){
    this.minimum = value
  }.bind(this)
}

App.view = function (ctrl, attrs) {
  return m("div.app", [
    m.component(EmployeeList),
    m('hr'),
    females(),
    m('hr'),
    richWomen(100000),
    m('hr'),
    HR(),
    m('hr'),
    m('h1', 'FILTER'),
    m.component(females(), { minimum: ctrl.minimum || 30000 }),
    m('hr'),
    m.component(males(), { minimum: ctrl.minimum || 100000 }),
    m('hr'),
    m.component(females(), { minimum: ctrl.minimum || 30000, position: 'HR' }),
    m('hr'),
    m.component(malesInHR(), {minimum: ctrl.minimum || 100000}),
    m('hr'),
    m('input[placeholder=Minimum Salary]', {
      onchange: m.withAttr('value', ctrl.setMinimum), value: ''
    }),
    m('a', {href: '/page1', config: m.route}, 'Go to Page 1'),
    m('a', {href: '/pages/calendar.html'}, 'Calendar')
  ])
}

const EmployeeList = {
  view: function(ctrl, attrs){
    var attrs = attrs || {}
    return m('div', [
      m('div', (attrs.position || 'All') + ' ' +
        (attrs.sex || 'Employee') + (attrs.minimum ? ('s with salary above: $' + attrs.minimum) : 's')
       ),
      Employees.map(function(emp){
        if ((attrs.sex === emp.sex || !attrs.sex) &&
            emp.salary > (attrs.minimum || 0) &&
           (attrs.position === emp.position || !attrs.position)) {
          return m('div.employee', emp.name + ': ' + emp.position)
        }
      })
    ])
  }
}

function HR(){
  return m.component(EmployeeList, {position: 'HR' })
}
function females(){
  return m.component(EmployeeList, { sex: 'female' })
}
function richWomen(salary){
  return m.component(females(), { minimum: salary })
}
function males(){
  return m.component(EmployeeList, { sex: 'male' })
}
function malesInHR(){
  return m.component(males(), { position: 'HR' })
}

const Pages = {
  controller: function(){},
  view: function(ctrl, attrs){
    return m('div', [ 
      m('div', 'Page ' + attrs.page),
      m('a', {href: '/', config: m.route}, 'Go Home'),

     ])
  }
}

function pages(){
  return {

  }
}

m.route(document.body, '/', {
   '/': App,
   '/page1': m.component(Pages, {page: 1}) 
})


