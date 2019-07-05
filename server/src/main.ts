import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from 'src/app.module';
import { httpPort, httpsPort } from 'src/core/environment/environment.config';

import fs = require('fs');
import express = require('express');
import http = require('http');
import https = require('https');

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('src/secrets/server.key'),
    cert: fs.readFileSync('src/secrets/server.cert'),
  };

  const server = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );

  const options = new DocumentBuilder()
    .setTitle('Library Swagger api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.init();

  server.enable('trust proxy');
  server.use((req, res, next) => {
    if (req.secure) {
      next();
    } else {
      res.redirect('https://' + req.headers.host.replace(httpPort, httpsPort) + req.url);
    }
  });

  http.createServer(server).listen(httpPort);
  https.createServer(httpsOptions, server).listen(httpsPort);
}
bootstrap();
