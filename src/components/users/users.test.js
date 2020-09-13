/* eslint-disable */
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import App from '../../app/app';

const app = express();
const api = new App()

describe('[TEST] Users Api Endpoints', () => {
  beforeEach(() => jest.setTimeout(3000));
  beforeAll(async () => await api.init(app))

  it('Should get a OK response', async () => {
    const url = '/users';
    const res = await request(app).get(url).expect(StatusCodes.OK);
    const data = JSON.parse(res.text);

    expect(data).toMatchObject({
      status: StatusCodes.OK,
      date: expect.any(String),
      data: expect.any(String)
    })
  });

  it('Should get an error response if sent invalid JSON', async () => {
    const url = '/users/login';
    await request(app).post(url).expect(StatusCodes.BAD_REQUEST);
  });

  it('Should get an error response if sent invalid credentials', async () => {
    const url = '/users/login';
    await request(app).post(url).send({
      username: 'randomuser',
      password: 'randompassword'
    }).expect(StatusCodes.UNAUTHORIZED);
  })

});
