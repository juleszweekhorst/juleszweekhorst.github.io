import React, { useState, useEffect } from "react";
import initSqlJs from "sql.js";

// Required to let webpack 4 know it needs to copy the wasm file to our assets
import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm";

const DbContext = React.createContext('DEFAULT');

function DbProvider({children}) {
  const [db, setDb] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(async () => {
    // sql.js needs to fetch its wasm file, so we cannot immediately instantiate the database
    // without any configuration, initSqlJs will fetch the wasm files directly from the same path as the js
    // see ../craco.config.js
    try {
      const sqlPromise = initSqlJs({ locateFile: () => sqlWasm });
      const path = process.env.PUBLIC_URL + "/articles.sqlite";
      const dataPromise = fetch(path).then(async res => res.arrayBuffer());
      const [SQL, buf] = await Promise.all([await sqlPromise, await dataPromise])
      const database = await new SQL.Database(new Uint8Array(buf));
      console.log("FIRED");
      setDb(database);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  }, []);

  return <DbContext.Provider value={{loading, db}}>{children}</DbContext.Provider>
}

export {DbContext, DbProvider}