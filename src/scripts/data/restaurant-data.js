import ENDPOINT from '../globals/api-endpoint';

class DataSource {
    static async List() {
    	const response = await fetch(ENDPOINT.LIST);
    	const responseJson = await response.json();
    	return responseJson.restaurants;
    }

    static async Details(id) {
    	const response = await fetch(ENDPOINT.DETAIL(id));
    	return response.json();
    }
}

export default DataSource;