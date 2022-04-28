// teamplting for future Prisma Method Test (from https://www.prisma.io/docs/guides/testing/unit-testing)
// not fully implemente since custom Prisma functions not complete yet

import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'

import prisma from './client'

jest.mock('./client', () => ({
    __esModule: true,
    default: mockDeep < PrismaClient > (),
}))

beforeEach(() => {
  mockReset(prismaMock)
})

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>