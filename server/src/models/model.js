import db from "../config/db.js";

export const getAllModels = (callback) => {
  const query = "SELECT * FROM model";
  db.query(query, (err, data) => {
    if (err) return callback(err, null);
    return callback(null, data);
  });
};
