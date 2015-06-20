# Lesson 6 - Single Page Application

# m = require "mithril"

myComp =
  controller: ->
    log "controller"
    return

  view: ->
    log "view"
    m "div", "helo"

App = view: ->
  [myComp]

m.mount document.body, App
