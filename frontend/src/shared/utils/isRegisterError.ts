/**
 * Проверяет, соответствует ли объект ошибке регистрации,
 * ожидаемой при вводе уже зарегистрированной почты.
 *
 * @param {unknown} err - Ошибка при регистрации
 * @returns {boolean} `true`, если объект соответствует ожидаемой структуре ошибки регистрации, иначе `false`
 */

export function isRegisterError(
  err: unknown,
): err is { status: number; data: { email: string } } {
  return (
    typeof err === 'object' &&
    err !== null &&
    'status' in err &&
    typeof err.status === 'number' &&
    'data' in err &&
    typeof err.data === 'object' &&
    err.data !== null &&
    'email' in err.data &&
    Array.isArray(err.data.email) &&
    typeof err.data.email[0] === 'string'
  );
}
