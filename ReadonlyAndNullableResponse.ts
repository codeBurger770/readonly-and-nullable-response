export type ReadonlyAndNullableResponse<T> = {
    readonly [P in keyof T]?: T[P] extends (infer U)[]
        ? ReadonlyAndNullableResponse<U>[] | null
        : T[P] extends object
            ? ReadonlyAndNullableResponse<T[P]> | null
            : T[P] | null;
};
