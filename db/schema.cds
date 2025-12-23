using { managed, cuid } from '@sap/cds/common';
namespace project.db;

entity Products : cuid, managed {
    name : String;
    category : Category @assert.range: true;
}

type Category : String enum {
  Drinks; Grocery;
}