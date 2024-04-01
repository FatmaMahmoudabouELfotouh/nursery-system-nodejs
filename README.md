##Nursery App System Overview
-	The Nursery App System is a lightweight management system designed to facilitate the administration of nurseries. Developed using Node.js, Express.js, and MongoDB, it offers a set of endpoints to handle various tasks related to teachers, children, and classes.


	##Nursery App System Features:
	#Teacher Management:
-	CRUD operations for teachers
-	JWT authentication
-	Input validation
-	File upload for images
	#Child Management:
-	CRUD for children
-	JWT authentication
-	Input validation
	#Class Management:
-	CRUD for classes
-	Secure JWT authentication
-	Input validation
-	Authentication with JWT Tokens:
-	Secure login
-	JWT usage

	##API Endpoints
	##Teachers Endpoint
-	GET /teachers: Retrieve all teachers.
-	GET /teachers/:id: Retrieve details of a specific teacher.
-	POST /teachers: Add a new teacher.
-	PUT /teachers/:id: Update details of a teacher.
-	DELETE /teachers/:id: Delete a teacher.

	##Children Endpoint
-	GET /children: Retrieve all children.
-	GET /children/:id: Retrieve details of a specific child.
-	POST /children: Add a new child.
-	PUT /children/:id: Update details of a child.
-	DELETE /children/:id: Delete a child.

	##Classes Endpoint

-	GET /class: Retrieve all classes.
-	GET /class/:id: Retrieve details of a specific class.
-	POST /class: Add a new class.
-	-PUT /class/:id: Update details of a class.
-	DELETE /class/:id: Delete a class.

## Authentication

-	Authentication is required for most endpoints using JWT tokens.
-	To authenticate, include the JWT token in the Authorization header of the request.
-	Use the `/login` endpoint to obtain a JWT token by providing valid credentials.



