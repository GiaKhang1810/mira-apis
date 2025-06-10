import express, { Router } from 'express';
import { GetDetailsMedia, SearchQuery } from './main';

const routers: Router = express.Router();

routers.get('/api/search', SearchQuery);
routers.post('/api/search', SearchQuery);

routers.get('/api/get-addr', GetDetailsMedia);
routers.post('/api/get-addr', GetDetailsMedia);

export default {
    pathRoute: '/tiktok',
    modelRoute: routers
}