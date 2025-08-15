// src/hooks.server.js
import { redirect } from '@sveltejs/kit';

const restrictedPaths = [
  '/profile'
];

export async function handle({ event, resolve }) {
    const { url, cookies } = event;

    const token = cookies.get('userToken');

    const isRestricted = restrictedPaths.some(path => url.pathname.startsWith(path));
    
    const statusCode = event.response?.status;

    if (isRestricted && (!token || token === 'null')) {
        throw redirect(303, '/unauthorized');
    }

    if (isRestricted && statusCode === 401) {
        throw redirect(303, '/unauthorized');
    }

    return resolve(event);
}
