
# MicroURL BackEnd🔗

For Full Documentation, Please refer [here](https://github.com/tengfone/urlshortener)

### Backend

Either launch on Cloud or Local. As this project is completed developed on the cloud, please follow the cloud instructions on setting up.

## Cloud:  

Prerequisite:  
- AWS Instance  

Steps:

Launch an EC2 Instance ```Ubuntu Server 20.04 LTS (HVM), SSD Volume Type - ami-09e67e426f25ce0d7 (64-bit x86)``` (Tested on T2.Small)  

Change Security Group in AWS Security Wizard to open all TCP Port to anywhere (Please change accordingly to your default params - MySQL port and your IP SSH address)

SSH into your AWS server by  
```
ssh -i <SSH_KEY_PATH> ubuntu@<YOUR_EC2_PUBLIC_IP>
```

Clone repo and run bash script (Please edit required passwords in bash script):
```

git clone https://github.com/tengfone/urlshortener_be

cd urlshortener_be

chmod +x start.sh

sudo ./start.sh
```

Local:  
Have not tested this locally.

Please ensure that you have a ```.env``` file located at the root directory that consist of the following params:

```

HOST=YOURDBHOSTURL

USER=YOURDBUSER

PASSWORD=YOURDBPASSWORD

DB=YOURDBNAME

PORT=3306

```

Then you can ```node server.js``` to start the backend server.

Please note that you are required to have MySQL server v8 to be installed on the local computer.

  

The front end is written using NodeJS running Express [here](https://github.com/tengfone/urlshortener_be)

  

The Backend has also been modularized so as to easily append new method APIs in the future. However, it is noted that currently I am serving the backend using http and not https, this is because I can only self-sign the certificate and certain browsers rejects self-signed API calls. To solve this problem is a matter of having a signed certificate. However due to time constraints, I will just serve the API via http.

  

## Testcase

### Backend

  

Run via ```npm run test```

  

Libraries for API testing:

- Chai

- Mocha

  

There are a total of 4 test cases.

#### Create

  | Test Case # | Description | Test Scenario | Test Steps | Test Data | Expected Results | Actual Results | Pass / Fail |
|-|:-:|-|-|-|-|-|-|
| 1 | Check if MySQL is online and able to log in | Check if able to establish to connection to MySQL | 1. Retrieve Authentication Data for MySQL 2. Check if the result is an object | HOST=TargetHost USER=TargetUser PASSWORD=TargetPassword DB=url PORT=3306 | An Object | Object Returned | Pass |
| 2 | Sending new data into MySQL with no errors | Check if able to populate the data into the MySQL server | 1. Connect to MySQL 2. Generate a random B62 8 character URL which will also be used in Test Case 3. 3. Generate an object filled with data 4. Send to MySQL 5. Check status code if returns 500 | { LongURL:"http://www.google.com" ShortURL:customB62GeneratedURL TimeCreated:"2021-06-19 16:52:50" TimeExpire:"2021-06-19 16:52:50" } | Status Code 200 | Status Code 200 | Pass |
| 3 | Sending a duplicated key data into MySQL | Check if able to detect that the key has already existed in MySQL | 1. Connect to MySQL 2. Use the random B62 8 character URL generated in test case 2 to send a GET request to the server 3. Check if status code is 520 | ShortURL:customB62GeneratedURL | Status Code 520 | Status Code 520 | Pass |
  

#### FindURL


| Test Case # | Description | Test Scenario | Test Steps | Test Data | Expected Results | Actual Results | Pass / Fail |
|-|:-:|-|-|-|-|-|-|
| 1 | Search if alias correspond to longURL found in MySQL | Ensure that there is a slug/alias inside the DB called test mapped to a full URL. Valid if it returns a status code of 200 | 1. Ensure there is a mappable key pair value in the DB 2. Send a GET request with the key parameter | ShortURL=test | Status code 200 | Status code 200 | Pass |