import { openDB } from 'idb';
import CONFIG from '../globals/config';

const { DB_NAME, DB_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DB_NAME, DB_VERSION, {
    upgrade(database) {
        database.createObjectStore(OBJECT_STORE_NAME, {
            keyPath: "id",
            autoIncrement: true,
        });
    }
});

const FavoriteResto = {
    async getResto(id) {
    	if (!id) return null;
        return (await dbPromise).get(OBJECT_STORE_NAME, id);
    },
    async getAllResto() {
    	return (await dbPromise).getAll(OBJECT_STORE_NAME);
    },
    async putResto(resto) {
    	if (!Object.prototype.hasOwnProperty.call(resto, "id")) return null;
    	return (await dbPromise).put(OBJECT_STORE_NAME, resto);
    },
    async deleteResto(id) {
    	return (await dbPromise).delete(OBJECT_STORE_NAME, id);
    }
};

export default FavoriteResto;