# Утилита для типизации результатов запросов

## Код утилиты

```ts
type ReadonlyAndNullableResponse<T> = {
    readonly [P in keyof T]?: T[P] extends (infer U)[]
        ? ReadonlyAndNullableResponse<U>[] | null
        : T[P] extends object
            ? ReadonlyAndNullableResponse<T[P]> | null
            : T[P] | null;
};
```

## Плюсы использования утилиты

+ Свойства становятся `null | undefined` 
+ Свойства становятся `readonly`

## Код без использования утилиты

```ts
interface IResponse1 {
    a: number;
    b: {
        c: number;
    };
    d: {
        e: number;
    }[];
}

const response1: IResponse1 = {
    a: 1,
    b: { c: 2 },
    d: [{ e: 3 }],
};

// Можно менять свойства, плохо!
response1.a = 4;

// Не учитывает то, что сервер мог вернуть undefined или null, плохо!
console.log(response1.b.c);
```

## Код с использованием утилиты

```ts
type IResponse2 = ReadonlyAndNullableResponse<{
    a: number;
    b: {
        c: number;
    };
    d: {
        e: number;
    }[];
}>;

// Результат использования утилиты:
// interface IResponse2 {
//     readonly a?: number | null | undefined;
//     readonly b?: {
//         readonly c?: number | null | undefined;
//     } | null | undefined;
//     readonly d?: {
//         readonly e?: number | null | undefined;
//     }[] | null | undefined;
// }

const response2: IResponse2 = {
    a: 1,
    b: { c: 2 },
    d: [{ e: 3 }],
};

// Cannot assign to 'a' because it is a read-only property. Нельзя менять свойства!
response2.a = 4;

// Object is possibly 'null' or 'undefined'. Учитывает то, что сервер мог вернуть undefined или null!
console.log(response2.b?.c);
```
