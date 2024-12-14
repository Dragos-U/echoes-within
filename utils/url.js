/**
 * Constructs a full URL by appending the given path to the base origin.
 * The base origin is determined based on the environment:
 * - In a browser environment, it uses the current window's origin.
 * - In a server environment, it uses the `NEXT_PUBLIC_BASE_URL` environment variable.
 *
 * @param {string} path - The path to append to the base origin. It should start with a slash (e.g., '/api/journal').
 * @returns {string} The full URL constructed by combining the base origin and the provided path.
 * @throws {Error} Will throw an error if the path is not a string.
 */

export function createURL(path) {
    if (typeof path !== 'string') {
        throw new Error('Path must be a string');
    }

    const origin =
        typeof window !== "undefined"
            ? window.location.origin
            : process.env.NEXT_PUBLIC_BASE_URL;

    return `${origin}${path}`;
}