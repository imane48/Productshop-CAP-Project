using { managed, cuid } from '@sap/cds/common';
namespace project.db;

entity Products : cuid, managed {
    name : String;
    category : Association to Categories;
}

entity Categories : cuid, managed {
    name : String;
    products: Association to many Products on products.category = $self;
}