# Product Management Application (CAP + SAPUI5)

## Overview

This project is a full-stack application developed using the SAP Cloud Application Programming Model (CAP) for the backend and SAPUI5 (Freestyle) for the frontend.

The backend exposes OData V4 services to manage products, while the frontend provides a simple user interface to visualize and interact with the data.

The solution is designed to be easy to run locally, simple to test, and straightforward to extend.

## Technologies Used

- Node.js
- SAP Cloud Application Programming Model (CAP)
- OData V4
- SAPUI5 (Freestyle)
- SAP Business Application Studio
- REST Client (test.http)


## Prerequisites

Before running the project locally, ensure that the following tools are available:

- Node.js (version 18 or higher)
- npm
- SAP Business Application Studio (recommended)
- REST Client extension (available by default in BAS)

## How to Run the Application Locally

### Install Dependencies

From the root directory of the project, run:

```bash
npm install
```
### Start the CAP Server

Run the following command:

```bash
cds watch
```

### Access Backend Services

Once the server is running, the OData service root is available at:
http://localhost:4004/odata/v4/productshop/

The Products entity can be accessed at:
http://localhost:4004/odata/v4/productshop/Products

### Access the Frontend Application

The SAPUI5 frontend application is available at:
http://localhost:4004/ui/index.html

## Data Model

The backend data model is defined using CDS.

Entity:
- Products
  - name (String)
  - category (Enum: Drinks, Grocery)

The CAP framework automatically handles persistence, validation, and OData exposure.

## API Testing

### Testing Approach

Backend APIs are tested using a REST Client HTTP file (test.http), which allows manual and repeatable testing of the OData endpoints.

### How to Run API Tests

1. Start the CAP server using `cds watch`
2. Open the file `test.http`
3. Click "Send Request" above any request

The HTTP response is displayed directly in the editor.

### Covered Test Scenarios

The following scenarios are covered:
- Service availability check
- Read products (GET)
- Create product (POST)
- Update product (PATCH)
- Delete product (DELETE)
- Validation and error handling

## Testing Strategy Justification

The test.http approach was selected because it is lightweight, easy to use, and does not require additional frameworks. It allows clear inspection of requests and responses and is suitable for development and validation phases.

## Conclusion

This project demonstrates a complete CAP backend with a SAPUI5 frontend, documented API testing, and a simple local execution model. The solution follows SAP best practices and is easy to maintain and extend.

## Key Commands Summary

```bash
npm install
cds watch
