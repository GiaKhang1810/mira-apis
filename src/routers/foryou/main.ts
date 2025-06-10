import { Request, Response } from 'express';

export function Redirect(req: Request, res: Response): void {
    res.redirect(302, '/foryou/danh-cho-babi-do');
}

export function HeartForYou_v1(req: Request, res: Response): void {
    res.status(200);
    res.render('foryou/heart_v1');
}

export function HeartForYou_v2(req: Request, res: Response): void {
    res.status(200);
    res.render('foryou/heart_v2');
}

export function MyUniverse(req: Request, res: Response): void {
    res.status(200);
    res.render('foryou/galaxy');
}