const Sequelize = require('sequelize');
const { DataTypes, UUID, UUIDV4 } = Sequelize;
const { DB } = require('./config');

const conn = new Sequelize(process.env.DATABASE_URL || `${DB.DIALECT}://${DB.USER}:${DB.PASS}@${DB.HOST}:${DB.PORT}/${DB.DATABASE}`, {
  logging: false
});

const Product = conn.define('product', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  name: DataTypes.STRING
});

const Category = conn.define('category', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  name: DataTypes.STRING
});

Product.belongsTo(Category);
Category.hasOne(Product);

const syncAndSeed = async () => {
  await conn.sync({ force: true });

  const categories = [
    { name: 'Catfoo' },
    { name: 'Catbar' },
    { name: 'Catbazz' }
  ];
  const [ catFoo, catBar, catBazz ] = await Promise.all(categories.map(category => Category.create(category)));

  const products = [
    { name: 'foo', categoryId: catFoo.id },
    { name: 'bar', categoryId: catBar.id },
    { name: 'bazz', categoryId: catBazz.id }
  ];
  const [ foo, bar, bazz ] = await Promise.all(products.map(product => Product.create(product)));
  return {
    products: {
      foo,
      bar,
      bazz
    },
    categories: {
      catFoo,
      catBar,
      catBazz
    }
  }
};

module.exports = {
    syncAndSeed
}




