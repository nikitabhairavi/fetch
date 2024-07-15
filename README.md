
1. clone the repo
2. ```npm install```

3. HOW_TO_TEST_APIS:

    a. install the following postman extension
        ![Alt text](image.png)

    b. to start the server: ```npx ts-node src/index.ts``` 
    on using this command you will get a message :Server is running at http://localhost:8000
    NOTE: you can change the port by making changes to the .env file by updating the value for PORT=8000

    c. In the postman extension create a request as shown below. 
       ![Alt text](image-4.png)
        NOTE: Paste sample receipt in the body and make sure you paste it in the raw format and it shows JSON format once you are done

    d. copy the id you get from the response

    e. create a get request with the id that you got from the response 
       ![Alt text](image-2.png)
        NOTE: make sure you add the id you received from the post request

4. HOW_TO_RUN_TESTS:

    a. to run tests : ```npx jest```   
    b. to check test coverage: ```npx jest --coverage```


*** Results for sample receipt 1: ***

```json
{
  "retailer": "Target",
  "purchaseDate": "2022-01-01",
  "purchaseTime": "13:01",
  "items": [
    {
      "shortDescription": "Mountain Dew 12PK",
      "price": "6.49"
    },{
      "shortDescription": "Emils Cheese Pizza",
      "price": "12.25"
    },{
      "shortDescription": "Knorr Creamy Chicken",
      "price": "1.26"
    },{
      "shortDescription": "Doritos Nacho Cheese",
      "price": "3.35"
    },{
      "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
      "price": "12.00"
    }
  ],
  "total": "35.35"
}
```
![Alt text](image-6.png)

*** Results for sample receipt 2: ***

```json
{
  "retailer": "M&M Corner Market",
  "purchaseDate": "2022-03-20",
  "purchaseTime": "14:33",
  "items": [
    {
      "shortDescription": "Gatorade",
      "price": "2.25"
    },{
      "shortDescription": "Gatorade",
      "price": "2.25"
    },{
      "shortDescription": "Gatorade",
      "price": "2.25"
    },{
      "shortDescription": "Gatorade",
      "price": "2.25"
    }
  ],
  "total": "9.00"
}
```

![Alt text](image-5.png)


***Test Coverage Results***

![Alt text](image-7.png)

***Sample Response for Invalid Data***

![Alt text](image-8.png)

![Alt text](image-9.png)

![Alt text](image-10.png)