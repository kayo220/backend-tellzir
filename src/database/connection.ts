import { createConnection, getConnection } from 'typeorm';
const connection = {
    async create() {
        if (process.env.NODE_ENV == 'test') {
            console.log("Aqui")
            await createConnection({
                "type": "sqlite",
                "database": "./src/database/test_database.sqlite",
                "migrations": [
                    "./src/database/migrations/*.ts"
                ],
                "entities": [
                    "./src/entities/*.ts"
                ],
                "cli": {
                    "migrationsDir": "./src/database/migrations"
                }
            });

        } else {
            console.log("Aqui2")

            await createConnection();
        }
    },

    async close() {
        await getConnection().close();
    },

    async clear() {
        const connection = getConnection();
        const entities = connection.entityMetadatas;

        entities.forEach(async (entity) => {
            const repository = connection.getRepository(entity.name);
            await repository.query(`DELETE FROM ${entity.tableName}`);
        });
    },
};

export default connection;