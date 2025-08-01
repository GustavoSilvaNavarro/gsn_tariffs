import '@testing-library/jest-dom/vitest';
import { server } from '@/components/__tests__/utils/mockServer/server';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
