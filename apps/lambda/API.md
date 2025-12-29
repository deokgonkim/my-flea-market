# API

## Basic RESTful request and response

### Simple Get Items API

```http
GET /dev/items HTTP/1.1
Host: api.example.com
Authorization: Bearer <token> # not implemented yet
Content-Type: application/json
```

```json
[
    {
        "slug": "test6",
        "createdAt": "2025-12-29T04:41:15.002Z",
        "description": "블라블라 테스트\n하하하",
        "id": "d5bb92ca-a31f-450b-bcb2-e3cbbceca9af",
        "price": 5000,
        "name": "test6"
    }
]
```

## Error response

### Simple error message

```http
GET /dev/items/non-existing-slug HTTP/1.1
Host: api.example.com
Authorization: Bearer <token> # not implemented yet
Content-Type: application/json
```

```json
{
    "message": "Item 'test6' not found"
}
```

### Bad request error message

```http
POST /dev/items/non-existing-slug HTTP/1.1
Host: api.example.com
Authorization: Bearer <token> # not implemented yet
Content-Type: application/json

{
    "name": "test9",
    "price": "5000",
    "description": "블라블라 테스트\n하하하"
}
```

```json
{
    "message": "Validation error",
    "errors": [
        {
            "target": {
                "name": "test9",
                "price": "5000",
                "description": "블라블라 테스트\n하하하"
            },
            "value": "5000",
            "property": "price",
            "children": [],
            "constraints": {
                "isNumber": "price must be a number conforming to the specified constraints"
            }
        }
    ]
}
```

## Paginated request and response


### Paginated Get Items API

```http
GET /dev/items?page=1&limit=10 HTTP/1.1
Host: api.example.com
Authorization: Bearer <token> # not implemented yet
Content-Type: application/json
```

```json
{
    "data": [
        {
            "slug": "test1",
            "createdAt": "2025-12-29T04:41:15.002Z",
            "description": "블라블라 테스트\n하하하",
            "id": "a1bb92ca-a31f-450b-bcb2-e3cbbceca9af",
            "price": 1000,
            "name": "test1"
        },
        {
            "slug": "test2",
            "createdAt": "2025-12-29T04:41:15.002Z",
            "description": "블라블라 테스트\n하하하",
            "id": "b2bb92ca-a31f-450b-bcb2-e3cbbceca9af",
            "price": 2000,
            "name": "test2"
        }
    ],
    "pagination": {
        "currentPage": 1,
        "totalPages": 5,
        "totalItems": 50,
        "itemsPerPage": 10
    }
}
```
