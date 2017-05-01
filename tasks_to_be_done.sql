CREATE TABLE tasks_to_be_done (
id SERIAL PRIMARY KEY NOT NULL,
task VARCHAR(20),
completed BOOLEAN
)

"INSERT INTO tasks_to_be_done (task , completed ) VALUES ($1 , $2 )", [req.body.theTask, "FALSE"]
"DELETE from tasks_to_be_done  where id=" + req.body.id


//Program would work if I knew how to write the line-
                              UPDATE tasks_to_be_done
                              if completed = TRUE THEN completed = FALSE,
                              if completed = FALSE THEN completed = TRUE
                              WHERE id = req.body
