import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { environment, Environment } from 'src/environment';

import fs = require('fs');
import express = require('express');
import http = require('http');
import https = require('https');
import cors = require('cors');
import * as mongoose from 'mongoose';

async function bootstrap() {
  const env: Environment = environment();

  mongoose.connect(env.databaseMongoConnectionUrl, { useNewUrlParser: true, useFindAndModify: false });

  const httpsOptions = {
    key: fs.readFileSync('src/secrets/server.key'),
    cert: fs.readFileSync('src/secrets/server.cert'),
  };

  const server = express();
  server.enable('trust proxy');
  server.use(cors());

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );

  const options = new DocumentBuilder()
    .setTitle('Library Swagger api')
    .setVersion('1.0')
    .setSchemes('https')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.init();

  https.createServer(httpsOptions, server).listen(env.httpsPort);
  http.createServer((req, res) => {
    res.writeHead(301, {
      Location: `https://${req.headers.host.replace(env.httpPort, env.httpsPort)}${req.url}`,
    });
    res.end();
  }).listen(env.httpPort);
}

bootstrap();
