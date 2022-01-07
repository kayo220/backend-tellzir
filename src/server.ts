import connection from './database/connection';
import { app } from "./app";
connection.create();
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server port: ${PORT}`))
