
## Description

NestJS backend test

Author: HuyPQ

Email: huypham1512@gmail.com

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# e2e tests
$ npm run test:e2e
```

## GraphQL query

```bash
fragment DataDtoFields on DataDto {
  id
  createdAt
  name
  parentId
  cost
}

{
  travelCost(id: "uuid-8"){
    id
    createdAt
    name
    parentId
    cost
    children{
      ...DataDtoFields
      children {
        ...DataDtoFields
        children {
          ...DataDtoFields
          children {
            ...DataDtoFields
          }
        }
      }
    }
  }
}
```
## GraphQL response

```bash
{
  "data": {
    "travelCost": [
      {
        "id": "uuid-8",
        "createdAt": "2021-02-25T23:47:57.596Z",
        "name": "Bartell - Mosciski",
        "parentId": "uuid-1",
        "cost": 28817,
        "children": [
          {
            "id": "uuid-10",
            "createdAt": "2021-02-26T01:39:33.438Z",
            "name": "Lockman Inc",
            "parentId": "uuid-8",
            "cost": 4288,
            "children": []
          },
          {
            "id": "uuid-11",
            "createdAt": "2021-02-26T00:32:01.307Z",
            "name": "Parker - Shanahan",
            "parentId": "uuid-8",
            "cost": 12236,
            "children": [
              {
                "id": "uuid-12",
                "createdAt": "2021-02-25T06:44:56.245Z",
                "name": "Swaniawski Inc",
                "parentId": "uuid-11",
                "cost": 2110,
                "children": []
              },
              {
                "id": "uuid-14",
                "createdAt": "2021-02-25T15:22:08.098Z",
                "name": "Weimann, Runolfsson and Hand",
                "parentId": "uuid-11",
                "cost": 7254,
                "children": []
              }
            ]
          },
          {
            "id": "uuid-13",
            "createdAt": "2021-02-25T20:45:53.518Z",
            "name": "Balistreri - Bruen",
            "parentId": "uuid-8",
            "cost": 1686,
            "children": []
          },
          {
            "id": "uuid-15",
            "createdAt": "2021-02-25T18:00:26.864Z",
            "name": "Predovic and Sons",
            "parentId": "uuid-8",
            "cost": 4725,
            "children": []
          },
          {
            "id": "uuid-16",
            "createdAt": "2021-02-26T01:50:50.354Z",
            "name": "Weissnat - Murazik",
            "parentId": "uuid-8",
            "cost": 3277,
            "children": []
          }
        ]
      }
    ]
  }
}
```