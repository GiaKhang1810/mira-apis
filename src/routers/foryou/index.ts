import express, { Router } from 'express';
import { Redirect, HeartForYou_v1, HeartForYou_v2, MyUniverse } from './main';

const routers: Router = express.Router();

routers.get('/danh-cho-babi-do', HeartForYou_v1);
routers.get('/danh-cho-mot-minh-em', HeartForYou_v2);
routers.get('/vu-tru-cua-anh', MyUniverse);
routers.get('/', Redirect);

export default {
    pathRoute: '/foryou',
    modelRoute: routers
}