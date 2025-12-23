using { managed, cuid } from '@sap/cds/common';
namespace project.db;

entity Products : cuid, managed {
    name : String;
    category : Category;
}

type Category : String enum {
  Drinks; Grocery;
}