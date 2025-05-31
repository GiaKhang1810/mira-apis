import express, { Router } from 'express';
import { DownloadMedia, GetMedia, Redirect, Scraper } from './main';

const routers: Router = express.Router();

routers.post('/api/get-media', GetMedia);
routers.get('/api/get-media', GetMedia);

routers.post('/api/download', DownloadMedia);
routers.get('/api/download', DownloadMedia);

routers.get('/scraper', Scraper);
routers.get('/', Redirect);

export default {
    pathRoute: '/tools',
    modelRoute: routers
}