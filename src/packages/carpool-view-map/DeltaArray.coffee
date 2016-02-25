class @DeltaArray
  items: {}
  buffer: {}

  constructor: (@key)->

  push: (obj)->
    @buffer[@key(obj)] = obj

  flush: (add, remove)->
    #d "First remove items not present in buffer", @items
    for key, item of @items
      #d "Checking in items", key, item
      if not @buffer[key]?
        remove?(item)
        delete @items[key]
    #d "Then add those that are in buffer but not in items", @buffer
    for key, item of @buffer
      #d "Checking in buffer", key, item
      if not @items[key]?
        add?(item)
        @items[key] = item
    @buffer = []

  values: ()->
    _(@items).values();
