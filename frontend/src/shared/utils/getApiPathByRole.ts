/**
 * Возвращает путь API в зависимости от роли пользователя.
 *
 * @param role - Роль пользователя: 'TOURIST', 'TOUR_OPERATOR' или 'HOTELIER'
 * @returns Строка пути: 'users' или 'companies'
 * @throws Ошибка, если передана неизвестная роль
 */

export function getApiPathByRole(
  role: 'USER' | 'TOUR_OPERATOR' | 'HOTELIER',
): 'users' | 'companies' {
  switch (role) {
    case 'USER':
      return 'users';
    case 'TOUR_OPERATOR':
    case 'HOTELIER':
      return 'companies';
    default:
      throw new Error(`Неизвестная роль: ${role}`);
  }
}
