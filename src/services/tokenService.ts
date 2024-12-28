export const TokenService = {
  getAccessToken: (): string | null => {
    return (
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1] || null
    );
  },

  setTokens: (accessToken: string, refreshToken: string): void => {
    // Устанавливаем accessToken в куки с настройками безопасности
    document.cookie = `accessToken=${accessToken}; path=/; secure; samesite=strict; max-age=3600`; // 1 час

    // RefreshToken храним в httpOnly куки (устанавливается сервером)
    // Здесь просто для примера
    document.cookie = `refreshToken=${refreshToken}; path=/; secure; httponly; samesite=strict; max-age=2592000`; // 30 дней
  },

  removeTokens: (): void => {
    document.cookie =
      "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie =
      "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  },
};
