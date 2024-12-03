/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4qmbeqdk7l57s8o")

  collection.name = "products"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4qmbeqdk7l57s8o")

  collection.name = "product"

  return dao.saveCollection(collection)
})
