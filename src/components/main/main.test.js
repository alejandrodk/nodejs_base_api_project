/* eslint-disable */
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import App from '../../app/app';

const app = express();
const api = new App()

describe('[TEST] Main Api Endpoints', () => {
  beforeEach(() => jest.setTimeout(3000));
  beforeAll(async () => await api.init(app))

  it('Should get a OK response', async () => {
    const url = '/';
    const res = await request(app).get(url).expect(200);
    const data = JSON.parse(res.text);

    expect(data).toMatchObject({
      status: StatusCodes.OK,
      date: expect.any(String),
      data: expect.any(String)
    })
  });
});
