using { project.db as db } from '../db/schema';

service ProductshopService {
    entity Products as projection on db.Products;
    entity Categories as projection on db.Categories;
}