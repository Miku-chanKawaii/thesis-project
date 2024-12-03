/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4qmbeqdk7l57s8o")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vpl9nilp",
    "name": "category",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "design",
        "drawing-painting",
        "music",
        "video",
        "photography",
        "comics",
        "books",
        "other"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4qmbeqdk7l57s8o")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vpl9nilp",
    "name": "catagory",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "design",
        "drawing-painting",
        "music",
        "video",
        "photography",
        "comics",
        "books",
        "other"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
