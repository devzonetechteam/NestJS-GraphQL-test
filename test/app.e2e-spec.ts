import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';


describe('GraphQL ApPResolver (e2e) {Pactum}', () => {
  let app: INestApplication;
  let url: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.listen(0);
    url = await app.getUrl();
    pactum.request.setBaseUrl(url.replace('[::1]', 'localhost'));
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/graphql', () => {
    describe('Travel Cost', () => {
      it('Calculate correct for id: uuid-8 = 28817', () => {
        return pactum
          .spec()
          .post('/graphql')
          .withGraphQLQuery(
            `query{
                travelCost(id: "uuid-8"){
                  cost
                }
              }`,
          )
          .expectStatus(200)
          .expectBody({
            data: {
                "travelCost": [
                  {
                    "cost": 28817
                  }
                ]
              }
          });
      });
    });
})});