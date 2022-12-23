import postgres from "https://deno.land/x/postgresjs@v3.3.2/mod.js";

const PGPASS = Deno.env.get("PGPASS");

let host
let port
let database
let username
let password

if(PGPASS){
  PGPASS = PGPASS.trim()
  const PGPASS_PARTS = PGPASS.split(":")
  host = PGPASS_PARTS[0];
  port = PGPASS_PARTS[1];
  database = PGPASS_PARTS[2];
  username = PGPASS_PARTS[3];
  password = PGPASS_PARTS[4];
}else{
  host = Deno.env.get("PGHOST");
  port = Deno.env.get("PGPORT");
  database = Deno.env.get("PGDATABASE");
  username = Deno.env.get("PGUSERNAME");
  password = Deno.env.get("PGPASSWORD");
}


const sql = postgres({
  host, port, database, username, password
});

export default sql