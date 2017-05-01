CREATE TABLE tasks_to_be_done (
id SERIAL PRIMARY KEY NOT NULL,
task VARCHAR(20),
completed BOOLEAN
)

"INSERT INTO tasks_to_be_done (task , completed ) VALUES ($1 , $2 )", [req.body.theTask, "FALSE"]
"DELETE from tasks_to_be_done  where id=" + req.body.id
"UPDATE tasks_to_be_done  SET completed =" + req.body.isItDone + " where id =" + req.body.id
