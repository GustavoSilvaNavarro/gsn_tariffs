import '@testing-library/jest-dom/vitest';
import { server } from './mockServer/server';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
