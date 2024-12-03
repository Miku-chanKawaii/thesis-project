/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4qmbeqdk7l57s8o")

  collection.updateRule = "@request.auth.id != \"\" && content.created = @request.auth.id"
  collection.deleteRule = "@request.auth.id != \"\" && content.created = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4qmbeqdk7l57s8o")

  collection.updateRule = "id = @request.auth.id"
  collection.deleteRule = "id = @request.auth.id"

  return dao.saveCollection(collection)
})
