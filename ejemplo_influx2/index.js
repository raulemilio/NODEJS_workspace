/**
 * In this example we'll create a server which has an index page that prints
 * out "hello world", and a page `http://localhost:3000/times` which prints
 * out the last ten response times that InfluxDB gave us.
 *
 *  prueba http://localhost:3005/times
 * Get started by importing everything we need!
 */

const Influx = require("influx");
const express = require("express");
const http = require("http");
const os = require("os");

const app = express();

/**
 * Create a new Influx client. We tell it to use the
 * `express_response_db` database by default, and give
 * it some information about the schema we're writing.
 */

const influx = new Influx.InfluxDB({
  host: "localhost",
  database: "datosSensores",
  schema: [
    {
      measurement: "registro",
      fields: {
        index: Influx.FieldType.INTEGER,
        dato: Influx.FieldType.INTEGER,
      },
      tags: ["device"],
    },
  ],
});
for(let i=0;i<5;i++){
influx
.writePoints([
  {
    measurement: "registro2",
    tags: { device: "device_1"},
    fields: { index:i, dato:i },
  },
])
.catch((err) => {
  console.error(`Error saving data to InfluxDB! ${err.stack}`);
});
}


/**
 * Next we define our middleware and hook into the response stream. When it
 * ends we'll write how long the response took to Influx!
 */
/*
app.use((req, res, next) => {
  res.on("finish", () => {
    influx
      .writePoints([
        {
          measurement: "registro",
          tags: { device: "device_1"},
          fields: { index:1, dato:10 },
        },
      ])
      .catch((err) => {
        console.error(`Error saving data to InfluxDB! ${err.stack}`);
      });
  });
  return next();
});

app.get("/", function (req, res) {
  setTimeout(() => res.end("Hello world!"), Math.random() * 500);
});
/*
app.get("/times", function (req, res) {
  influx
    .query(
      `
    select * from response_times
    where host = ${Influx.escape.stringLit(os.hostname())}
    order by time desc
    limit 10
  `
    )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).send(err.stack);
    });
});
*/
/**
 * Now, we'll make sure the database exists and boot the app.
 */
influx
  .getDatabaseNames()
  .then((names) => {
    if (!names.includes("datosSensores")) {
      return influx.createDatabase("datosSensores");
    }
  })
  .then(() => {
    http.createServer(app).listen(3005, function () {
      console.log("Listening on port 3005");
    });
  })
  .catch((err) => {
    console.error(`Error creating Influx database!`);
  });