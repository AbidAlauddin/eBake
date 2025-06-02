module.exports = ({ env }) => ({
  connection: {
    client: 'sqlite',
    connection: {
      filename: env('eBake_db', './data/mydb.sqlite'),
    },
    useNullAsDefault: true,
  },
});
