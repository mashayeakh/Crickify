const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, Binary, CURSOR_FLAGS, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;


const app = express();
app.use(cors())
app.use(express.json());
const baseUrl = "http://localhost:5000"


app.get("/", (req, res) => {
    res.send("Testing.");
})

const url = "mongodb://localhost:27017";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(url, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        await client.connect();

        //db
        const database = client.db("crickify-usersDB");

        const userCollection = database.collection("users");
        const batsCollection = database.collection("bats");
        const categoryCollection = database.collection("cateogies");
        const brandCollection = database.collection("brands");
        const handleTypeCollection = database.collection("handle-type");
        const woodTypeCollection = database.collection("wood-type");
        const cricketBrandCollection = database.collection("global-brands");
        const ballsCollection = database.collection("balls");
        const accesoriesCollection = database.collection("accessories");
        const globalBrandWiseProducts = database.collection("global-brands-products");
        const jerseyCollection = database.collection("jersey");
        const bootsCollection = database.collection("boots");


        //! Post method to create users (sign up)
        app.post("/users", async (req, res) => {
            const data = req.body;
            console.log("Data to be inserted = ", data);

            // console.log(data.email);

            const existingEmail = await userCollection.findOne({ email: data.email });

            if (existingEmail) {
                // alert("du");
                return res.status(400).send(
                    {
                        message: "duplicate email found",
                    }
                );
            }
            const result = await userCollection.insertOne(data);

            if (result.acknowledged === true) {
                res.send(result);
                console.log("Result = ", result);
            }

        })

        //! Patch method to insert a specific col in the existing user while logging.
        app.patch("/login", async (req, res) => {
            const existingEmail = req?.body?.email;

            //matching the existing email
            const filter = { email: existingEmail };

            //insert teh col
            const updateInfo = {
                $set: {
                    lastSignInTime: req?.body?.currDate
                }
            }

            const result = await userCollection.updateOne(filter, updateInfo);

            if (result.modifiedCount > 0 || result.matchedCount === 1) {

                // console.log(result);
                res.send(result, { message: "Login time updated!" });
            } else {
                res.status(404).send({ message: "User not found!" });
            }

            // console.log("Logged in data = ", data);
        })

        // app.patch("/login", async (req, res) => {
        //     const existingEmail = req?.body?.email;

        //     // Matching the existing email
        //     const filter = { email: existingEmail };

        //     // Update the login time
        //     const updateInfo = {
        //         $set: {
        //             lastSignInTime: req?.body?.currDate
        //         }
        //     };

        //     try {
        //         const result = await userCollection.updateOne(filter, updateInfo);

        //         // If user is found and the login time was updated
        //         if (result.modifiedCount > 0 || result.matchedCount === 1) {
        //             // Fetch the user data including the userId
        //             const user = await userCollection.findOne(filter, { projection: { _id: 1, email: 1, displayName: 1 } });

        //             // Send the user data and userId in the response
        //             res.send({
        //                 message: "Login time updated!",
        //                 userId: user._id, // Send the userId from backend
        //                 email: user.email,
        //                 displayName: user.displayName,
        //                 // other data you might want to send
        //             });
        //         } else {
        //             res.status(404).send({ message: "User not found!" });
        //         }
        //     } catch (err) {
        //         res.status(500).send({ message: "Error during login!", error: err.message });
        //     }
        // });


        //! ------------------------ Product Management ----------------------------

        //* add product through post method
        app.post("/add-product", async (req, res) => {
            try {
                const submittedData = req.body;
                const category = submittedData.category;

                // Add the current timestamp to the submitted data
                submittedData.dateAdded = new Date(); // current date and time

                console.log("Category:", category);
                console.log("Data to be submitted:", submittedData);

                let result;

                if (category === "Bat" || category === "bat") {
                    result = await batsCollection.insertOne(submittedData);
                } else if (category === "Ball" || category === "ball") {
                    result = await ballsCollection.insertOne(submittedData);
                } else if (category === "helmet" ||
                    category === "pad" ||
                    category === "thigh pad" ||
                    category === "gloves" ||
                    category === "guard"
                ) {
                    result = await accesoriesCollection.insertOne(submittedData);
                }

                if (!result) {
                    return res.status(400).send({
                        message: "Invalid or missing category. Product not added.",
                        status: "error"
                    });
                }

                if (result.acknowledged) {
                    return res.status(201).send({
                        ...result,
                        message: "Product added successfully",
                        status: "success",
                        insertedId: result.insertedId
                    });
                } else {
                    return res.status(500).send({
                        message: "Failed to add",
                        status: "error"
                    });
                }

            } catch (error) {
                console.log("Error while adding code:", error.message);
                return res.status(500).send({
                    message: "Internal server error",
                    status: "error",
                    error: error.message
                });
            }
        });



        //* --------------------------------------Filtering Starts--------------------------------------------------------

        //display proucts based on price
        // ✅ Price Filter Route
        // the url = http://localhost:5000/products/filter?category=bat&minPrice=100&maxPrice=500

        app.get("/products/filter", async (req, res) => {
            const category = req.query.category;
            const minPrice = parseFloat(req.query.min) || 0;
            const maxPrice = parseFloat(req.query.max) || Infinity;
            const discount = parseFloat(req.query.discount);

            const filterQuery = {};

            // Common filters
            if (discount) {
                filterQuery.discount = { $gte: discount };
            }

            if (!isNaN(minPrice) || !isNaN(maxPrice)) {
                filterQuery.price = {};
                if (!isNaN(minPrice)) {
                    filterQuery.price.$gte = minPrice;
                }
                if (!isNaN(maxPrice)) {
                    filterQuery.price.$lte = maxPrice;
                }
            }

            let result;

            if (category.toLowerCase() === "bat") {
                filterQuery.category = { $regex: new RegExp("bat", "i") };
                result = await batsCollection.find(filterQuery).toArray();
            } else if (category.toLowerCase() === "ball") {
                filterQuery.category = { $regex: new RegExp("ball", "i") };
                result = await ballsCollection.find(filterQuery).toArray();
            }
            else if (category.toLowerCase() === "guard" || category.toLowerCase() === "gloves" || category.toLowerCase() === "helmet" || category.toLowerCase() === "pad" || category.toLowerCase() === "thigh pad") {
                // For accessories, you don't filter by category = accessories
                // Instead, just fetch from accessories collection
                result = await accesoriesCollection.find(filterQuery).toArray();
            }
            else {
                // If no category matches
                result = [];
            }

            console.log("Filtered Result = ", result);
            res.send(result);
        });


        // // filter based on the discount. 
        // app.get("/products", async (req, res) => {

        //     //http://localhost:5000/products?category=electronics&discount=30

        //     //get the category & discount
        //     const category = req.query.category;
        //     console.log("Category : ", category);

        //     const discount = parseFloat(req.query.discount) || 0;
        //     console.log("Discount = ", discount);

        //     // find the discount and category and 
        //     const foundData = await batsCollection.find({
        //         category: {
        //             $regex: new RegExp(category, "i")
        //         },
        //         discount: {
        //             $gte: discount,
        //         }
        //     }).toArray();

        //     console.log("Discounted Data = ", foundData);
        //     console.log("Discounted Data length= ", foundData.length);


        //     res.send({
        //         send: foundData,
        //         message: "Found !!",
        //     })
        // })




        //* ----------------------------------------Filtering Ends------------------------------------------------------

        //* fetch all the product through get method
        app.get("/products", async (req, res) => {
            const cursor = batsCollection.find();
            const cursor2 = ballsCollection.find();
            const cursor3 = jerseyCollection.find();
            const cursor4 = accesoriesCollection.find();
            const cursor5 = bootsCollection.find();

            const result = await cursor.toArray();
            const result2 = await cursor2.toArray();
            const result3 = await cursor3.toArray();
            const result4 = await cursor4.toArray();
            const result5 = await cursor5.toArray();

            const compinedResult = [...result, ...result2, ...result3, ...result4, ...result5];
            console.log("compinedResult ", compinedResult);
            console.log("compinedResult ", compinedResult.length);


            res.send(compinedResult);
        })

        // // combined api for bat and bgall
        // app.get("/all-products", async (req, res) => {
        //     const cursor = batsCollection.find();
        //     const cursor2 = ballsCollection.find();
        //     const result = await cursor.toArray();
        //     const result2 = await cursor2.toArray();
        //     console.log(result);
        //     // console.log(typeof result);
        //     // console.log(Array.isArray(result));

        //     const cat = result.map((r, index) => (
        //         r.category
        //     ))
        //     const cat2 = result.map((r, index) => (
        //         r.category
        //     ))

        //     console.log("Catogories", cat);
        //     console.log("Catogories", cat2);


        //     // console.log("Category = ", result.category);
        //     res.send(result);
        // })

        //* add category through post method
        app.post("/add-category", async (req, res) => {

            try {
                const submittedCategory = req.body;

                console.log("Category to be submitted = ", submittedCategory);
                const result = await categoryCollection.insertOne(submittedCategory);

                if (result.acknowledged) {
                    return res.status(201).send({
                        ...result,
                        message: "Category added successfully",
                        status: "success",
                        insertedId: result.insertedId,
                    })
                } else {
                    return res.status(500).send({
                        message: "Failed to add",
                        status: "error",
                    })
                }

                // console.log("Result = ", result);
                // res.send(result);
            } catch (error) {
                console.log("Error while adding code: ", error.message);
                return res.status(500).send({
                    message: "Intenal server error",
                    status: "error",
                    "error": error.message,
                })
            }
        })



        //* fetch all the category through get method
        app.get("/categories", async (req, res) => {
            const cursor = categoryCollection.find();
            const result = await cursor.toArray();
            // console.log(result);
            res.send(result);
        })


        //* fetch products by category through get method
        app.get("/products/:category", async (req, res) => {
            const category = req.params.category.toLowerCase();
            console.log(`${category} category triggered...`);

            let result;

            if (category === "bat" || category === "bats") {
                result = await batsCollection.find().toArray();
            } else if (category === "ball" || category === "balls") {
                result = await ballsCollection.find().toArray();
            } else if (
                category === "helmet" ||
                category === "pad" ||
                category === "thigh pad" ||
                category === "gloves" ||
                category === "guard"
            ) {
                result = await accesoriesCollection.find().toArray();
            } else {
                return res.status(404).send({ message: "Category not found" });
            }

            console.log("Result = ", result);
            console.log("Length = ", result.length);

            res.send(result); // ✅ Send data after fetching from correct collection
        });



        //* find all the accesories
        app.get("/all-accesories", async (req, res) => {
            const cursor = accesoriesCollection.find();
            const result = await cursor.toArray();

            res.send(result);
        })


        //* For specific product by id
        app.get("/product/:category/:id", async (req, res) => {

            const { category, id } = req.params;

            console.log("Id selected = ", id);
            console.log("Category selected = ", category);

            // const f = { id, category }

            if (!ObjectId.isValid(id)) {
                return res.status(400).send({ message: "Invalid products id" })
            }

            const query = { _id: new ObjectId(id) };

            let collections;
            if (category === "bat" || category === "bats") {
                collections = batsCollection;
                // console.log("Collections : ", collections);
            } else if (category === "ball" || category === "balls") {
                collections = ballsCollection
                // console.log("Collections : ", collections);
            } else if (
                category === "helmet" ||
                category === "pad" ||
                category === "thigh pad" ||
                category === "gloves" ||
                category === "guard"
            ) {
                collections = accesoriesCollection;
            } else if (category === "jersey") {
                collections = jerseyCollection;
            } else if (
                category === "boots" || category === "boot") {
                collections = bootsCollection;
            }

            else {
                console.log("Category is not found...");
                return res.status(400).send({ message: "Invalid category" })
            }

            const result = await collections.findOne(query);
            if (result) {
                console.log("Result = ", result);
                res.send(result);
            } else {
                res.status(404).send({ message: "Product is not found.. " })
            }
        })

        //* Get all the date for bats */
        app.get("/lastest_products", async (req, res) => {
            // const cursor = batsCollection.find({}, {
            //     projection: {
            //         _id: 0, //this is ignored
            //         dateAdded: 1
            //     }
            // });
            // const result = await cursor.toArray();
            // console.log("All Date = ", result);
            // res.send(result);


            //? We need to get the sort the date for geting the latest one dateAdded - 1 then make the limit. 
            //? here limit means how many date we want to get from the database

            //bat
            const lastestBat = await batsCollection
                .find({})
                .sort({ dateAdded: -1 })
                .limit(2)
                .toArray();

            //ball
            const lastestBall = await ballsCollection
                .find({})
                .sort({ dateAdded: -1 })
                .limit(2)
                .toArray();

            //jersey
            const lastestJersey = await jerseyCollection
                .find({})
                .sort({ dateAdded: -1 })
                .limit(1)
                .toArray();
            //boots
            const lastestBoots = await bootsCollection
                .find({})
                .sort({ dattAdded: -1 })
                .limit(1)
                .toArray();
            //accessories
            const lateAccessories = await accesoriesCollection
                .find({})
                .sort({ dateAdded: -1 })
                .limit(1)
                .toArray();




            // console.log("Result ", lastestBat);

            const allDates = [...lastestBat, ...lastestBall, ...lastestJersey, ...lastestBoots, ...lateAccessories]

            console.log("Result ", allDates);
            console.log("length", allDates.length);
            res.send(allDates);
        })


        //* get all the category from accessories
        app.get("/accessories", async (req, res) => {
            const cursor = accesoriesCollection.find();
            const allAcc = await cursor.toArray();
            console.log("All Acc = ", allAcc);

            const result = allAcc.map(a => a.category);
            console.log("Result  = ", result);


            res.send(allAcc);
        })


        //* add brand and store the created category mainly relashipship through post method
        app.post(("/add-brand"), async (req, res) => {
            try {
                const { title, category } = req.body;

                // console.log("name and category", title, category);

                //first grad the all information of the selected category. 
                const isCategoryFound = await categoryCollection.findOne({ title: category });

                console.log("isCategoryFound ", isCategoryFound);
                if (!isCategoryFound) {
                    return res.status(400).send({
                        message: "Category not found",
                        status: "error",
                    })
                }
                // console.log("isCategoryFound ", isCategoryFound._id);

                const insertInto = {
                    title,
                    category_title: isCategoryFound?.title,
                    cat_id: isCategoryFound?._id,
                }

                const result = await brandCollection.insertOne(insertInto);
                if (result.acknowledged) {
                    return res.status(201).send({
                        ...result,
                        message: "Createtd Successfully",
                        status: "success",
                    })
                } else {
                    return res.status(500).send({
                        ...result,
                        message: "Failed to create",
                        status: "error",
                    })
                }

            }
            catch (error) {
                console.log("Error while adding code: ", error.message);
                return res.status(500).send({
                    message: "Intenal server error",
                    status: "error",
                    "error": error.message,
                })
            }
        })

        //* get all brands name only
        app.get("/brands", async (req, res) => {
            const cursor = brandCollection.find();
            const result = await cursor.toArray();
            // console.log("Brands Info ", result);
            // res.send("All Brands : ", result);
            res.send(result);
        })

        app.get("/brands/:catName", async (req, res) => {
            const catName = req.params.catName;

            console.log("\nCaterogy Namr ", catName);

            const cateInfo = await categoryCollection.findOne({ title: { $regex: new RegExp(`^${catName}$`, 'i') } });
            console.log("Cate info", cateInfo);



            const cat_id = cateInfo._id;

            const brand = await brandCollection.find().toArray();

            console.log("\n Brand = ", brand.length);
            console.log("\n Brand = ", brand);


            const name = brand.map(b => b.category_title)
            console.log("category name inside the brand ", name);

            // console.log("\n Brand Id = ", brand._id);

            // const idOnly = brand?.map(b => b._id);
            // console.log("ID = ", idOnly);

            const filteredId = brand?.filter(b => b?.category_title === cateInfo.title)



            // brand?.filter(b=>);

            console.log("filtered Id", filteredId.length);
            console.log("filtered Id", filteredId);

            res.send(filteredId);
        });

        //* add handle type and wood type
        app.post("/add-handle", async (req, res) => {
            const handle = req.body;
            console.log("handle = ", handle);
            const result = await handleTypeCollection.insertOne(handle);
            res.send(result);
        })
        app.post("/add-wood", async (req, res) => {
            const wood = req.body;
            console.log("wood = ", wood);
            const result = await woodTypeCollection.insertOne(wood);
            res.send(result);
        })
        //* get handle and wood type items
        app.get("/handles", async (req, res) => {
            const cursor = handleTypeCollection.find();
            const result = await cursor.toArray();

            res.send(result);
        })
        app.get("/woods", async (req, res) => {
            const cursor = woodTypeCollection.find();
            const result = await cursor.toArray();

            res.send(result);
        })

        //*Search
        app.get("/search-products", async (req, res) => {
            const search = req.query.search?.toLowerCase();

            const cursor = batsCollection.find();
            const cursor2 = ballsCollection.find();

            const result = await cursor.toArray();
            const result2 = await cursor2.toArray();

            const combinedResult = [...result, ...result2];

            const searchedProduct = combinedResult.filter((item) =>
                item.title?.toLowerCase().includes(search)
            );

            res.send(searchedProduct);
        });

        //!----------------------------------- GLOBAL BRANDS ------------------------------------------------------
        //* add all the brands 
        app.post("/add-brands", async (req, res) => {
            const brands = req.body;
            console.log("Brands = ", brands);

            const result = await cricketBrandCollection.insertOne(brands);
            // console.log("Result =", result);

            res.send(result);
        })

        //* get the added brands
        app.get("/global-brands", async (req, res) => {
            const cursor = cricketBrandCollection.find();
            const result = await cursor.toArray();
            console.log("Result : ", result);
            res.send(result);
        })


        //* get all the title only
        app.get("/global-brands-title", async (req, res) => {
            const cursor = cricketBrandCollection.find({}, {
                projection: {
                    title: 1,
                    _id: 0,
                }
            });
            const result = await cursor.toArray();
            console.log("REsult = ", result);
            res.send(result);
        })



        // * get the specific brand by title
        app.get("/global-brands/:title", async (req, res) => {

            const title = req.params.title;


            const query = {
                title: { $regex: new RegExp(`^${title}$`, 'i') }
            };

            const result = await cricketBrandCollection.findOne(query);

            console.log(result);
            res.send(result);

        })


        //* Add products by brands
        app.post("/addProductsByBrands", async (req, res) => {
            const data = req.body;
            console.log("Data to be inserted = ", data);

            const result = await globalBrandWiseProducts.insertOne(data);

            console.log("Result = ", result);

            res.send(result);

        })


        //* get all the added products by brands
        app.get("/fetchProducts_byBrands", async (req, res) => {
            const cursor = globalBrandWiseProducts.find();

            const result = await cursor.toArray();

            res.send(result);
        })


        //* get the brand depending on the category
        app.get("/product/:categoryOption", async (req, res) => {
            const category = req.params.categoryOption;

            const cursor = globalBrandWiseProducts.find(
                { categoryOption: category },
                { projection: { _id: 0 } }
            );

            const result = await cursor.toArray();
            console.log("Result  ", result);
            res.send(result);
        });

        // ! Jersey
        app.post("/jersies", async (req, res) => {
            const data = req.body;
            console.log("Data to be inserted", data);

            // Hardcode the category as "jersey"
            data.category = "jersey";

            const result = await jerseyCollection.insertOne(data);
            res.send(result);
        })

        //! to see all the jerseies
        app.get("/all-jersies", async (req, res) => {
            const cursor = await jerseyCollection.find().toArray();
            res.send(cursor);

        })

        //! to get the jersey according to the title
        app.get("/jersey/:title", async (req, res) => {
            const title = req.params.title;
            console.log("Title", title);

            const query = {
                title: { $regex: new RegExp(`^${title}$`, 'i') }
            };

            const result = await jerseyCollection.findOne(query);
            console.log("Result ", result);
            res.send(result);
        })


        //! ---------------------------Boots--------------------------------------------------
        //* add boots
        app.post("/boots", async (req, res) => {
            const data = req.body;
            console.log("Data to be inserted = ", data);

            data.dattAdded = new Date(); // current date and time
            const result = await bootsCollection.insertOne(data);
            console.log("Result = ", result);
            res.send(result);

        })

        //* Fetch all boots
        app.get("/get-boots", async (req, res) => {
            const cursor = await bootsCollection.find().toArray();

            res.send(cursor);
        })


        //! delete based on category and id
        app.delete("/delete/:category/:id", async (req, res) => {
            const { category, id } = req.params
            console.log("Category and id ", category, id);

            //for invalid id
            if (!(ObjectId.isValid(id))) {
                res.send("Not a valid id");
            }

            let collections;
            if (category === "bat" || category === "bats") {
                collections = batsCollection;
                // console.log("Collections : ", collections);
            } else if (category === "ball" || category === "balls") {
                collections = ballsCollection
                // console.log("Collections : ", collections);
            } else if (
                category === "helmet" ||
                category === "pad" ||
                category === "thigh pad" ||
                category === "gloves" ||
                category === "guard"
            ) {
                collections = accesoriesCollection;
            } else if (category === "jersey") {
                collections = jerseyCollection;
            } else if (
                category === "boots" || category === "boot") {
                collections = bootsCollection;
            }

            else {
                console.log("Category is not found...");
                return res.status(400).send({ message: "Invalid category" })
            }

            const result = await collections.deleteOne({ _id: new ObjectId(id) });

            if (result.deletedCount === 1) {
                res.send({ message: "Product deleted successfully.", deletedCount: 1 });
            } else {
                res.send({ message: "Product not found.", deletedCount: 0 });
            }
        })

        //!delete
        app.delete("/delete/:id", async (req, res) => {
            const { id } = req.params;
            console.log("ID ", id);
            const query = { _id: new ObjectId(id) };
            let collections;
            if (category === "bat" || category === "bats") {
                collections = batsCollection;
                // console.log("Collections : ", collections);
            } else if (category === "ball" || category === "balls") {
                collections = ballsCollection
                // console.log("Collections : ", collections);
            } else if (
                category === "helmet" ||
                category === "pad" ||
                category === "thigh pad" ||
                category === "gloves" ||
                category === "guard"
            ) {
                collections = accesoriesCollection;
            } else if (category === "jersey") {
                collections = jerseyCollection;
            } else if (
                category === "boots" || category === "boot") {
                collections = bootsCollection;
            }
            const result = await collections.deleteOne(query);
            res.send({ message: "Deleted!!" }, result);
        })


        //!Edit
        app.get("/edit/:category/:id", async (req, res) => {
            const { category, id } = req.params;
            let collection;

            switch (category.toLowerCase()) {
                case "bat":
                case "bats":
                    collection = batsCollection;
                    break;
                case "ball":
                case "balls":
                    collection = ballsCollection;
                    break;
                case "helmet":
                case "pad":
                case "thigh pad":
                case "gloves":
                case "guard":
                    collection = accesoriesCollection;
                    break;
                case "jersey":
                    collection = jerseyCollection;
                    break;
                case "boot":
                case "boots":
                    collection = bootsCollection;
                    break;
                default:
                    return res.status(400).send({ error: "Invalid category" });
            }

            try {
                const result = await collection.findOne({ _id: new ObjectId(id) });
                if (!result) {
                    return res.status(404).send({ error: "Product not found" });
                }
                res.send(result);
            } catch (err) {
                res.status(500).send({ error: "Failed to fetch product" });
            }
        });

        //!Edit
        app.put("/edit/:category/:id", async (req, res) => {
            const { category, id } = req.params;
            const updatedData = req.body;
            let collection;

            switch (category.toLowerCase()) {
                case "bat":
                case "bats":
                    collection = batsCollection;
                    break;
                case "ball":
                case "balls":
                    collection = ballsCollection;
                    break;
                case "helmet":
                case "pad":
                case "thigh pad":
                case "gloves":
                case "guard":
                    collection = accesoriesCollection;
                    break;
                case "jersey":
                    collection = jerseyCollection;
                    break;
                case "boot":
                case "boots":
                    collection = bootsCollection;
                    break;
                default:
                    return res.status(400).send({ error: "Invalid category" });
            }

            const filter = { _id: new ObjectId(id) };
            const updateDoc = { $set: updatedData };
            const options = { upsert: false };

            try {
                const result = await collection.updateOne(filter, updateDoc, options);
                res.send(result);
            } catch (err) {
                res.status(500).send({ error: "Update failed" });
            }
        });

        


        // Example API endpoint to get user data
        app.get('/api/user/profile/:id', async (req, res) => {
            const id = req.params.id;

            try {
                const user = await userCollection.findOne({ _id: new ObjectId(id) });

                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }

                res.json(user);
            } catch (error) {
                res.status(400).json({ message: 'Invalid user ID format' });
            }
        });






        //!Edit your profile
        // app.put("/edit-profile/:id", async (req, res) => {
        //     const editedId = req.params.id;

        //     console.log("Edited ID :", editedId);

        //     const filter = { _id: new ObjectId(editedId) };
        //     const options = { upsert: true };

        //     const updateUser = {
        //         $set: {
        //             name: req.body.name,
        //             email: req.body.email
        //         }
        //     }

        //     const result = await userCollection.updateOne(filter, updateUser, options);
        //     if (result) {
        //         res.send(result);
        //         console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
        //         );
        //     } else {
        //         res.send({
        //             message: "Not Found!!",
        //             status: false,
        //         })
        //     }
        // })
        app.put('/edit-profile/:id', async (req, res) => {
            const { name, email } = req.body;
            const userId = req.params.id;

            try {
                const result = await userCollection.collection('users').doc(userId).update({ name, email });
                res.send({ success: true }, result);
            } catch (error) {
                console.error('Error updating profile in DB:', error);
                res.status(500).send({ success: false, error: 'Internal Server Error' });
            }
        });


        app.get('/api/user/by-email/:email', async (req, res) => {
            const email = req.params.email;
            try {
                const user = await userCollection.findOne({ email });
                if (!user) return res.status(404).json({ message: 'User not found' });
                res.json(user);
            } catch (err) {
                res.status(500).json({ message: 'Server error' });
            }
        });


        // aprofile


        // // ----------------------------- Grab the categories status only --------------------------------------------
        // app.get("/api/status-only", async (req, res) => {


        //     const statusList = await categoryCollection.find(
        //         {},
        //         {
        //             projection: {
        //                 status: 1
        //             }
        //         }
        //     ).toArray();
        //     res.send(statusList);

        //     // const statusList = await categoryCollection.distinct("status");
        //     // res.json(statusList);
        // })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})