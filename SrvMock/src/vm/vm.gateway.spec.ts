import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { expect } from 'chai';
import * as io from 'socket.io-client';
import { VMGateway } from './vm.gateway';

async function createNestApp(...gateways): Promise<INestApplication> {
  const testingModule = await Test.createTestingModule({
    providers: gateways,
  }).compile();
  const app = await testingModule.createNestApplication();
  return app;
}

describe('WebSocketGateway', () => {
  let ws, app;

  it(`should handle message (2nd port)`, async () => {
    app = await createNestApp(VMGateway);
    await app.listenAsync(150);

    ws = io.connect('http://localhost:150');
    ws.emit('getResponses');
    await new Promise(resolve =>
      ws.on('getResponses', data => {
        expect(Array.isArray(data)).to.be.eql(Array.isArray([]));
        resolve();
      }),
    );
  });

  afterEach(() => app.close());
});