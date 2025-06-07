import express, { Router } from 'express';
import { GetMedia, Redirect, Scraper, Uploader } from './main';

const routers: Router = express.Router();

routers.post('/api/get-media', GetMedia);
routers.get('/api/get-media', GetMedia);

routers.get('/upload', Uploader);
routers.get('/scraper', Scraper);
routers.get('/', Redirect);

export default {
    pathRoute: '/tools',
    modelRoute: routers
}