import express, { Router, Request, Response } from 'express';
import cout from '@utils/cout';

const routers: Router = express.Router();

routers.get('/scraper', (req: Request, res: Response): void => {
    res.status(200);
    res.render('tools/scraper');
});

routers.get('/', (req: Request, res: Response): void => {
    res.redirect(302, '/tools/scraper');
});

export default {
    pathRoute: '/tools',
    modelRoute: routers
}