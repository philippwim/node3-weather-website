const path = require("path"); //node built-in module

const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

// define paths for express config
const sPublicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");


const app = express();

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(sPublicPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Philipp"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Page",
        name: "Philipp"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        message: "This is the message to render",
        title: "Help Page",
        name: "Philipp"
    });
});

// app.com/help
// app.com/about
// app.com/weather

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({error: "You must provide an address"});
    }

    geocode(req.query.address, (error, {lat, lon, location} = {}) => {
    
        if (error) {
            return res.send({error}); // shorthand syntax
        }
    
        forecast(lat, lon, (error, forecastData) => {
    
            if (error) {
                return res.send({error}); // shorthand syntax
            }
    
            res.send({
                address: req.query.address,
                location, // shorthand syntax
                forecast: forecastData
            });
    
        });
    
    });

});

app.get("/products", (req, res) => {
    
    if (!req.query.search) {
        return res.send({error: "You must provide a search term"});
    }

    console.log(req.query.search);
    res.send({products: []});

});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Philipp Wimmer",
        errorMessage: "Help article"
    });
})

app.get("*", (req, res) => { // match anything that has not been matched for 404 page
    res.render("404", {
        title: "404",
        name: "Philipp Wimmer",
        errorMessage: "Page"
    });
});

app.listen(3000, () => {
    console.log("Server is up on port 3000.")
});