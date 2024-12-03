/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("unxps5b267fs234")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3fk3isqv",
    "name": "content",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "yvc111owjkb92aa",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("unxps5b267fs234")

  // remove
  collection.schema.removeField("3fk3isqv")

  return dao.saveCollection(collection)
})
