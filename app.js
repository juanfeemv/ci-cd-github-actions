const express = require('express');
const _ = require('underscore');

// Objetivo: este objeto debe coincidir con lo que espera el test
const animals = {
  cat: "meow",
  dog: "bark",
  eel: "hiss",
  bear: "growl",
  frog: "croak",
  lion: "roar",
  bird: "tweet",
  sheep: "baa"
};

function getAnimal() {
  return _.sample(Object.entries(animals));
}

const app = express();

app.get('/', async (req, res, next) => {
  try {
    const [animal_name, sound] = getAnimal();
    res.status(200).type('html').send(`
      George Orwell had a farm.<br />
      E-I-E-I-O<br />
      And on his farm he had a ${animal_name}.<br />
      E-I-E-I-O<br />
      With a ${sound}-${sound} here.<br />
      And a ${sound}-${sound} there.<br />
      Here a ${sound}, there a ${sound}.<br />
      Everywhere a ${sound}-${sound}.<br />
    `);
  } catch (error) {
    next(error);
  }
});

app.get('/api', async (req, res, next) => {
  try {
    res.status(200).json(animals);
  } catch (error) {
    next(error);
  }
});

app.get('/actions-status', async (req, res, next) => {
  try {
    res.status(200).type('html').send(`
      <!doctype html>
      <html lang="es">
        <head>
          <meta charset="utf-8" />
          <title>Estado CI</title>
          <style>
            body { font-family: Arial, sans-serif; background: #f6f8fa; color: #0f172a; display: grid; place-items: center; height: 100vh; margin: 0; }
            .card { padding: 1.5rem 2rem; border: 1px solid #d0d7de; border-radius: 12px; background: #ffffff; box-shadow: 0 6px 18px rgba(0,0,0,0.06); text-align: center; }
            .badge { display: inline-block; margin-top: 0.75rem; padding: 0.35rem 0.75rem; border-radius: 999px; background: #2ea44f; color: #ffffff; font-weight: 700; letter-spacing: 0.02em; }
          </style>
        </head>
        <body>
          <div class="card">
            <div>GitHub Actions esta funcionando.</div>
            <div class="badge">CI OK</div>
          </div>
        </body>
      </html>
    `);
  } catch (error) {
    next(error);
  }
});

// Middleware para errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = app;
