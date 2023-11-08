/// <reference types="jest" />
declare namespace jest {
    interface Matchers<R, T> {
        toContainPredicate<E>(predicate: {
            (obj: E): boolean;
        }): CustomMatcherResult;
        toContainObject<E>(argument: Partial<E>): CustomMatcherResult;
    }
}
