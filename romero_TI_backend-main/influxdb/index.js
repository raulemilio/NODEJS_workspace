//npm install --save influx
const Influx = require("influx");

const measurement_name="log_device";

const influx = new Influx.InfluxDB({
  host: "localhost",
  database: "cenex_remotelabDB_influx",
  schema: [
    {
      measurement: measurement_name,
      fields: {
        dev_id: Influx.FieldType.INTEGER,
        state: Influx.FieldType.STRING,
      },
      tags: ["lr_id"],
    },
  ],
});

influx
  .getDatabaseNames()
  .then((names) => {
    if (!names.includes("datosSensores")) {
      return influx.createDatabase("datosSensores");
    }
  })
  .catch((err) => {
    console.error(`Error creating Influx database!`);
  });

  module.exports = influx;