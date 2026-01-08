type ExtractSchema<T extends readonly any[]> = T[number];

export const USER_TYPES = ["ADMIN", "USER"] as const;
export type UserType = ExtractSchema<typeof USER_TYPES>;
