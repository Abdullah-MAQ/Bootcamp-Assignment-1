// server.js
const express = require('express');
const sql = require('mssql');

const app = express();
const port = 3000;

// Database configuration
const dbConfig = {
    user: 'bootcamp',
    password: 'Pass@123',
    server: 'bootcampaug5server.database.windows.net',
    database: 'bootcampaug5db',
    options: {
        encrypt: true, // Use encryption for Azure SQL
        trustServerCertificate: false
    }
};
// Middleware to serve static files
app.use(express.static('public'));

// Endpoint to fetch data from the database
app.get('/api/data/task2', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query('SELECT TOP 20 * FROM SalesLT.Customer');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error fetching data from the database');
    }
});

app.get('/api/data/task3', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query('SELECT TOP 20 SalesLT.Product.Name,SalesLT.Product.Color,Size,Weight FROM SalesLT.ProductCategory INNER JOIN SalesLT.Product ON SalesLT.ProductCategory.ProductCategoryID = SalesLT.Product.ProductCategoryID');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error fetching data from the database');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
