
export async function postMethod(url, data) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data)
        })
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || `HTTP error! status: ${response.status}`);
        }
        return result;

    } catch (err) {
        console.log("Err =", err);
        throw err;
    }
}

export async function patchMethod(url, data) {
    try {
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || `HTTP error! status: ${response.status}`);
        }
        return result;
    } catch (err) {
        console.log("Err = ", err);
        throw err;
    }
}

export async function getMethod(url) {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            },
            // body: JSON.stringify(data)
        })
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || `HTTP error ! staus ${response.status}`);
        }
        return result;


    } catch (err) {
        console.log("Err = ", err);
        throw err;
    }

}
export async function getMethodOnFilteringProducts(url, filters = {}) {

    // url =   http://localhost:5000/products/filter?category=bat&minPrice=100&maxPrice=500

    try {

        //This line of code is used to create a query string from an object of filters query.
        //query string lets say = categor=bat&discount=3 this portion will be formated with the help of new useSearchParams() and why we used filters= {}? 
        //because filters = {category : "bat", discount = 5 } i hope this makes sense. 

        const queryString = new URLSearchParams(filters).toString();

        console.log("Url =>  ", queryString);

        // const baseUrl = "http://localhost:5000";

        const response = await fetch(`${url}/products/filter?${queryString}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            },
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || `HTTP error ! staus ${response.status}`);
        }
        return result;

        // const response = await fetch(`${url}/products/filter?category=${category}&min=${minPrice}&max=${maxPrice}`, {
        //     method: "GET",
        //     headers: {
        //         "content-type": "application/json"
        //     },
        //     // body: JSON.stringify(data)
        // });
        // const result = await response.json();

        // if (!response.ok) {
        //     throw new Error(result.message || `HTTP error ! staus ${response.status}`);
        // }
        // return result;


    } catch (err) {
        console.log("Err = ", err);
        throw err;
    }
}
// Delete method based on category and id
export async function deleteMethodOnCategoryAndId(category, id) {
    try {
        const url = `http://localhost:5000/delete/${category}/${id}`;
        const response = await fetch(url, {
            method: "DELETE"
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || `HTTP error! Status: ${response.status}`);
        }
        return result;
    } catch (err) {
        console.log("Error:", err);
        throw err;
    }
}
